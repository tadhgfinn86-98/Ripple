---
sop: sop-template
department: knowledge
owner: knowledge
review_date: "[FILL IN]"
used_by: [sop-keeper]
---

# SOP — SOP template

**Purpose.** Every SOP in ripple-os has the same shape, so an agent can read any
of them without learning a new format.

## Required front matter

```yaml
---
sop: kebab-case-id           # matches the filename and company.yaml
department: operations | compliance | sales | finance | comms | knowledge
owner: which department maintains it
review_date: "YYYY-MM-DD"    # when it must next be looked at
used_by: [agent-id, agent-id]
---
```

## Required sections

1. `# SOP — Title`
2. **Purpose** — one or two sentences. What this guarantees.
3. **Steps** — numbered, imperative, each one a thing a person or agent actually does.
4. **Definition of done** — how you know the SOP was followed.
5. **Failure modes** — what goes wrong and what it costs.

Optional: scope, cadence, record format, escalation, worked example.

## Writing rules

- **Numbered steps, imperative voice.** "Check the register", not "the register
  should be checked".
- **Name the artefact.** Which record, which field, which folder. A step producing
  nothing storable is a thought, not a step.
- **Mark unknowns `[FILL IN]`.** Never fill a gap with something plausible.
- **Mark inferences `[ASSUMPTION: ...]`.** So they can be corrected instead of
  silently believed.
- **One SOP, one process.** If it needs two "and then separately" sections, split it.
- **Short.** If nobody reads it, it isn't a procedure, it's a document.
- **Say the consequence.** People follow steps whose cost of skipping they know.

## Lifecycle

| Stage | Trigger |
| --- | --- |
| Draft | a process is done twice the same way |
| Active | reviewed once, listed in `company.yaml`, referenced by an agent |
| Review | `review_date` passed, or practice diverged |
| Superseded | replaced — keep the file, mark superseded, link the replacement |
| Deleted | nobody followed it and nobody will. Better than pretending |

## When you change one

1. Edit the file.
2. Update `review_date`.
3. Update `company.yaml` if the SOP list changed.
4. Regenerate `data/graph.json`.
5. Commit with **why**, not what.
6. Tell the agents that use it — if behaviour changes, that's a behaviour change.

## Definition of done (for this SOP)

A new SOP has front matter, purpose, numbered steps, definition of done, failure
modes; is listed in `company.yaml`; is referenced by at least one agent; and
appears as a node in the dashboard graph.

## Failure modes

| Failure | Cost |
| --- | --- |
| SOP written but never referenced by an agent | dead file, false confidence |
| Steps describe intent, not actions | two people do it differently |
| Unknowns filled with plausible content | a guess becomes a fact once committed |
| Never reviewed | agents follow a process that stopped being true |
| SOP and `company.yaml` disagree | the graph lies |
