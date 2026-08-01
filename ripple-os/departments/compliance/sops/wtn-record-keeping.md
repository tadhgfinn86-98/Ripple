---
sop: wtn-record-keeping
department: compliance
owner: compliance
review_date: "[FILL IN]"
used_by: [compliance-watch, revenue-pulse]
---

# SOP — Waste transfer note record keeping

**Purpose.** Every non-hazardous transfer Ripple arranges has a complete,
retrievable waste transfer note. Target: **zero movements without a WTN** (goal 5
in `context/goals.md`).

## What a WTN must contain

| Field | Note |
| --- | --- |
| Description of the waste | plain words, matching what was actually collected |
| **EWC / List of Waste code** | six digits, confirmed — the most common failure point |
| Quantity | weight or volume; weighbridge ticket where available |
| Container type and count | bins, skips, bales |
| Transferor details | producer: name, address, and **SIC code** |
| Transferee details | carrier: name, address, **carrier registration number** |
| Broker details | Ripple: name, address, **upper-tier broker registration number** |
| Place and date of transfer | site address, collection date |
| **Waste hierarchy declaration** | confirmation the hierarchy was applied |
| Signatures | both parties |

Ripple appears on the note **as broker**, not as carrier or holder. Never let a
note describe Ripple as carrying or receiving the waste.

## Retention

- **2 years** for non-hazardous waste transfer notes.
- Retained in a form producible on request to the regulator.
- `[ASSUMPTION]` Ripple retains longer than the minimum where a customer contract
  or tender demands it — `[FILL IN retention period if contractually longer]`.

## Filing

```
Drive/compliance/wtn/<YYYY>/<MOV-id>__<supplier>__<ewc>.pdf
```

Every note is also attached to its `MOV-` record, with `wtn_ref` and `wtn_filed:
true`. A note that exists in an inbox but not in Drive is **not filed**.

`[ASSUMPTION]` Path proposed, not existing. `[FILL IN if Drive is already organised.]`

## Season tickets

One note may cover a series of transfers where **all** hold: same producer, same
carrier, same EWC code and description, same collection point, regular
collections. Valid up to `[FILL IN — confirm current maximum period]`.

If any element changes — code, container, carrier entity, site — the season
ticket is void from that change and a new note is required. Compliance decides
whether a season ticket applies; operations does not assume one.

## Weekly sweep

1. List every `MOV-` collected with `wtn_filed: false`. Age each.
2. Chase the carrier for anything over `[FILL IN — days, suggest 5]`.
3. Check filed notes for completeness — an EWC-blank or unsigned note is missing,
   not filed.
4. Check the EWC code on the note matches the confirmed code on the movement.
5. Report to `compliance-watch` as `critical` — a transfer without a record is a
   present failure, not a backlog item.

## e-WTN

Where the carrier uses an electronic WTN portal, record the portal name and
reference, and export a PDF into Drive at the same path. Ripple's record cannot
depend on continued access to a supplier's system.

## Digital waste tracking

`[ASSUMPTION]` UK digital waste tracking is being introduced and will change how
transfers are recorded. Do not assume the current process is permanent.
`[FILL IN — status and Ripple's readiness]`
