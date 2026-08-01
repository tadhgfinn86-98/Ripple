---
sop: margin-calculation
department: finance
owner: finance
review_date: "[FILL IN]"
used_by: [revenue-pulse, carrier-match, quote-builder]
---

# SOP — Margin calculation

**Purpose.** One formula, used identically by matching, quoting and reconciling,
so quoted margin and actual margin are comparable.

## The formula

```
supplier_cost = haulage
              + (gate_fee × tonnes)        # negative if the material earns a rebate
              + container_hire
              + delivery_exchange
              + surcharges                 # contamination, overweight, waiting, wasted journey
              + landfill_tax               # landfill-bound streams only, pass-through

margin        = charge_to_producer − supplier_cost
margin_pct    = margin ÷ charge_to_producer
```

All figures **ex-VAT, GBP**, per **movement**. Monthly and quarterly figures are
aggregates of movement margin, never a separate calculation.

Movements per month by frequency: weekly **4.33**, fortnightly **2.17**, monthly
**1.0**, one-off **n/a** (report as a single movement, never annualised).

## Three margins, never confused

| Name | When | Source of cost | Use |
| --- | --- | --- | --- |
| **Indicative** | at matching | supplier rate card | choose the outlet |
| **Quoted** | at quote | supplier rate card | set the price |
| **Actual** | at reconciliation | **the supplier's invoice** | report the truth |

`revenue-pulse` always labels which it is reporting. Variance = actual − quoted;
that variance is the most useful number in the business, because it says whether
the rate card is real.

## Reconciling a movement

1. Pull the booked `charge_to_producer` and `expected_supplier_cost` from `MOV-`.
2. Pull the actual supplier invoice; match line by line, including surcharges.
3. Pull tonnage from the **weighbridge ticket**. No ticket → tonnage is estimated
   → margin is approximate → label it `estimated: true`. Never silently.
4. Compute actual margin and variance.
5. Variance beyond `[FILL IN — %, suggest 10]` → record the cause:
   `overweight | contamination | wasted_journey | rate_change | mis-set_charge | tonnage_estimate`.
6. Repeated same-direction variance on a stream → the rate card is wrong. Raise
   to sales for the charge-out and operations for the outlet.

## Rebates

Where a material earns rather than costs (clean baled cardboard, film, used
cooking oil, metals), `gate_fee` is negative and supplier cost may be negative.
Margin still = charge − cost. State the price basis and its date — end-market
prices move, and a stale rebate assumption turns a good movement into a loss.

## The margin floor

Minimum acceptable margin per movement: `[FILL IN — offers.md]`.

Below the floor: flag, don't book. Exceptions need an explicit written decision
from Tadhg, recorded on the movement, with the reason (land a multi-site
customer, fill a network gap, seasonal). Track how many exceptions run — a floor
with routine exceptions is not a floor.

## What is not margin

- **Landfill tax** is a pass-through. Marking it up is a commercial decision that
  must be explicit, not accidental. `[FILL IN — pass through at cost, or marked up?]`
- **VAT** is never margin.
- **Contract/tender support fees** and **reporting retainers** are separate revenue
  lines, not movement margin. Report them separately or the per-movement figure
  is corrupted.

## Working capital

If Ripple pays suppliers on `[FILL IN]` days and producers pay Ripple on
`[FILL IN]` days, every new movement consumes cash before it produces it. Track:

```
cash_gap_days = supplier_payment_terms − producer_payment_terms   # negative = Ripple funds the gap
exposure      = movements_in_flight × avg_supplier_cost
```

`revenue-pulse` reports exposure weekly. Growth without watching this is the
classic way a profitable brokerage runs out of money.
