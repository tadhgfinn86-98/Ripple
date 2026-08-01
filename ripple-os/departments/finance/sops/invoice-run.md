---
sop: invoice-run
department: finance
owner: finance
review_date: "[FILL IN]"
used_by: [revenue-pulse, compliance-watch]
---

# SOP — Invoice run

**Purpose.** Every collected movement gets invoiced, once, correctly, on schedule.

`[ASSUMPTION]` No accounting connector (Xero/QuickBooks) is available, so the
ledger is a Google Drive sheet and invoices are produced from it.
`[FILL IN if you use accounting software — this SOP changes materially.]`

## Cadence

| | |
| --- | --- |
| Run | `[FILL IN — e.g. monthly in arrears, first working day]` |
| Terms to producer | `[FILL IN — e.g. 30 days]` |
| Terms Ripple pays suppliers | `[FILL IN]` |
| Chase points | `[FILL IN — e.g. due−3, due+1, due+14]` |

## Steps

1. **Select** movements with `status: documented` in the period — collected, WTN
   filed, weighbridge ticket captured.
2. **Hold anything undocumented.** A movement missing its WTN is a compliance
   critical *and* unbilled revenue. Raise to compliance; do not invoice around it.
   `[ASSUMPTION — confirm you'd rather hold than bill and chase paperwork after.]`
3. **Reconcile first.** Actual supplier cost against expected, per
   `margin-calculation.md`. Invoice the agreed charge-out — never a
   back-calculation from supplier cost, which would leak Ripple's margin.
4. **Apply surcharges** that actually occurred, each evidenced: contamination
   photo, overweight ticket, wasted-journey note. An unevidenced surcharge is a
   dispute waiting to happen.
5. **Build the invoice.** One line per movement: date, site, stream + EWC,
   container, charge. Landfill tax shown separately where it applies. Ex-VAT
   subtotal, VAT, total.
6. **Check before sending:** right entity, right PO reference `[FILL IN — do
   customers use POs?]`, right site, no duplicate movement, no movement from a
   prior invoice.
7. **Send** as a Gmail draft via comms for review. Never auto-sent.
8. **Record** invoice number, date, amount, due date against every movement it
   covers. `status: invoiced`.
9. **Chase** at the defined points. Drafts by comms, in Tadhg's voice — factual,
   short, no apology for asking.
10. **Reconcile payment**, set `status: reconciled`, close the movement.

## Invoice line

```yaml
invoice: INV-0000
customer: "..."
period: 2026-07
lines:
  - movement: MOV-0000
    date: 2026-07-03
    site: SITE-000
    stream: "cardboard, flattened"
    ewc: "15 01 01"
    container: "1100L x 4"
    charge: "[FILL IN]"
    surcharges: []
subtotal_ex_vat: "[FILL IN]"
vat: "[FILL IN]"
total: "[FILL IN]"
due: "[FILL IN]"
status: draft | sent | paid | overdue | disputed
```

## Disputes

1. Stop the chase clock on the disputed line only. Invoice the rest.
2. Produce the evidence: WTN, weighbridge ticket, photo, booking confirmation.
3. Wrong → credit it same week, no argument. Right → send the evidence and hold.
4. Record the cause. Repeated disputes on one stream or supplier is a process
   defect, not bad luck.

## Supplier invoices in

- Check against the booked movement before paying. Overweight and contamination
  charges appear here first, and they are the main margin leak.
- Query anything unbooked, duplicated, or beyond the agreed rate.
- A supplier who consistently invoices above rate card is a rate-card problem —
  raise to operations and knowledge.

## Never

- Never invoice a movement with no WTN without a recorded decision to do so.
- Never invent a charge to fill a `[FILL IN]`.
- Never invoice twice for the same movement — the movement ID is the guard.
- Never auto-send an invoice or a chaser.
