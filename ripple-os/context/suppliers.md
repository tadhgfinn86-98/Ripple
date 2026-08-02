# Suppliers — licensed carriers, disposal outlets, end-markets

The supply side is Ripple's actual asset. A broker is only as good as its answer
to: *who takes this EWC code, from this postcode, at what gate fee, how fast?*

An unpriced supplier record is a commercial blocker, not an admin gap: with no
gate fee there is no new cost, with no new cost there is no provable saving, and
Ripple's fee is half the saving.

Three kinds of supplier, and they are not interchangeable:

| Type | What they are | What Ripple must verify |
| --- | --- | --- |
| **Carrier** | Registered waste carrier who moves the waste | Upper-tier carrier registration, valid, covering that waste; insurance |
| **Outlet / facility** | Permitted site that receives it — transfer station, MRF, AD plant, incinerator/EfW, landfill | Environmental permit or registered exemption covering that EWC code |
| **End-market** | Reprocessor / buyer of a recovered material | Price basis, quality spec, contamination tolerance |

Many suppliers are both carrier and outlet. Verify both roles separately —
a valid carrier registration says nothing about a site's permit.

---

## Supplier record — required fields

```yaml
supplier_id: SUP-000
name: "[FILL IN]"
type: [carrier, outlet, end_market]      # one or more
sites:
  - name: "[FILL IN]"
    postcode: "[FILL IN]"
    catchment: "[FILL IN — radius or postcode areas served]"
registrations:
  carrier_registration: "[FILL IN — CBDU number]"
  carrier_tier: "[FILL IN — upper / lower]"
  carrier_expires: "[FILL IN]"           # compliance-watch reads this
  permit_number: "[FILL IN — EPR permit or exemption ref]"
  permit_expires: "[FILL IN]"
  verified_on: "[FILL IN]"               # date checked against the EA public register
  verified_by: "[FILL IN]"
accepts:
  - ewc: "[FILL IN]"
    description: "[FILL IN]"
    gate_fee: "[FILL IN — £/tonne, or rebate if negative]"
    haulage: "[FILL IN — £ per movement]"
    min_load: "[FILL IN]"
    contamination_limit: "[FILL IN — %]"
service:
  lead_time: "[FILL IN — days]"
  notice_to_cancel: "[FILL IN]"
  weighbridge_ticket: true|false          # needed for tonne-accurate margin and diversion
  wtn_method: "[FILL IN — e-WTN portal / paper / season ticket]"
commercial:
  payment_terms: "[FILL IN]"
  rate_review: "[FILL IN]"
  contact: "[FILL IN — name, email, phone]"
reliability:
  missed_collections_12m: "[FILL IN]"
  notes: "[FILL IN]"
```

---

## The network

`[FILL IN — no carriers, facilities or gate fees are recorded here. Ripple's
carrier network must not be invented. Add real records below, or point this
section at the Notion database that holds them.]`

| Supplier | Type | Base postcode | EWC codes accepted | Carrier reg. expires | Permit expires |
| --- | --- | --- | --- | --- | --- |
| `[FILL IN]` | | | | | |

---

## Verification — before first use and at every renewal

1. Check the carrier on the **Environment Agency public register** of waste
   carriers, brokers and dealers. Record the CBDU number, tier, and expiry.
2. Confirm the receiving site holds a **permit or registered exemption** covering
   the specific EWC code — not the material in general.
3. Save the certificate PDFs to Google Drive; record the expiry in the Notion
   licence register so `compliance-watch` can see it ageing.
4. Re-verify **annually**, or immediately if the carrier changes trading entity.
5. Never book a movement with an unverified or lapsed supplier. Hard stop.

`[ASSUMPTION]` England / Environment Agency. Scotland (SEPA), Wales (NRW) and
Northern Ireland (NIEA) hold separate registers.

---

## Matching logic (used by `operations/carrier-match`)

Rank candidate outlets by, in order:

1. **Legality** — permit covers this EWC code, carrier registration valid. Non-negotiable filter, not a score.
2. **Waste hierarchy** — recycling/recovery over disposal where the material and price allow.
3. **Local-first** — nearest suitable permitted facility. Fewer miles, one of Ripple's four commitments.
4. **Total landed cost** — gate fee + haulage + any surcharge, per movement.
5. **Service fit** — lead time and access constraints against the site's window.
6. **Reliability** — missed-collection history.

Then size the **saving** against the producer's baseline. Ripple passes supplier
cost through at cost and charges 50% of the year-one saving (or 15% of managed
value), so the cheapest legal outlet is always the right answer — Ripple earns
nothing by placing waste more expensively, and earns more by placing it well.
If the resulting fee is below the minimum contract value in `offers.md`
(`[FILL IN]`), flag it rather than signing it.

## End-markets — positive-value materials

Some streams earn rather than cost. Track the price basis, because it moves.

| Material | EWC | Price basis | Current | Buyer |
| --- | --- | --- | --- | --- |
| Cardboard, clean baled | `15 01 01` | `[FILL IN — indexed? spot?]` | `[FILL IN]` | `[FILL IN]` |
| LDPE film, baled | `15 01 02` | `[FILL IN]` | `[FILL IN]` | `[FILL IN]` |
| Used cooking oil | `20 01 25` | `[FILL IN]` | `[FILL IN]` | `[FILL IN]` |
| Metals | `[FILL IN]` | `[FILL IN]` | `[FILL IN]` | `[FILL IN]` |

## Gaps in the network

Where Ripple currently has no verified outlet — these are the holes that lose
enquiries. Keep this list honest.

- `[FILL IN — e.g. "no food waste outlet covering M postcodes"]`
