# Offers — services and pricing

> Pricing given by Tadhg 2026-08-02. Rates below are **real** — agents may use
> them. Anything still marked `[FILL IN]` is unset and must not be estimated.
>
> **Ripple charges fees, not a hidden per-movement markup.** The fee is stated to
> the producer and computed from a benchmarked baseline. That makes the audit
> commercially load-bearing: no baseline, no saving, no fee.

## 1. Waste audit — the front door

Two tiers. The free one qualifies; the paid one is real work.

### Free audit
| | |
| --- | --- |
| Producer sends | one recent waste invoice + three photos of bins/skips/storage |
| Ripple returns | a one-page report inside **48 hours** |
| Covers | current cost vs benchmark, compliance gaps, diversion opportunity |
| Price | **Free** |
| Purpose | qualifies the enquiry **and establishes the cost baseline every brokerage fee is calculated from** |

### Paid deep audit
| | |
| --- | --- |
| Price | **£150 – £400** one-off |
| What moves it up the range | `[FILL IN — sites? streams? contract review? on-site element?]` |
| Deliverable | `[FILL IN — how does this differ from the free one-pager: length, scope, data?]` |
| Turnaround | `[FILL IN]` |
| Credited against a brokerage fee if they go ahead? | `[FILL IN — yes / no]` |

## 2. Brokerage — the core service

Ripple sources and manages the right carrier/outlet for every stream. One
relationship replaces a dozen vendor calls.

**Two fee bases. One is chosen per customer, at the start.**

| Basis | Rate | Computed from | Best when |
| --- | --- | --- | --- |
| **Savings share** | **50% of year-one saving** | (benchmarked current annual cost) − (new annual cost) | there is a real prior invoice to benchmark against |
| **Managed value** | **15% of managed value** | total annual waste spend Ripple manages | no usable baseline — new site, first contract, or the producer prefers a flat percentage |

```
savings_share_fee = (current_annual_cost − new_annual_cost) × 0.50     # year one
managed_value_fee = managed_annual_spend × 0.15
```

`[ASSUMPTION]` The basis is chosen per customer at contract, not per movement,
and not switched mid-term. `[FILL IN — confirm, and confirm who chooses.]`

### Open questions on the brokerage fee — these block quoting

| Question | Why it matters |
| --- | --- |
| **Year two onward?** The saving share is explicitly *year-one*. | Without an answer, every quote past month 12 is unpriced. `[FILL IN — reverts to 15% of managed value? a renewal fee? nothing?]` |
| **Billed how?** Monthly over year one, quarterly, or on proof of saving? | Determines the working-capital gap. `[FILL IN]` |
| **Does Ripple also mark up the supplier invoice?** | If not, Ripple is a pass-through on cost and the fee is the whole revenue. If yes, the producer's "saving" is measured against a price Ripple set. `[FILL IN — see the note in `business.md`]` |
| **What counts as "saving"?** Like-for-like service only, or does added compliance/reporting value count? | The producer will test this. `[FILL IN]` |
| **Floor.** Minimum fee below which a customer isn't worth taking. | `[FILL IN — needed by `booking-a-movement.md`]` |
| **Cap?** Any ceiling on a savings share for a very large account? | `[FILL IN]` |

### Baseline rules

The saving is only as defensible as the baseline. So:

1. Baseline = the producer's **actual prior invoices**, not their estimate.
   `[FILL IN — how many months of invoices constitute a baseline? Suggest 3.]`
2. Baseline is **like-for-like**: same streams, same frequency, same sites.
   Volume changes are adjusted out, not counted as Ripple's saving.
3. Baseline is **recorded and agreed in writing** before the fee is charged.
4. **Pass-through cost movements are excluded** — landfill tax rises each April,
   and a saving that evaporates on an external rate change was never Ripple's.
5. No baseline → savings share cannot be used → managed value basis.

## 3. Compliance service

Duty of care records, WTNs, licence checks, audit-ready trail.

| | |
| --- | --- |
| One-off | **£150 – £350** |
| Retained | **£30 – £75 / month** |
| What moves it up the range | `[FILL IN — sites? streams? volume of WTNs? multi-carrier?]` |
| One-off covers | `[FILL IN — a compliance audit and a fixed-up record set?]` |
| Retainer covers | `[FILL IN — ongoing WTN filing, expiry monitoring, inspection support?]` |
| Included free with brokerage, or always charged? | `[FILL IN]` — this is the most commercially significant unanswered question in the file |
| Sold standalone to non-brokerage clients? | `[FILL IN — yes/no]` |

`[ASSUMPTION]` Retained compliance is the only genuinely recurring revenue line
in the business today. £30–75/month is ~£360–900/year per customer, which is
predictable in a way savings-share fees are not. Worth knowing whether that's
deliberate.

## 4. Contract & tender support

Prepare, benchmark and negotiate waste contracts so terms favour the producer.

- Fee model: `[FILL IN — separate fee, or is this what the 50% savings share already pays for?]`
- Rate: `[FILL IN]`
- Typical engagement length: `[FILL IN]`

## 5. Reporting

Volumes, diversion and cost. What left site, where it went, what it achieved.

- Frequency: `[FILL IN — monthly / quarterly]`
- Included in brokerage or retained separately: `[FILL IN]`
- Retainer: `[FILL IN]`

## Streams handled

Ripple's fee doesn't change by stream, but the stream still determines the
outlet, the gate fee, the EWC code and therefore the cost being benchmarked.

| Stream | Typical container | EWC code | Supplier cost |
| --- | --- | --- | --- |
| General waste / mixed municipal | 1100L bin, 8yd skip | `20 03 01` | `[FILL IN]` |
| Dry mixed recycling (DMR) | 1100L bin | `[FILL IN — commonly 15 01 06]` | `[FILL IN]` |
| Cardboard, clean baled | bale / 1100L | `15 01 01` | `[FILL IN — may be a rebate]` |
| Food waste | 120L / 240L caddy | `20 01 08` | `[FILL IN]` |
| Glass | 240L / 1100L | `[FILL IN — commonly 15 01 07]` | `[FILL IN]` |
| Used cooking oil | IBC / drum | `20 01 25` | `[FILL IN — usually a rebate]` |
| Pallet wrap / LDPE film | bale | `15 01 02` | `[FILL IN]` |
| Mixed construction (non-haz) | 8yd skip | `17 09 04` | `[FILL IN]` |
| Wood | skip | `[FILL IN — 17 02 01 or 20 01 38 by source]` | `[FILL IN]` |

`[ASSUMPTION]` EWC codes above are the common ones for these streams from a
commercial source. Compliance confirms per enquiry — the code depends on the
process that produced the waste, not on what the material looks like.

**Supplier costs still matter even on a fee model**, because they are the "new
cost" side of the saving calculation. An unpriced outlet means an unprovable
saving, which means an uninvoiceable fee.

## Surcharges

Pass-through from the supplier, at cost unless stated: contamination,
overweight, failed access / wasted journey, out-of-hours, waiting time,
bin/skip hire, delivery and exchange, congestion or clean-air zone charges.

`[FILL IN — passed through at cost, or marked up? And do surcharges count
against the producer's "saving"?]`

## Commercial terms

| | |
| --- | --- |
| Contract length | `[FILL IN]` — note a year-one savings share implies at least 12 months |
| Notice period | `[FILL IN]` |
| Payment terms to producer | `[FILL IN — e.g. 30 days from invoice]` |
| Payment terms Ripple → supplier | `[FILL IN]` — the working-capital gap |
| Fee billing frequency | `[FILL IN]` |
| Price review | `[FILL IN]` |
| Quote validity | `[FILL IN — e.g. 30 days]` |
| Minimum contract value | `[FILL IN]` |

## Landfill tax

Pass-through cost that materially moves any landfill-bound stream, and it
changes each April. It must be excluded from the saving calculation or a
statutory rate rise will look like Ripple losing the customer money.

- Standard rate `[FILL IN — £/tonne, current year]`
- Lower rate `[FILL IN — £/tonne]`

## What Ripple does not sell

- Hazardous waste movements (consignment-note regime — out of scope)
- Clinical or offensive waste
- Domestic / household collections
- Anything requiring Ripple to physically handle waste
