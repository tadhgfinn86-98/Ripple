---
sop: triage-rules
department: comms
owner: comms
review_date: "[FILL IN]"
used_by: [inbox-triage]
---

# SOP — Triage rules

**Purpose.** Every incoming message lands in exactly one of four buckets, by
rule, not by feel.

## The four buckets

| Bucket | Test | Action |
| --- | --- | --- |
| **NEEDS TADHG** | A decision, a price not in `offers.md`, money, a complaint, anything legal | Summarise, don't draft a commitment. Top of the summary |
| **DRAFT** | Answerable entirely from the repo | Draft in Tadhg's voice, mark ready to send |
| **ROUTE** | Belongs to a department as structured work | Convert to a record, hand over, note it |
| **NOISE** | Newsletters, cold sales, spam | Archive. Report the count only |

Ambiguous → **NEEDS TADHG**. Escalating a routine email costs a few seconds;
auto-answering a consequential one costs a customer.

## Routing table

| Incoming | Goes to | As |
| --- | --- | --- |
| New waste enquiry, any channel | `operations/enquiry-router` | `ENQ-` record |
| Free-audit request (invoice + photos) | `operations/enquiry-router` | `ENQ-` + 48h clock |
| Producer accepting a quote | `operations` → booking | movement pre-check |
| Carrier certificate, permit, licence renewal | `compliance/compliance-watch` | licence register update |
| Anything mentioning WTNs, duty of care, EA, an audit | `compliance/compliance-watch` | **same run, always** |
| Anything mentioning hazardous waste | `compliance/compliance-watch` | out-of-scope screen |
| Quote request or price question | `sales/quote-builder` | quote request |
| Producer gone quiet, chaser due | `sales` per `follow-up-cadence.md` | scheduled touch |
| Invoice query, dispute, remittance | `finance/revenue-pulse` | invoice exception |
| Supplier invoice | `finance` | reconciliation |
| Missed collection, service failure | `operations` + supplier reliability log | exception |
| Correction to an SOP, a carrier record, or context | `knowledge/sop-keeper` | update request |

## Priority within NEEDS TADHG

1. Regulator, insurer, solicitor
2. Compliance gap on a live movement
3. Customer complaint or service failure
4. Money in — dispute, overdue, credit
5. Price or commitment decision
6. Everything else

## Timing

| | |
| --- | --- |
| Sweeps | morning + end of day `[FILL IN — times]` |
| Enquiry acknowledged | same working day |
| Audit turnaround | 48 hours from invoice + photos arriving |
| Complaint surfaced | immediately, next sweep at the latest |
| Compliance item | same run, never held |

## Hard rules

- **Never send.** Drafts only. No auto-reply, no read receipt, no calendar accept.
- **Never commit** to a price, date, volume or service level not already recorded.
- **Never archive** anything mentioning waste transfer notes, licences, a
  regulator, or hazardous waste — even if it looks like marketing.
- **Never lose an enquiry to a reply.** Route it into a record first.
- **Never batch a complaint** for the next sweep.
- One thread, one bucket. Split a thread that carries two things.

## Metrics worth watching

`[FILL IN once running]` — messages per sweep, % needing Tadhg (should fall as
`offers.md` fills in), enquiry acknowledgement time, drafts sent unedited (the
real test of `voice-guide.md`).
