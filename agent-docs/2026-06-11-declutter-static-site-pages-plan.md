# Declutter Static Site Pages

## Summary

- Keep the current routes and functionality, but make each page do one clear job.
- Optimise the catalogue for a minimal list-first experience: short intro, search/results quickly visible, supporting data moved to `/data/`.
- Treat repeated explanations as canonical content with one main home: site status in the header, data rules on `/data/`, accessibility blockers on `/accessibility/`.

## Key Changes

- Home: reduce to site purpose, available guidance section, and key links. Remove the recommendation-status demo section.
- Catalogue: replace the long intro and full dataset summary with one short sentence plus a compact export note/link to `/data/`. Put search/results before supporting explanation.
- Filters: keep search prominent; move checkbox filters into a native/GOV.UK-styled "Filter results" details block, opened automatically when filter query params are present.
- Results: shorten repeated row/card text. Use "Available"/"None" for guidance, "Yes"/"No" for preview, and avoid repeated long fallbacks like "No guidance available" in catalogue cards.
- Detail pages: keep full metadata, but remove the duplicate "Guidance" metadata row because the following section already covers guidance.
- About/Data/Accessibility: tighten prose so `/about/` explains the project, `/data/` owns source/refresh/inactive/screenshot policy, and `/accessibility/` owns statement readiness and blockers.

## Tests

- Update Playwright smoke tests for the revised copy and ordering.
- Keep coverage for base-path links, filters, detail pages, no screenshots, no raw source codes, and axe checks.
- Add or adjust content assertions so screenshot policy is verified on `/data/`, not repeated across unrelated pages.
- Run `pnpm run check`, `pnpm run test`, `pnpm run build`, and `pnpm run test:e2e` from `site/`.

## Assumptions

- No route removals or major information architecture changes in this pass.
- No screenshots or screenshot placeholders are added.
- GOV.UK Frontend remains the only external UI/design package.
- The header remains the canonical place for "Not an official GOV.UK service" and "Work in progress".
- Full source transparency remains available, but it should not crowd the catalogue's first view.
