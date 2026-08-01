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

**Margin per movement.** For each collection:

```
margin = charge_to_producer − cost_from_supplier
```

Where `cost_from_supplier` is haulage + gate fee (or minus a rebate, when the
material has positive value — clean cardboard, some metals). One movement = one
collection/delivery event = the unit of both margin and compliance.

Secondary income lines (all optional, all `[FILL IN]` on rate):

- Contract / tender support fee for benchmarking and negotiating on a client's behalf.
- Reporting retainer for periodic volume / diversion / cost reporting.
- Rebate share where a material sells into an end-market at value.

Target margin per movement: **[FILL IN — £ or % per movement]**
Target margin percentage on a standard non-haz movement: **[FILL IN — %]**
Minimum acceptable margin below which a movement isn't worth booking: **[FILL IN]**

## Why brokerage works here

- Producers get one relationship, one invoice, benchmarked pricing, and audit-ready paperwork.
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
9. **Reconcile** — supplier cost vs charge-out → actual margin (`finance`)
10. **Invoice** — issued and chased (`finance`)
11. **Report** — volumes, diversion, cost back to the producer (`finance` + `knowledge`)

A movement cannot pass step 6 with a gap. That is a hard stop, not a warning.

## Current numbers

| Metric | Value |
| --- | --- |
| Live customers | `[FILL IN]` |
| Movements per month | `[FILL IN]` |
| Average margin per movement | `[FILL IN]` |
| Monthly recurring revenue | `[FILL IN]` |
| Carriers/outlets in network | `[FILL IN]` |
| Landfill diversion rate | `[FILL IN]` |
