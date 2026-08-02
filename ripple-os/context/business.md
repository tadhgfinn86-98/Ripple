# Business model — Ripple Recycling

> UK waste **brokerage**. Non-hazardous commercial waste.
> *"Waste, handled properly."*

## What a broker actually is

Ripple arranges the movement of waste between the business that produces it and
a licensed carrier or permitted facility that takes it. Ripple **never handles,
carries, stores or treats the waste itself** and owns no vehicles or containers.

```
  PRODUCER                RIPPLE                 CARRIER / OUTLET
  (restaurant,   ──────▶  (broker)  ──────▶      (licensed hauler,
   warehouse,             arranges,               transfer station,
   office)                prices,                 MRF, AD plant,
                          documents               end-market)
        ◀──── one invoice, one contact ────┘
```

Ripple's product is **the arrangement**: the right outlet, at the right price,
with the paperwork intact, replacing a dozen vendor relationships with one.

## How Ripple makes money

**Fees. Not a markup.** Confirmed 2026-08-02: supplier cost is passed through to
the producer **at cost**, and Ripple charges a stated fee on top.

```
producer pays  =  supplier_cost (at cost)  +  ripple_fee
ripple_revenue =  ripple_fee
```

| Line | Rate | Recurring? |
| --- | --- | --- |
| Brokerage — savings share | **50% of year-one saving** vs an agreed baseline | year one only |
| Brokerage — managed value | **15% of managed annual spend** | yes |
| Audit — free tier | £0 (one invoice, three photos, one page, 48h) | — |
| Audit — paid deep work | **£150 – £400** | one-off |
| Compliance — one-off | **£150 – £350** | one-off |
| Compliance — retained | **£30 – £75 / month** | **yes** |
| Contract / tender support | `[FILL IN]` | one-off |
| Reporting retainer | `[FILL IN]` | `[FILL IN]` |

Three things follow from pass-through, and they run through the whole OS:

1. **The saving is verifiable.** A producer can check Ripple's supplier invoices
   against their old ones. That is what makes charging half of it defensible —
   and a quiet markup would destroy it.
2. **The unit of revenue is the customer-year, not the movement.** A movement is
   still the unit of *cost* and of *compliance*, but margin per movement is zero
   by design. Finance never reports it.
3. **The audit is commercially load-bearing.** No prior invoice → no baseline →
   no provable saving → the customer can only go on managed value. The "one
   invoice" the free audit asks for is the thing the fee is calculated from.

Minimum contract value below which a customer isn't worth taking: **[FILL IN]**
Year-two basis when the year-one savings share ends: **[FILL IN]** — unset, and
it blocks every quote whose term runs past month 12.

## Why brokerage works here

- Producers get one relationship, one invoice, benchmarked pricing, audit-ready
  paperwork — and a broker whose fee only exists if it saved them money.
- Ripple carries no fleet cost, no depot, no bin stock — the cost base is time and knowledge.
- Suppliers get filled vehicles and pre-qualified, correctly-classified loads.
- The moat is the **network**: which facility takes which EWC code, in which
  postcode, at what gate fee, with what turnaround. See `suppliers.md`.

## Legal frame (UK)

| Obligation | What it means for Ripple |
| --- | --- |
| **Upper-tier waste broker/dealer registration** (Environment Agency) | Mandatory to arrange movements of other people's waste. Renews annually. Number: `[FILL IN]` |
| **Section 34 duty of care** (EPA 1990) | Ripple is a party in the chain of custody. Must take reasonable steps that waste goes only to an authorised person, and keep records. |
| **Waste transfer note (WTN)** | Required for every non-hazardous transfer. Must record EWC code, description, quantity, parties, SIC code, and the waste hierarchy declaration. Retain **2 years**. |
| **Carrier registration check** | The carrier must hold a valid upper-tier carrier registration covering that waste. Verify on the EA public register before first use and at renewal. |
| **Facility permit / exemption check** | The receiving site must be permitted (or exempted) for that EWC code. |
| **EWC / List of Waste codes** | Every stream is carried with its six-digit code. Misclassification is the most common compliance failure. |
| **Waste hierarchy declaration** | Confirm the hierarchy has been applied — reduce, reuse, recycle, recover, dispose. |
| **Hazardous waste** | Out of scope. Requires consignment notes and a different regime. Do not arrange. |

`[ASSUMPTION]` Operating in **England** under Environment Agency rules. SEPA
(Scotland), NRW (Wales) and NIEA (NI) differ. `[FILL IN if you operate outside England]`

## Operating shape

- **Virtual.** No site visits as standard. The free audit is remote: one invoice,
  three photos, a one-page report inside 48 hours.
- **Paperless by design.** Every note, ticket and report lives online.
- **Local-first placement.** Route to the nearest suitable permitted facility first.
- **Every tonne tracked.** Diversion measured from weighbridge tickets, not estimated.
- **A tree planted per contract.** Funded per new client contract. Provider: `[FILL IN]`

## The movement lifecycle

1. **Enquiry** — inbound, any channel → structured record (`operations/enquiry-router`)
2. **Classify** — EWC code + hazardous check (`compliance`)
3. **Match** — carrier/outlet shortlist + indicative margin (`operations/carrier-match`)
4. **Quote** — priced, with follow-up scheduled (`sales/quote-builder`)
5. **Accept** — producer agrees the price
6. **Compliance gate** — carrier registration + facility permit + WTN plan verified (`compliance`)
7. **Book** — date confirmed with carrier and producer (`operations`)
8. **Movement** — collection happens; WTN and weighbridge ticket captured
9. **Reconcile** — actual supplier invoice vs expected; realised saving vs the
   saving the fee was quoted on (`finance`)
10. **Invoice** — issued and chased (`finance`)
11. **Report** — volumes, diversion, cost back to the producer (`finance` + `knowledge`)

A movement cannot pass step 6 with a gap. That is a hard stop, not a warning.

## Current numbers

**Ripple is pre-revenue.** Trading has not started as of 2026-08. These are
zeroes because they are true, not because they are unknown — agents should treat
an empty customer or supplier list as the actual state of the business, not as a
missing record to chase.

| Metric | Value | As of |
| --- | --- | --- |
| Live customers | **0** | 2026-08 |
| Movements per month | **0** | 2026-08 |
| Average fee per customer per year | **0** — no fee earned yet | 2026-08 |
| Recurring run rate | **£0** | 2026-08 |
| Verified carriers/outlets in network | **0** | 2026-08 |
| Landfill diversion rate | n/a — no movements yet | 2026-08 |

### What being pre-revenue means for the OS

- **The network is the first constraint, not sales.** With zero verified
  suppliers, every enquiry becomes a `GAP-` record. Matching cannot return a
  single legal candidate until `suppliers.md` has real entries. That is the
  highest-leverage work in the business right now.
- **Ripple's own upper-tier broker registration must exist before the first
  movement is arranged**, not before the first invoice. `[FILL IN — is it in place?]`
- **The first customer sets the fee precedent.** Whatever basis and baseline the
  first contract uses will be argued from afterwards. Worth getting the written
  baseline right on customer one.
- **No baselines exist yet**, so no savings-share fee has ever been tested
  against a real invoice.
