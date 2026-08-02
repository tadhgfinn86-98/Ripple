# ripple-os dashboard

The live company map. A force-directed node graph of every department, agent,
SOP and connector in `ripple-os`, rendered from `../data/graph.json`.

```bash
cd ripple-os/dashboard
npm install
npm run dev          # http://localhost:5173
```

No backend, no auth, no localStorage. It reads the repo and draws it.

## The graph is generated, not hand-written

`npm run graph` rebuilds `../data/graph.json` from `company.yaml` and the agent /
SOP files on disk. It runs automatically before `dev` and `build`.

That's deliberate: `sop-keeper`'s rule is that `company.yaml`, the files on disk
and `graph.json` must never disagree, and the only way to guarantee that is to
derive one from the others. **Never edit `data/graph.json` by hand** — the next
`npm run dev` will overwrite it. Add an agent by creating its file and listing it
in `company.yaml`; it appears on the map on the next run.

The builder also reads each file's front matter for the side-panel detail, and
counts every `[FILL IN]` — that's the amber tally in the header.

## Reading the map

| | |
| --- | --- |
| **Large filled circle** | department — one per cluster, coloured per `company.yaml` |
| **Small filled circle** | agent |
| **Hollow circle** | SOP |
| **Dashed circle** | MCP connector — dashed because Layer 2 is *documented, not live* |

Edges: agent→department, sop→department, agent→tool. Connector edges are faint
and weakly weighted, so a shared tool like Gmail doesn't drag six departments
into one hairball.

Departments are anchored on an ellipse and their agents and SOPs pulled toward
them, so each department reads as its own cluster. Connectors sit on a small
inner ring — shared infrastructure, belonging to no one department.

- **Click** a node for its detail panel; **click the background** to close it.
- **Hover** to fade everything it isn't connected to.
- **Lens bar** isolates one department, or filters by type.
- **Bottom cards** show each department's agent / SOP / tool counts. Clicking one
  isolates that department and opens its panel. Scroll-snapped.

## Files

```
build-graph.mjs   generator — company.yaml + markdown front matter -> graph.json
src/App.jsx       layout, lens filtering, force tuning, canvas node rendering
src/Panel.jsx     side panel, one shape per node type
src/styles.css    the marketing site's palette, inverted for a dark canvas
```

Fonts are loaded from Google Fonts and degrade to system serif / sans / mono if
the network is unavailable.
