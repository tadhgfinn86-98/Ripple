---
sop: booking-a-movement
department: operations
owner: operations
review_date: "[FILL IN]"
used_by: [carrier-match, compliance-watch, revenue-pulse]
---

# SOP — Booking a movement

**Purpose.** A movement is only booked when it is legal, priced, accepted, and
documented. This SOP is the gate.

A **movement** = one collection/delivery event. It is the unit of margin and the
unit of compliance.

## Pre-conditions — all four, no exceptions

1. **Accepted.** Producer has agreed the price in writing (email is fine).
2. **Compliance cleared.** Carrier registration valid *at the collection date*,
   receiving site permitted for that exact EWC code, both verified within 12
   months. See `departments/compliance/sops/duty-of-care-check.md`.
3. **WTN arranged.** Method known — e-WTN portal, paper, or season ticket — and
   who raises it agreed.
4. **Fee basis agreed.** The customer is on a savings share (with a baseline
   agreed in writing) or on managed value, and the resulting fee clears the
   minimum contract value in `context/offers.md` — or Tadhg has decided in
   writing to accept below it. Supplier cost is passed through at cost; Ripple
   takes no spread on the movement itself.

Any one missing → **stop**. Not "book and chase". The compliance gate outranks
the revenue target every time.

## Steps

1. Create `MOV-` record; link enquiry, match, quote, customer site, supplier.
2. Confirm the date with the supplier, inside the site's access window and
   vehicle limit.
3. Confirm the date to the producer, with what they must do — bin out by 06:00,
   gate unlocked, no contamination.
4. Hold the date in Google Calendar with site, stream, supplier, and access notes.
5. Record the expected `supplier_cost` at booking. This is what gets passed
   through at cost, and what finance reconciles the actual supplier invoice
   against. It is also the "new cost" side of the saving the fee is charged on —
   so an unrecorded cost here becomes an unprovable saving later.
6. After collection, capture **weighbridge ticket** and **WTN**. File to Drive,
   attach to the `MOV-` record. Without a ticket, tonnage is estimated and margin
   is approximate — say so.
7. Hand to finance for reconciliation and invoicing.
8. Log anything that went wrong — missed, contaminated, overweight, refused
   access — against the supplier's reliability history.

## Movement record

```yaml
movement_id: MOV-0000
enquiry: ENQ-0000
customer_site: SITE-000
supplier: SUP-000
ewc: "15 01 01"
collection_date: 2026-08-01
container: "1100L x 4"
expected_supplier_cost: "[FILL IN]"     # passed through at cost, not marked up
counts_toward_saving: true               # exclude statutory/volume moves
compliance: { carrier_reg_valid_at_date: true, permit_covers_ewc: true, wtn_method: "..." }
actual:
  tonnage: "[from weighbridge ticket]"
  supplier_invoice: "[FILL IN]"
  wtn_ref: "[FILL IN]"
  wtn_filed: false
status: booked | collected | documented | invoiced | reconciled
exceptions: []
```

## Cancellation

Cancel before the supplier's notice period (`[FILL IN]` per supplier) or a
wasted-journey charge lands. Record who cancelled and why; a producer-side
cancellation may be rechargeable.

## Recurring movements

A weekly lift is a **schedule**, not one booking, but each collection is still a
movement for margin and WTN purposes. A season ticket may cover a series of
transfers of the same waste, same parties, same route — compliance decides
whether one applies. Registration expiry mid-schedule stops the schedule.
