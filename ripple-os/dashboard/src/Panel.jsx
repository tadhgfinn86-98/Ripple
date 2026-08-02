/** Side panel — detail for whichever node is selected. */
export default function Panel({ node, departments, onClose }) {
  const dept = node.department ? departments[node.department] : null;
  const accent = node.type === 'tool' ? '#8A938E' : node.colour;

  return (
    <aside className="panel" style={{ '--c': accent }}>
      <button className="panel-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      <p className="panel-kind">
        {node.type}
        {dept && <span className="panel-dept"> · {dept.label}</span>}
      </p>
      <h2 className="panel-title">{node.label}</h2>

      {node.type === 'department' && (
        <>
          <p className="lede">{node.mission}</p>
          <Section title="Owns">
            <ul className="list">
              {node.owns.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Section>
          <Section title="Connectors">
            <div className="chips">
              {node.connectors.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </Section>
          <Stats
            items={[
              ['agents', node.agentCount],
              ['sops', node.sopCount],
            ]}
          />
        </>
      )}

      {node.type === 'agent' && (
        <>
          <p className="lede">{node.role}</p>
          {node.summary && <p className="quote">{node.summary}</p>}
          {node.trigger && (
            <Section title="Trigger">
              <p className="body">{node.trigger}</p>
            </Section>
          )}
          <Section title="Tools it may touch">
            <div className="chips">
              {node.tools.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <p className="note">{node.toolsMode} — nothing is called yet</p>
          </Section>
          {node.handoffTo?.length > 0 && (
            <Section title="Hands off to">
              <ul className="list mono">
                {node.handoffTo.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Section>
          )}
        </>
      )}

      {node.type === 'sop' && (
        <>
          <p className="lede">{node.purpose}</p>
          {node.usedBy?.length > 0 && (
            <Section title="Used by">
              <ul className="list mono">
                {node.usedBy.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </Section>
          )}
          <Section title="Review date">
            <p className="body mono">{node.reviewDate ?? 'not set'}</p>
          </Section>
        </>
      )}

      {node.type === 'tool' && (
        <>
          <p className="lede">
            MCP connector · {node.status}
            {!node.live && ' · documented, not live'}
          </p>
          <Section title="Used by">
            <ul className="uses">
              {node.uses.map((u) => (
                <li key={u.department}>
                  <span className="use-dept" style={{ color: departments[u.department]?.colour }}>
                    {departments[u.department]?.label}
                  </span>
                  <span className="use-text">{u.use}</span>
                </li>
              ))}
            </ul>
          </Section>
          <p className="note">
            Layer 2 is documentation only. An agent names the connector and the exact read or
            write it would make — it does not perform it.
          </p>
        </>
      )}

      {node.openQuestions > 0 && (
        <p className="open">
          {node.openQuestions} open <code>[FILL IN]</code>
          {node.openQuestions === 1 ? '' : 's'} in this file
        </p>
      )}

      <p className="path">{node.file}</p>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <section className="panel-section">
      <h4>{title}</h4>
      {children}
    </section>
  );
}

function Stats({ items }) {
  return (
    <div className="stats">
      {items.map(([label, n]) => (
        <div key={label}>
          <b>{n}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
