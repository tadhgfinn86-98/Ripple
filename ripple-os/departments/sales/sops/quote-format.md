---
sop: quote-format
department: sales
owner: sales
review_date: "[FILL IN]"
used_by: [quote-builder, inbox-triage]
---

# SOP — Quote format

**Purpose.** Every quote looks the same, prices the same way, and can be compared
against the incumbent hauler's invoice without a translation step.

## Structure — in this order

1. **What we'd do.** One or two sentences. The streams, the frequency, the site.
2. **The price.** Per movement, per month, annualised. In a table.
3. **What's included.** WTNs and duty-of-care records, one point of contact,
   reporting. Real inclusions only.
4. **What costs extra.** Every surcharge, listed. Nothing hidden for invoice two.
5. **Comparison** (only where the audit gave a current invoice): current cost,
   Ripple cost, difference, and the compliance gaps found.
6. **Terms.** Contract length, notice, payment terms, quote validity.
7. **Next step.** One clear action, one date.

## Price table

| Stream | EWC | Container | Frequency | Per movement | Per month |
| --- | --- | --- | --- | --- | --- |
| Cardboard, flattened | 15 01 01 | 1100L × 4 | Weekly | `[FILL IN]` | `[FILL IN]` |

Monthly = per movement × movements per month. Weekly = **4.33** movements/month
(52 ÷ 12), not 4. Fortnightly = 2.17. State the basis on the quote.

## Voice

Follow `departments/comms/sops/voice-guide.md`. Specifically:

- Plain, short sentences. Understated.
- No sales adjectives — no "market-leading", "bespoke", "seamless", "hassle-free".
- No exclamation marks.
- The comparison is the argument. Numbers persuade; adjectives don't.
- Never claim Ripple collects, carries or treats waste. Ripple *arranges*.

## Hard rules

- No price is ever invented. If `context/offers.md` has `[FILL IN]` for that
  stream, the quote goes to Tadhg as a draft with the gap named. It does not go
  to the producer.
- No quote leaves without: confirmed EWC code, compliance-cleared outlet, expiry
  date, scheduled follow-up.
- Margin below the floor in `offers.md` needs an explicit written decision first.
- Ex-VAT, GBP, stated on the quote.
- Landfill tax on landfill-bound streams shown as a pass-through line, since it
  moves each April.

## Delivery

- PDF to `Drive/sales/quotes/<YYYY>/<QUO-id>__<producer>.pdf` `[ASSUMPTION — path
  proposed, not existing]`.
- Sent by comms as a Gmail draft for review. Never auto-sent.
- ClickUp pipeline moves to `quoted` on send.
- Follow-up scheduled the same day the quote goes out.

## After it's sent

| Outcome | Action |
| --- | --- |
| **Won** | Hand to operations to book (`booking-a-movement.md`); finance records baseline charge and expected supplier cost; plant the tree |
| **Lost** | Record the reason — price, timing, incumbent contract, service fit — and the number that would have won it. That data is what fixes the rate card |
| **Silent** | Follow-up cadence runs; finance's cold-deal detection catches what sales misses |
