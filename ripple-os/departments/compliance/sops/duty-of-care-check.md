---
sop: duty-of-care-check
department: compliance
owner: compliance
review_date: "[FILL IN]"
used_by: [compliance-watch, carrier-match]
---

# SOP — Duty of care check

**Purpose.** Prove, per movement, that the waste goes only to an authorised
person and that a record exists. This is the section 34 duty of care under the
Environmental Protection Act 1990, and Ripple is a party in the chain as broker.

`[ASSUMPTION]` England / Environment Agency. Confirm the equivalent register and
regulator before arranging anything in Scotland, Wales or Northern Ireland.

## The four checks

### 1. Carrier authorised
- Registered waste carrier, **upper tier**, on the Environment Agency public
  register of carriers, brokers and dealers.
- Record: CBDU number, registered entity name, tier, expiry, date checked, who checked.
- Registered name must match the entity actually invoicing Ripple. A different
  trading company is a different legal person — re-check.

### 2. Receiving site authorised
- Environmental permit, or a registered exemption, covering **the exact EWC
  code**. Not "recycling", not "waste" — the code.
- Record: permit/exemption reference, site address, expiry, date checked.
- A transfer station's permit does not automatically cover the final destination;
  where Ripple states an end route, check that too.

### 3. Waste correctly described
- Six-digit EWC code confirmed per `ewc-classification.md`.
- Written description matching what is actually collected.
- Quantity, container type and count.

### 4. Record will exist
- A WTN for every transfer, or a valid season ticket covering a series of
  identical transfers between the same parties.
- Complete with EWC code, description, quantity, both parties' details, producer's
  **SIC code**, and the **waste hierarchy declaration**.
- Retained **2 years**.

## Evidence standard

Every check needs a stored artefact, not a memory:

| Check | Artefact | Where |
| --- | --- | --- |
| Carrier registration | screenshot/PDF of the register entry + certificate | Drive → `compliance/carriers/<SUP-id>/` |
| Site permit | permit or exemption PDF | Drive → `compliance/permits/<SUP-id>/` |
| Verification date | `verified_on` + `verified_by` | Notion licence register |
| WTN | signed note | Drive → `compliance/wtn/<YYYY>/<MOV-id>.pdf` |

`[ASSUMPTION]` Drive folder structure above is proposed, not existing. `[FILL IN
if you already have one.]`

## Cadence

| When | What |
| --- | --- |
| Before first use of a supplier | all four checks, full evidence |
| Before every booking | registration and permit valid **at the collection date** |
| Every 12 months per supplier | re-verify against the register |
| Weekly | expiry sweep across the whole network |
| On any change of trading entity, permit variation, or new EWC code | full re-check |

## Failure handling

- **Expired registration or permit** → supplier suspended from matching. Existing
  bookings with that supplier stop until renewed evidence arrives.
- **Permit doesn't cover the code** → not a paperwork problem. Re-match the outlet.
- **Cannot find the carrier on the register** → do not use them. No exceptions,
  no "certificate is in the post".
- **Producer disputes the classification** → compliance rules, in writing, with
  reasoning recorded on the enquiry.

## Why it matters commercially

A broker's defence in an enforcement action is its records. Ripple's compliance
service is also a product Ripple sells (see `context/offers.md`) — the standard
applied internally is the standard being sold.
