---
sop: follow-up-cadence
department: sales
owner: sales
review_date: "[FILL IN]"
used_by: [quote-builder, inbox-triage, revenue-pulse]
---

# SOP — Follow-up cadence

**Purpose.** Nothing goes quiet by accident. Every live conversation has a next
touch with a date on it.

`[ASSUMPTION]` The intervals below are a sensible default for B2B waste, not
Ripple's measured cadence. `[FILL IN once you know what actually converts.]`

## Cadence by stage

| Stage | Touch 1 | Touch 2 | Touch 3 | Then |
| --- | --- | --- | --- | --- |
| Enquiry incomplete (chasing details) | +2 days | +5 days | +10 days | mark dormant |
| Audit promised, materials not received | +2 days | +5 days | — | close, offer again later |
| Audit sent, no response | +3 days | +7 days | +14 days | mark cold |
| Quote sent, no response | +3 days | +7 days | +14 days | mark cold |
| Quote declined on price | +90 days | — | — | contract-renewal timing |
| Won, awaiting first collection | day before collection | — | — | operations owns it |

## Rules

1. **One question per touch.** Not a re-send of the quote with "just checking in".
2. **Add something each time.** A benchmark, a compliance gap they'll care about,
   a diversion figure. If there's nothing new to say, the touch is too early.
3. **Three touches, then stop.** Persistence past three reads as pressure. Mark
   cold and set a `+90 days` revisit.
4. **Contract timing beats persistence.** Most producers are locked into an
   incumbent. Capture their **renewal or notice date** and diary that — it's worth
   more than any number of chasers.
5. **Every touch is drafted by comms** in Tadhg's voice, and reviewed before
   sending. Never auto-sent.
6. **Log every touch** on the enquiry/quote record with date and what was said.
   Finance reads the same record to spot ageing.

## Definitions

| State | Meaning |
| --- | --- |
| **live** | touched within cadence, next touch scheduled |
| **overdue** | scheduled touch has passed without action — a process failure |
| **cold** | three touches, no response. Revisit at +90 days |
| **dormant** | producer asked for time, or the contract renews later. Diary the date |
| **lost** | explicit no. Record the reason and the number that would have won it |

Cold threshold used by `finance/revenue-pulse`: `[FILL IN — days, suggest 21]`

## Touch template

```yaml
touch:
  quote: QUO-0000
  number: 2
  date: 2026-08-08
  channel: email
  new_information: "Their current invoice shows a wasted-journey charge on three of six lifts."
  one_question: "Is the yard reachable before 09:00, or should we price the later window?"
  drafted_by: comms/inbox-triage
  sent: false
  next_touch: 2026-08-15
```

## What not to do

- No "just checking in", "circling back", "bumping this up your inbox".
- No discount offered unprompted to break silence. It teaches producers to wait.
- No fourth chaser.
- No follow-up on a quote with an unresolved `[FILL IN]` price — fix the quote first.
