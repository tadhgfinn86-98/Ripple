---
sop: fee-calculation
department: finance
owner: finance
review_date: "[FILL IN]"
used_by: [revenue-pulse, carrier-match, quote-builder]
supersedes: fee-calculation
---

# SOP — Fee calculation

**Purpose.** One method for computing what Ripple earns, used identically by
matching, quoting and invoicing.

## The model — pure fee, cost passed through

Confirmed by Tadhg 2026-08-02.

```
producer pays  =  supplier_cost (at cost, no markup)  +  ripple_fee
ripple_revenue =  ripple_fee
```

Ripple takes **no spread on the supplier invoice**. Supplier cost is passed
through unchanged. Two consequences run through everything:

1. **The saving is genuinely verifiable.** The producer can check Ripple's
   supplier invoices against their old ones. Ripple is not measuring a saving
   against a price it set. Protect that — a quiet markup would destroy the one
   thing that makes a 50% savings share defensible.
2. **Revenue is per customer per year, not per movement.** A movement is still
   the unit of *compliance* and of *cost*, but no longer the unit of revenue.
   Do not report "margin per movement"; it is always zero by design.

## The two fee bases

Chosen per customer at contract (`context/offers.md`).

### Savings share — 50% of year-one saving

```
annual_saving    = baseline_annual_cost − new_annual_cost
ripple_fee_yr1   = annual_saving × 0.50
```

- `baseline_annual_cost` — from the producer's **actual prior invoices**,
  like-for-like, agreed in writing. Not their estimate.
- `new_annual_cost` — supplier cost under Ripple, at cost.
- Excludes pass-through movements outside Ripple's control (landfill tax
  changes, statutory rates). A tax rise is not Ripple losing them money.
- Excludes volume changes. Same streams, same frequency, same sites.
- **Year two onward:** `[FILL IN]` — unset. Every quote past month 12 is
  unpriced until this is answered.

### Managed value — 15% of managed value

```
ripple_fee = managed_annual_spend × 0.15
```

Used where there is no usable baseline — new site, first contract, or the
producer prefers a flat percentage. Recurring, and not limited to year one.

`managed_annual_spend` = total annual waste spend Ripple arranges for them,
at cost. Define exactly what's in it: `[FILL IN — does it include container
hire and surcharges, or just haulage + gate fees?]`

## Other revenue lines

Separate from the brokerage fee. Report them separately or the picture blurs.

| Line | Rate | Recurring? |
| --- | --- | --- |
| Paid deep audit | £150 – £400 | one-off |
| Compliance, one-off | £150 – £350 | one-off |
| Compliance, retained | £30 – £75 / month | **yes** |
| Contract & tender support | `[FILL IN]` | one-off |
| Reporting retainer | `[FILL IN]` | `[FILL IN]` |

Retained compliance is currently the only genuinely recurring line. Track it
separately — £30–75/month is the most predictable revenue Ripple has.

## Customer value

```
year_one_value = brokerage_fee + audit_fee + compliance_fee(×12 if retained)
recurring_run_rate = compliance_retainer × 12 + [FILL IN — year-two brokerage]
```

`revenue-pulse` reports both. The gap between them is the cliff at month 12,
and it is the most important number in the business until the year-two basis
is set.

## Supplier cost — still calculated, still matters

Pass-through does not mean unmeasured. It is the "new cost" side of the saving.

```
supplier_cost = haulage
              + (gate_fee × tonnes)      # negative if the material earns a rebate
              + container_hire
              + delivery_exchange
              + surcharges
              + landfill_tax             # landfill-bound streams, pass-through
```

An unpriced outlet means an unprovable saving, which means an **uninvoiceable
fee**. That is why `carrier-match` returning `UNPRICED` is a commercial blocker,
not a cosmetic one.

Movements per month: weekly **4.33**, fortnightly **2.17**, monthly **1.0**.

## Three stages of a saving, never confused

| Name | When | Cost source | Use |
| --- | --- | --- | --- |
| **Indicative** | at matching | supplier rate card | choose the outlet |
| **Quoted** | at quote | supplier rate card | set the fee, agreed in writing |
| **Realised** | ongoing | **actual supplier invoices** | what Ripple can defend and invoice |

`revenue-pulse` always labels which it is reporting. Quoted minus realised is
the number that says whether the fee was set on a fiction — and unlike a
markup model, the producer can compute it too.

## Verifying a saving

1. Baseline agreed in writing before any fee is charged. Store the prior
   invoices as evidence.
2. Each period, total actual supplier invoices for like-for-like service.
3. `realised_saving = baseline_period_cost − actual_period_cost`, adjusted for
   volume changes and statutory rate moves.
4. Realised drifting below quoted → tell the producer before they notice. On a
   savings share, their interest and Ripple's are aligned; hiding it is the only
   way to break that.
5. Record the cause: `rate_change | volume_change | surcharges | outlet_change |
   baseline_error | statutory`.

## Floors

- Minimum contract value below which a customer isn't worth taking: `[FILL IN]`
- Below-floor customers are flagged, not signed, without a written decision
  from Tadhg recorded on the record.

## Working capital

If Ripple pays suppliers before producers pay Ripple, every customer consumes
cash before producing it — and on a pass-through model Ripple is fronting the
*whole* supplier cost, not just a margin. Exposure is larger than it looks.

```
cash_gap_days = supplier_payment_terms − producer_payment_terms
exposure      = supplier_cost_in_flight        # the full pass-through, not a margin
```

`[FILL IN — both payment terms.]` `[ASSUMPTION — worth checking whether the
producer can be billed by the supplier direct, leaving Ripple fee-only and out
of the cash flow entirely.]`

## What is never revenue

- Supplier cost passed through. It is not turnover to celebrate.
- Landfill tax. Pass-through, and excluded from the saving.
- VAT.
