/**
 * Builds ../data/graph.json from company.yaml and the agent / SOP files on disk.
 *
 * The graph is DERIVED, never hand-edited. sop-keeper's rule is that
 * company.yaml, the files on disk and graph.json must never disagree — the only
 * way to guarantee that is to generate it. Runs automatically before `npm run dev`
 * and `npm run build`.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');

/** Pull the `---` front matter block off a markdown file. */
function frontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  try {
    return parse(m[1]) ?? {};
  } catch {
    return {};
  }
}

/** First non-heading, non-blockquote prose line — used as the panel summary. */
function firstProse(md) {
  const body = md.replace(/^---[\s\S]*?---/, '');
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('>') || line.startsWith('|')) continue;
    return line.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`/g, '');
  }
  return '';
}

/** Every [FILL IN] in a file — the dashboard surfaces these as open questions. */
function fillIns(md) {
  return [...md.matchAll(/\[FILL IN[^\]]*\]/g)].map((m) => m[0]);
}

const company = parse(read('company.yaml'));
const departments = company.departments;

const nodes = [];
const links = [];
const add = (n) => nodes.push(n);

// ---- department nodes -------------------------------------------------------
for (const [id, d] of Object.entries(departments)) {
  add({
    id: `dept:${id}`,
    type: 'department',
    label: d.label,
    department: id,
    colour: d.colour,
    size: 18,
    mission: (d.mission ?? '').trim(),
    // A colon inside a YAML list item parses as a map, not a string. Flatten
    // anything that slipped through rather than shipping an object to the UI.
    owns: (d.owns ?? []).map((o) =>
      typeof o === 'string' ? o : Object.entries(o).map(([k, v]) => `${k} — ${v}`).join('; ')
    ),
    file: 'company.yaml',
    agentCount: (d.agents ?? []).length,
    sopCount: (d.sops ?? []).length,
    connectors: (d.tools ?? []).map((t) => t.connector),
  });
}

// ---- tool (MCP connector) nodes --------------------------------------------
for (const [name, c] of Object.entries(company.connectors ?? {})) {
  add({
    id: `tool:${name}`,
    type: 'tool',
    label: name,
    department: null,
    colour: '#8A938E',
    size: 7,
    status: c.status ?? 'unknown',
    live: company.connector_policy?.live ?? false,
    usedBy: c.used_by ?? [],
    uses: Object.entries(departments)
      .flatMap(([dId, d]) => (d.tools ?? []).filter((t) => t.connector === name).map((t) => ({ department: dId, use: t.use }))),
    file: 'company.yaml',
  });
}

// ---- agent nodes ------------------------------------------------------------
for (const [dId, d] of Object.entries(departments)) {
  for (const a of d.agents ?? []) {
    if (!existsSync(join(root, a.file))) {
      console.warn(`  ! missing agent file: ${a.file}`);
      continue;
    }
    const md = read(a.file);
    const fm = frontMatter(md);
    add({
      id: `agent:${a.id}`,
      type: 'agent',
      label: a.id,
      department: dId,
      colour: d.colour,
      size: 11,
      role: fm.role ?? '',
      summary: firstProse(md),
      trigger: (fm.trigger ?? '').trim(),
      tools: fm.tools ?? [],
      toolsMode: fm.tools_mode ?? 'documented-only',
      handoffTo: fm.handoff_to ?? [],
      file: a.file,
      openQuestions: fillIns(md).length,
    });
    links.push({ source: `agent:${a.id}`, target: `dept:${dId}`, kind: 'agent-department' });
    for (const t of fm.tools ?? []) {
      if (nodes.some((n) => n.id === `tool:${t}`)) {
        links.push({ source: `agent:${a.id}`, target: `tool:${t}`, kind: 'agent-tool' });
      }
    }
  }
}

// ---- SOP nodes --------------------------------------------------------------
for (const [dId, d] of Object.entries(departments)) {
  for (const s of d.sops ?? []) {
    if (!existsSync(join(root, s.file))) {
      console.warn(`  ! missing sop file: ${s.file}`);
      continue;
    }
    const md = read(s.file);
    const fm = frontMatter(md);
    const purpose = (md.match(/\*\*Purpose\.\*\*\s*([\s\S]*?)(?:\n\n|$)/) ?? [])[1];
    add({
      id: `sop:${s.id}`,
      type: 'sop',
      label: s.id,
      department: dId,
      colour: d.colour,
      size: 7,
      purpose: (purpose ?? firstProse(md)).replace(/\s+/g, ' ').trim(),
      usedBy: fm.used_by ?? [],
      reviewDate: fm.review_date ?? null,
      file: s.file,
      openQuestions: fillIns(md).length,
    });
    links.push({ source: `sop:${s.id}`, target: `dept:${dId}`, kind: 'sop-department' });
  }
}

// ---- context files, counted for the header ---------------------------------
const contextFiles = ['business', 'offers', 'customers', 'suppliers', 'goals'].map((n) => {
  const md = read(`context/${n}.md`);
  return { name: n, file: `context/${n}.md`, openQuestions: fillIns(md).length };
});

const graph = {
  generated: new Date().toISOString().slice(0, 10),
  generatedBy: 'dashboard/build-graph.mjs — derived from company.yaml, do not hand-edit',
  company: {
    name: company.company.name,
    model: company.company.model,
    revenueUnit: company.company.revenue_unit,
    pricing: company.company.pricing,
    stage: 'pre-revenue — 0 customers, 0 verified suppliers as of 2026-08',
  },
  connectorsLive: company.connector_policy?.live ?? false,
  departments: Object.fromEntries(
    Object.entries(departments).map(([id, d]) => [id, { label: d.label, colour: d.colour }])
  ),
  contextFiles,
  nodes,
  links,
};

writeFileSync(join(root, 'data/graph.json'), JSON.stringify(graph, null, 2) + '\n');

const count = (t) => nodes.filter((n) => n.type === t).length;
console.log(
  `graph.json — ${count('department')} departments · ${count('agent')} agents · ` +
    `${count('sop')} sops · ${count('tool')} tools · ${links.length} edges`
);
