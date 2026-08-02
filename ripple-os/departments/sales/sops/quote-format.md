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
2. **The baseline.** Which invoices, which months, like-for-like. The fee is
   derived from this, so it goes on the quote.
3. **The cost, passed through at cost.** Per stream, per month, annualised.
4. **Ripple's fee.** 50% of year-one saving, or 15% of managed value. Shown as
   its own line — never blended into the cost.
5. **What's included.** WTNs and duty-of-care records, one point of contact,
   reporting. Real inclusions only.
6. **What costs extra.** Every surcharge, listed. Nothing hidden for invoice two.
   Compliance is £150–350 one-off or £30–75/month retained — say which applies.
7. **Comparison.** Current annual cost, new annual cost, saving, Ripple's share,
   what the producer keeps, and the compliance gaps found.
8. **Terms.** Contract length, notice, payment terms, quote validity — and what
   happens at month 12 when the year-one share ends.
9. **Next step.** One clear action, one date.

## Price tables — two of them, never merged

**Cost, passed through at cost**

| Stream | EWC | Container | Frequency | Per movement | Per year |
| --- | --- | --- | --- | --- | --- |
| Cardboard, flattened | 15 01 01 | 1100L × 4 | Weekly | `[FILL IN]` | `[FILL IN]` |

**Ripple's fee**

| | |
| --- | --- |
| Current annual cost (baseline) | `[FILL IN]` |
| New annual cost | `[FILL IN]` |
| Annual saving | `[FILL IN]` |
| Ripple's share — 50%, year one | `[FILL IN]` |
| You keep | `[FILL IN]` |

Or, where there is no baseline: **15% of managed value** = `[FILL IN]`.

Annual = per movement × movements per month × 12. Weekly = **4.33**
movements/month (52 ÷ 12), not 4. Fortnightly = 2.17. State the basis.

## Voice

Follow `departments/comms/sops/voice-guide.md`. Specifically:

- Plain, short sentences. Understated.
- No sales adjectives — no "market-leading", "bespoke", "seamless", "hassle-free".
- No exclamation marks.
- The comparison is the argument. Numbers persuade; adjectives don't.
- Never claim Ripple collects, carries or treats waste. Ripple *arranges*.

## Hard rules

- No price and no **baseline** is ever invented. If the supplier cost or the
  prior invoices are missing, the quote goes to Tadhg as a draft with the gap
  named. It does not go to the producer.
- Cost and fee are shown separately. A blended per-lift figure looks like a
  markup and forfeits the thing that makes a savings share defensible.
- No quote leaves without: confirmed EWC code, compliance-cleared outlet, expiry
  date, scheduled follow-up, and a stated baseline.
- A fee below the minimum contract value needs an explicit written decision first.
- A quote whose term runs past month 12 carries the year-two blocker until
  `offers.md` sets that basis.
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
