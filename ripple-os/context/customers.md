# Customers — waste producers, sites, segments

A **producer** is the business whose site the waste comes from. In law they are
the waste holder and the duty of care starts with them. Ripple contracts with
the producer, arranges the movement, and invoices them.

The unit that matters operationally is not the customer, it is the **site** —
one customer can have many sites, each with its own streams, access constraints
and collection schedule.

---

## Segments

### Restaurants & hospitality
- **Streams:** food waste (`20 01 08`), used cooking oil (`20 01 25`), glass, cardboard, general.
- **Shape:** small volumes, high frequency, tight access windows around service hours.
- **Pain:** food waste separation, smell/pest complaints, missed collections at peak trade, cooking oil handled ad hoc.
- **What wins it:** collection times that respect service, and one contact when a lift is missed.
- **Watch:** food waste is a segregation obligation, not an option — flag producers still binning it as general.

### Warehousing & distribution
- **Streams:** cardboard (`15 01 01`), pallet wrap / LDPE (`15 01 02`), timber, general.
- **Shape:** larger volumes, predictable, often balable — the material may carry positive value.
- **Pain:** paying to dispose of material that should earn a rebate; overflowing yards; unbenchmarked incumbent contracts.
- **What wins it:** showing baled cardboard and film as revenue rather than cost.

### Commercial — offices, retail, light industrial
- **Streams:** general (`20 03 01`), DMR, some glass and confidential waste.
- **Shape:** steady, low-drama, low volume per site, but multi-site potential.
- **Pain:** inherited overpriced contracts, no reporting, no idea whether they're compliant.
- **What wins it:** the free audit — the gap is usually visible on the invoice alone.

`[ASSUMPTION]` These three segments come from Ripple's own site copy. Any
segment weighting, target mix, or ideal customer profile is `[FILL IN]`.

---

## Site record — the shape operations expects

```yaml
site_id: SITE-000
customer: "[FILL IN]"
segment: restaurant | warehouse | commercial
address:
  line1: "[FILL IN]"
  town: "[FILL IN]"
  postcode: "[FILL IN]"      # drives outlet distance / local-first placement
sic_code: "[FILL IN]"         # required on every waste transfer note
contact:
  name: "[FILL IN]"
  role: "[FILL IN]"
  email: "[FILL IN]"
  phone: "[FILL IN]"
access:
  window: "[FILL IN — e.g. 06:00–10:00, before service]"
  vehicle_limit: "[FILL IN — e.g. 7.5t max, low bridge, no artic]"
  notes: "[FILL IN — gate code, bin store location, one-way street]"
streams:
  - ewc: "20 03 01"
    description: mixed municipal waste
    container: "[FILL IN — size and count]"
    frequency: "[FILL IN — lifts per week]"
    outlet: "[FILL IN — supplier_id]"
contract:
  start: "[FILL IN]"
  term: "[FILL IN]"
  notice: "[FILL IN]"
  review_date: "[FILL IN]"
fee:
  basis: savings_share | managed_value   # savings share needs a real baseline
  baseline_annual_cost: "[FILL IN — from their prior invoices]"
  baseline_agreed_in_writing: false      # must be true before any fee is invoiced
  baseline_evidence: "[FILL IN — Drive path to the invoices]"
  year_one_fee: "[FILL IN]"              # 50% of saving, or 15% of managed value
  year_one_ends: "[FILL IN]"             # the month-12 cliff
  year_two_basis: "[FILL IN — unset in offers.md]"
  compliance_retainer: "[FILL IN — £30–75/month, or none]"
tree_planted: false            # one per new contract
```

---

## Live customer list

`[FILL IN — no customer names, sites, volumes or contract values are recorded
in this repo yet. Do not invent them. Add real records under this heading, or
point this section at the ClickUp/Notion list that holds them.]`

| Customer | Sites | Segment | Streams | Movements/mo | Status |
| --- | --- | --- | --- | --- | --- |
| `[FILL IN]` | | | | | |

---

## Pipeline stages

`enquiry → audit sent → audit returned → quoted → won / lost`

Definitions live with sales (`departments/sales/`). Stage is held in ClickUp;
finance reads the same board to detect ageing. Cold threshold: `[FILL IN — days]`

## Segment-level notes for agents

- Always capture the **site**, not just the company — cost is postcode-sensitive.
- Always capture their **current invoice**. Ripple's brokerage fee is 50% of the
  saving against it; with no baseline the customer can only go on managed value.
- Always capture **frequency**; a one-off skip and a weekly lift are different products.
- Always capture the **SIC code** at onboarding; without it a WTN cannot be completed correctly later.
- Never assume a stream's EWC code from the segment. Compliance classifies per enquiry.
