---
sop: enquiry-intake
department: operations
owner: operations
review_date: "[FILL IN]"
used_by: [enquiry-router, inbox-triage]
---

# SOP — Enquiry intake

**Purpose.** Every inbound enquiry becomes one `ENQ-` record with the same eight
fields, whatever channel it arrived on, within one working day.

## Scope

All inbound: email, free-audit form, phone note, referral, LinkedIn. Excludes
service issues from existing customers (missed lift, bin swap) — those are
operational, not enquiries.

## Steps

1. **Log within 1 working day.** Assign the next `ENQ-` number. Record channel
   and received date.
2. **Keep the original.** Paste the source text verbatim into the record. Detail
   the producer volunteers ("we had a duty-of-care audit last year") is worth
   more than a tidy summary.
3. **Extract the eight required fields** (see `enquiry-router.md`). Absent = `MISSING`.
4. **Hazardous screen.** Any hint of asbestos, solvents, chemicals, batteries,
   WEEE, fridges, clinical or sharps → out of scope, hand to compliance, do not
   proceed.
5. **Propose an EWC code**, mark it provisional, send to compliance for
   confirmation. Never confirm it here.
6. **One record per site.** Multi-site enquiries split into one `ENQ-` per site,
   cross-referenced. Multi-stream stays in one record as a list.
7. **If incomplete**, write the questions — plainly, no more than three at a
   time — and hand to comms to draft. Chase per
   `departments/sales/sops/follow-up-cadence.md`.
8. **If complete**, hand to compliance, then `carrier-match`.
9. **If the free audit applies**, note whether the invoice and three photos have
   arrived. The 48-hour clock starts when both do.

## Definition of done

- `ENQ-` record exists with all eight fields present or explicitly `MISSING`
- hazardous screen recorded
- provisional EWC code proposed
- next owner named

## Common failures

| Failure | Cost |
| --- | --- |
| Company captured, site not | wrong postcode → wrong outlet → wrong price |
| Frequency assumed | one-off priced as recurring, margin wrong |
| EWC guessed from appearance | rejected load, or a compliance breach |
| Access constraint missed | wasted-journey charge, angry producer |
| SIC code never captured | first WTN can't be completed correctly |
