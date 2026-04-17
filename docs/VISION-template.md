# <Project Name> — Vision

> Template for a repo-root `VISION.md`. Describes the envisioned, fully-built product — the end-state, not the current shipped state. Read by portfolio skills as primary context when writing highlights and case studies. Usually unpublished (stays in the repo).
>
> Target length: **600–1200 words, 1–2 printed pages.** Shorter = not enough to anchor against recency bias. Longer = no one reads it.
>
> Write in present tense, as if the product already exists in its complete form.

## Problem

What is broken in the world that this product fixes? Be concrete — who suffers, how often, what the current workaround looks like. Avoid vague pain ("users struggle with productivity"). Name the specific friction.

## Who it's for

The specific person or role, not "users." Job title, team size, tooling they already live in, what they're trying to accomplish when they reach for this product. One or two sentences about why alternatives fail *this specific* audience.

## The envisioned product

Two to three paragraphs describing the full product as if it already exists. What you see when you open it. What the core loop is. How it fits into the user's day or workflow. This is the anchor — everything else on the portfolio card should be consistent with this paragraph.

Write it so a reader who has never seen the product can understand *what it is* and *what it does* without going to the site.

## Core capabilities

A superset of the portfolio `highlights[]`. Five to ten bullets covering the full capability surface. Unlike highlights (which are a curated subset for a card), this list is exhaustive within the vision — including capabilities that haven't shipped yet.

- Capability one, described as outcome
- Capability two
- ...

## Why this, not X

Differentiation against the obvious alternatives. Name them. A reader should finish this section knowing why a motivated buyer would pick this over the three things they'd otherwise consider — and in what context each alternative is actually the better choice (honesty builds credibility).

## Non-goals

What this product deliberately is NOT. This is often the most useful section for anchoring scope. Examples:

- Not a replacement for <adjacent category>
- Does not serve <user segment> — they should use <alternative>
- Will not add <tempting-but-distracting feature>

## Current status vs. vision (optional)

One paragraph describing the gap between what's shipped today and the vision above. Update this occasionally — quarterly is fine. Useful for:

- Letting `/portfolio-update` know which capabilities are real vs. aspirational
- Reminding future-you what's still on the path
- Generating honest case studies when the project matures

---

## Maintenance

- Update when the **vision** changes (pivots, scope expansion, target audience shift) — not when features ship (that's what `features[]` in `portfolio.json` is for).
- A vision doc that hasn't changed in a year is usually a good sign, not a stale one. The features shipped underneath it should change; the north star shouldn't wobble.
- If you find yourself rewriting this often, the product hasn't stabilized yet — maybe hold off on a vision doc until the shape is clearer.
