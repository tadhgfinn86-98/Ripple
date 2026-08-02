import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceX, forceY } from 'd3-force';
import graph from '../../data/graph.json';
import Panel from './Panel.jsx';

const TYPES = [
  { id: 'department', label: 'Departments' },
  { id: 'agent', label: 'Agents' },
  { id: 'tool', label: 'Tools' },
  { id: 'sop', label: 'SOPs' },
];

const LINK_DISTANCE = { 'agent-department': 84, 'sop-department': 70, 'agent-tool': 260 };

/** Every department gets its own anchor point on a ring, and its agents and SOPs
 *  are pulled toward it. Without this the five shared connectors sit in the
 *  middle and drag every department into one hairball — the clusters stop
 *  reading, which is the whole point of the map. Tools are pulled to the centre
 *  instead: shared infrastructure, belonging to no one department. */
// Slightly elliptical — screens are wider than they are tall, so a circular
// ring wastes the sides and crowds the top and bottom.
const onRing = (i, n, r, offset = 0, squash = 1.45) => {
  const a = (i / n) * 2 * Math.PI - Math.PI / 2 + offset;
  return { x: Math.cos(a) * r * squash, y: Math.sin(a) * r };
};

const DEPT_IDS = Object.keys(graph.departments);
const ANCHORS = Object.fromEntries(DEPT_IDS.map((id, i) => [id, onRing(i, DEPT_IDS.length, 360)]));

// Connectors get their own small inner ring. Left all at the origin they stack
// on top of each other and their labels become unreadable.
const TOOL_IDS = graph.nodes.filter((n) => n.type === 'tool').map((n) => n.id);
const TOOL_ANCHORS = Object.fromEntries(
  TOOL_IDS.map((id, i) => [id, onRing(i, TOOL_IDS.length, 92, Math.PI / 5)])
);

export default function App() {
  const [lens, setLens] = useState('all'); // department id, or 'all'
  const [types, setTypes] = useState(() => new Set(TYPES.map((t) => t.id)));
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  const fgRef = useRef();
  const stageRef = useRef();

  // Canvas has no intrinsic size — measure the stage and follow it.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggleType = (id) =>
    setTypes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next.size ? next : prev; // never let every type be switched off
    });

  // ---- the lens -------------------------------------------------------------
  const data = useMemo(() => {
    const visible = graph.nodes.filter((n) => {
      if (!types.has(n.type)) return false;
      if (lens === 'all') return true;
      if (n.type === 'tool') {
        // a tool stays in view only if the isolated department actually uses it
        return n.usedBy.includes(lens);
      }
      return n.department === lens;
    });
    const ids = new Set(visible.map((n) => n.id));
    return {
      nodes: visible.map((n) => ({ ...n })), // fresh objects: force layout mutates them
      links: graph.links
        .filter((l) => ids.has(l.source) && ids.has(l.target))
        .map((l) => ({ ...l })),
    };
  }, [lens, types]);

  // Re-tune forces whenever the visible set changes.
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    // Isolating one department collapses the ring — it gets the whole canvas.
    const anchor = (n) => {
      if (n.type === 'tool') return TOOL_ANCHORS[n.id] ?? { x: 0, y: 0 };
      if (lens !== 'all') return { x: 0, y: 0 };
      return ANCHORS[n.department] ?? { x: 0, y: 0 };
    };
    const pull = (n) => (n.type === 'tool' ? 0.06 : n.type === 'department' ? 0.5 : 0.3);

    fg.d3Force('charge')
      .strength((n) => (n.type === 'department' ? -700 : -260))
      .distanceMax(420);
    fg.d3Force('link')
      .distance((l) => LINK_DISTANCE[l.kind] ?? 60)
      // A shared connector must not reel its department in.
      .strength((l) => (l.kind === 'agent-tool' ? 0.02 : 1));
    fg.d3Force('center', null); // the anchors position things, not a global centre
    fg.d3Force('x', forceX((n) => anchor(n).x).strength(pull));
    fg.d3Force('y', forceY((n) => anchor(n).y).strength(pull));
    fg.d3ReheatSimulation();
  }, [data, lens]);

  const fit = useCallback(() => fgRef.current?.zoomToFit(500, 60), []);

  const neighbours = useMemo(() => {
    const focus = hovered ?? selected;
    if (!focus) return null;
    const set = new Set([focus.id]);
    for (const l of graph.links) {
      if (l.source === focus.id) set.add(l.target);
      if (l.target === focus.id) set.add(l.source);
    }
    return set;
  }, [hovered, selected]);

  const drawNode = useCallback(
    (node, ctx, scale) => {
      const dim = neighbours && !neighbours.has(node.id);
      const r = node.size / 2;
      ctx.globalAlpha = dim ? 0.18 : 1;

      if (node.type === 'department') {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 5, 0, 2 * Math.PI);
        ctx.fillStyle = node.colour + '22';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      if (node.type === 'tool') {
        ctx.fillStyle = '#141817';
        ctx.fill();
        ctx.strokeStyle = node.colour;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 2]); // dashed = documented, not live
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (node.type === 'sop') {
        ctx.fillStyle = '#141817';
        ctx.fill();
        ctx.strokeStyle = node.colour;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        ctx.fillStyle = node.colour;
        ctx.fill();
      }

      if (selected?.id === node.id) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4, 0, 2 * Math.PI);
        ctx.strokeStyle = '#F2F0EB';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Small labels appear as you zoom in; department labels are always on.
      const showLabel = node.type === 'department' || scale > 1.3 || !dim;
      if (showLabel) {
        const isDept = node.type === 'department';
        ctx.font = isDept
          ? `400 ${Math.max(6, 14 / scale)}px 'Cormorant Garamond', serif`
          : `400 ${Math.max(3.6, 7.5 / scale)}px 'IBM Plex Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const text = isDept ? node.label.toUpperCase() : node.label;
        const y = node.y + r + (isDept ? 4 : 2.5);
        ctx.lineWidth = 3 / scale;
        ctx.strokeStyle = '#0A0C0B';
        ctx.lineJoin = 'round';
        ctx.strokeText(text, node.x, y);
        ctx.fillStyle = isDept ? '#F2F0EB' : dim ? '#5A6660' : '#B9BEBA';
        ctx.fillText(text, node.x, y);
      }
      ctx.globalAlpha = 1;
    },
    [neighbours, selected]
  );

  const counts = useMemo(() => {
    const by = (t) => graph.nodes.filter((n) => n.type === t).length;
    return { department: by('department'), agent: by('agent'), sop: by('sop'), tool: by('tool') };
  }, []);

  const openQuestions = useMemo(
    () =>
      graph.nodes.reduce((n, x) => n + (x.openQuestions ?? 0), 0) +
      graph.contextFiles.reduce((n, x) => n + x.openQuestions, 0),
    []
  );

  return (
    <div className="app">
      <header className="bar">
        <div className="brand">
          <span className="wordmark">RIPPLE</span>
          <span className="os">os</span>
        </div>
        <div className="brandline">
          <p className="eyebrow">{graph.company.model}</p>
          <p className="stage">{graph.company.stage}</p>
        </div>
        <div className="tallies">
          <Tally n={counts.department} label="departments" />
          <Tally n={counts.agent} label="agents" />
          <Tally n={counts.sop} label="sops" />
          <Tally n={counts.tool} label="tools" />
          <Tally n={openQuestions} label="open [fill in]" warn />
        </div>
      </header>

      <nav className="lens">
        <span className="lens-label">Lens</span>
        <button
          className={`pill ${lens === 'all' ? 'on' : ''}`}
          onClick={() => setLens('all')}
          style={lens === 'all' ? { borderColor: '#DCD8CF', color: '#F2F0EB' } : undefined}
        >
          Whole company
        </button>
        {Object.entries(graph.departments).map(([id, d]) => (
          <button
            key={id}
            className={`pill ${lens === id ? 'on' : ''}`}
            onClick={() => setLens(lens === id ? 'all' : id)}
            style={{
              borderColor: lens === id ? d.colour : undefined,
              color: lens === id ? d.colour : undefined,
            }}
          >
            <i className="dot" style={{ background: d.colour }} />
            {d.label}
          </button>
        ))}
        <span className="lens-divider" />
        <span className="lens-label">Type</span>
        {TYPES.map((t) => (
          <button
            key={t.id}
            className={`pill type ${types.has(t.id) ? 'on' : 'off'}`}
            onClick={() => toggleType(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="stage" ref={stageRef}>
        <ForceGraph2D
          ref={fgRef}
          width={size.w}
          height={size.h}
          graphData={data}
          backgroundColor="#0A0C0B"
          cooldownTime={3500}
          onEngineStop={fit}
          d3VelocityDecay={0.32}
          nodeCanvasObject={drawNode}
          nodePointerAreaPaint={(node, colour, ctx) => {
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size / 2 + 4, 0, 2 * Math.PI);
            ctx.fill();
          }}
          linkColor={(l) => {
            const a = typeof l.source === 'object' ? l.source.id : l.source;
            const b = typeof l.target === 'object' ? l.target.id : l.target;
            const dim = neighbours && !(neighbours.has(a) && neighbours.has(b));
            if (l.kind === 'agent-tool') return dim ? '#1C211F' : '#39413D';
            const dept = typeof l.target === 'object' ? l.target.colour : null;
            return dim ? '#1C211F' : (dept ?? '#5A6660') + '66';
          }}
          linkWidth={(l) => (l.kind === 'agent-tool' ? 0.4 : 0.9)}
          onNodeClick={(n) => setSelected(n)}
          onNodeHover={(n) => setHovered(n)}
          onBackgroundClick={() => setSelected(null)}
        />

        <div className="legend">
          <span><i className="k dept" /> department</span>
          <span><i className="k agent" /> agent</span>
          <span><i className="k sop" /> sop</span>
          <span><i className="k tool" /> tool — dashed: documented, not live</span>
        </div>

        {selected && (
          <Panel node={selected} departments={graph.departments} onClose={() => setSelected(null)} />
        )}
      </main>

      <footer className="cards">
        {Object.entries(graph.departments).map(([id, d]) => {
          const dept = graph.nodes.find((n) => n.id === `dept:${id}`);
          return (
            <button
              key={id}
              className={`card ${lens === id ? 'on' : ''}`}
              style={{ '--c': d.colour }}
              onClick={() => {
                setLens(lens === id ? 'all' : id);
                setSelected(dept);
              }}
            >
              <span className="card-rule" />
              <h3>{d.label}</h3>
              <p className="card-mission">{dept.mission}</p>
              <div className="card-counts">
                <span><b>{dept.agentCount}</b> agents</span>
                <span><b>{dept.sopCount}</b> sops</span>
                <span><b>{dept.connectors.length}</b> tools</span>
              </div>
            </button>
          );
        })}
      </footer>
    </div>
  );
}

function Tally({ n, label, warn }) {
  return (
    <div className={`tally ${warn ? 'warn' : ''}`}>
      <b>{n}</b>
      <span>{label}</span>
    </div>
  );
}
