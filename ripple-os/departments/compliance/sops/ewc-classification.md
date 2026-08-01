---
sop: ewc-classification
department: compliance
owner: compliance
review_date: "[FILL IN]"
used_by: [compliance-watch, enquiry-router, carrier-match]
---

# SOP — EWC classification

**Purpose.** Put the right six-digit code on every stream. Misclassification is
the most common broker failure: it causes rejected loads, wrong gate fees, and
duty-of-care breaches.

## The rule that matters

**The code follows the process that produced the waste, not what the material
looks like.** The same physical cardboard is a different code from a shop's
packaging than from a manufacturing process. Never classify from a photo alone —
ask what activity produced it.

## Procedure

1. **Ask what produced it.** Sector, activity, and the step it came off. "Goods-in
   packaging at a distribution centre" is a classification input; "cardboard" is not.
2. **Find the chapter** (first two digits) that matches that process/sector. Only
   then narrow to the six-digit entry.
3. **Check for mirror entries.** Some wastes have a paired hazardous /
   non-hazardous code, the hazardous one marked with an asterisk. If the
   hazardous mirror could apply, treat the stream as hazardous until proven
   otherwise — and hazardous is **out of scope for Ripple**.
4. **Screen for absolute hazardous entries.** Asbestos, solvents, oils (other than
   used cooking oil), batteries, WEEE, fridges, paints, chemicals, clinical,
   sharps → out of scope, stop, tell the producer plainly Ripple cannot arrange it.
5. **Record the reasoning**, not just the code: what produced it, which chapter,
   why not the mirror entry, who decided, when.
6. **Confirm or reject** the provisional code from `enquiry-router`. Only
   compliance sets `ewc_provisional: false`.
7. **Check the outlet's permit lists that code** before it goes to matching.
8. **Re-check on change.** New process, new material, new supplier at the site,
   or a contamination complaint = reclassify.

## Common commercial streams

`[ASSUMPTION]` These are the usual codes for a commercial, non-hazardous source.
They are a starting point for step 2, never a shortcut past it.

| Stream | Usual code | Care |
| --- | --- | --- |
| Mixed municipal / general waste | `20 03 01` | catch-all; if it's really packaging waste from a commercial process, `15 01 xx` may be right |
| Paper and cardboard packaging | `15 01 01` | vs `20 01 01` paper from a municipal-type source |
| Plastic packaging / film | `15 01 02` | pallet wrap, LDPE |
| Mixed packaging | `15 01 06` | typical DMR |
| Glass packaging | `15 01 07` | vs `20 01 02` glass |
| Food waste | `20 01 08` | biodegradable kitchen and canteen waste |
| Edible oil and fat | `20 01 25` | used cooking oil — **not** hazardous, unlike mineral oils |
| Wood | `17 02 01` (C&D) / `20 01 38` (municipal-type) | treated wood may hit a hazardous mirror |
| Mixed C&D waste | `17 09 04` | only if it contains no hazardous fraction |
| Metals | `20 01 40` / `17 04 xx` | source decides |

Codes above must be confirmed per enquiry. Do not paste them into a WTN unchecked.

## Classification record

```yaml
classification_id: EWC-0000
enquiry: ENQ-0000
stream_description: "flattened cardboard from goods-in"
producing_process: "distribution centre, inbound packaging"
sector: warehousing
chapter_chosen: "15 — packaging waste"
ewc: "15 01 01"
mirror_entry_considered: false
mirror_reasoning: "no hazardous contamination indicated; clean dry packaging"
hazardous: false
decided_by: compliance
decided_on: 2026-08-01
confirmed: true
outlet_permit_lists_code: "[FILL IN — verify per candidate outlet]"
```

## Escalation

If classification is genuinely ambiguous — mixed loads, unknown contamination,
possible mirror entry — do not pick the convenient code. Escalate to Tadhg with
both candidate codes and the consequence of each, and if it stays ambiguous, ask
the receiving facility. They reject the load if it's wrong, so they have the
strongest incentive to be right.

## Reference

`[FILL IN — link Ripple's working copy of the List of Waste / EWC code list, and
the government guidance page used, with the date checked.]`
