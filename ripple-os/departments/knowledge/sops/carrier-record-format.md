---
sop: carrier-record-format
department: knowledge
owner: knowledge
review_date: "[FILL IN]"
used_by: [sop-keeper, carrier-match, compliance-watch]
---

# SOP — Carrier record format

**Purpose.** Every supplier record holds the same fields, so `carrier-match` can
rank on them and `compliance-watch` can check them without asking a human.

An incomplete carrier record is not a small gap: matching silently skips the
supplier, and an enquiry looks like a network gap when it isn't.

## The three supplier types

| Type | Role | Key check |
| --- | --- | --- |
| `carrier` | moves the waste | upper-tier carrier registration, valid |
| `outlet` | receives it — transfer station, MRF, AD, EfW, landfill | permit/exemption covering the **exact EWC code** |
| `end_market` | buys the recovered material | price basis, quality spec |

One supplier may be several. Record each role and verify each separately — a
valid carrier registration says nothing about a site's permit.

## Required fields

Marked ● required for matching; ○ improves ranking.

```yaml
supplier_id: SUP-000            # ● stable, never reused
name: ""                        # ● exact registered entity name, as invoicing
type: [carrier, outlet]         # ●
sites:                          # ●
  - name: ""
    postcode: ""                # ● drives local-first ranking
    catchment: ""               # ● radius or postcode areas served
registrations:
  carrier_registration: ""      # ● CBDU number
  carrier_tier: upper           # ●
  carrier_expires: ""           # ● compliance reads this
  permit_number: ""             # ● permit or exemption reference
  permit_expires: ""            # ●
  verified_on: ""               # ● date checked against the EA public register
  verified_by: ""               # ●
  evidence: ""                  # ● Drive path to the certificate PDFs
accepts:                        # ● one entry per EWC code — the core of the record
  - ewc: ""                     # ● six digits
    description: ""
    gate_fee: ""                # ● £/tonne, negative if a rebate
    gate_fee_dated: ""          # ● when that price was confirmed — prices move
    haulage: ""                 # ● £ per movement
    min_load: ""                # ○
    contamination_limit: ""     # ○ %
service:
  lead_time_days: ""            # ● checked against the producer's start date
  vehicle_types: ""             # ● against the site's access limit
  weighbridge_ticket: true      # ● no ticket = estimated tonnage = approximate margin
  wtn_method: ""                # ● e-WTN portal / paper / season ticket
  notice_to_cancel: ""          # ○
commercial:
  payment_terms: ""             # ○ feeds the working-capital gap
  rate_review: ""               # ○
  contact: { name: "", email: "", phone: "" }   # ●
reliability:                    # ○
  missed_collections_12m: 0
  disputes_12m: 0
  notes: ""
status: active | suspended | superseded   # ●
```

## Rules

1. **Registered entity name, exactly.** A different trading company is a different
   legal person, with different registration.
2. **One `accepts:` entry per EWC code.** "Recycling" is not a code. Matching
   filters on codes.
3. **Date every price.** An undated gate fee is a rumour. Re-confirm every
   `[FILL IN — months, suggest 6]`.
4. **Never invent a rate.** `[FILL IN]` and let matching return `UNPRICED`. A made-up
   gate fee produces a made-up margin and a real loss.
5. **Suspend, don't delete.** Lapsed registration → `status: suspended`, out of
   matching, record retained with the reason.
6. **Supersede, don't overwrite.** Entity change → new `SUP-` id, old one
   superseded, linked.
7. **Evidence lives in Drive**; the record holds the path. A record with no
   evidence path is unverified however confident it looks.

## Adding a supplier

1. Create the record, ● fields complete.
2. Compliance runs `duty-of-care-check.md` — carrier register, site permit, both
   evidenced.
3. Confirm gate fees and haulage in writing; date them.
4. Confirm WTN method and whether a weighbridge ticket is issued.
5. `status: active` — matching can now see them.
6. Mirror to Notion for phone access; note any `[FILL IN]` still open.

## Definition of done

All ● fields present, `verified_on` inside 12 months, at least one dated
`accepts:` entry, evidence path set, status explicit.

## Failure modes

| Failure | Cost |
| --- | --- |
| Missing EWC entry | matching skips a supplier that could serve the enquiry |
| Undated gate fee | quoted margin is fiction |
| No catchment | local-first ranking can't run |
| No weighbridge flag | tonnage estimated, margin approximate, nobody knows |
| Trading name not registered name | duty-of-care check verifies the wrong entity |
