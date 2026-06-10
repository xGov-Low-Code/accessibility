# GitHub Pages Site Plan Task Progress

Last updated: 2026-06-09

This file tracks implementation progress for the task files in this folder. The canonical plan remains `agent-docs/2026-06-09-github-pages-site-plan.md`.

## Status Legend

- `Ready`: task is defined and can be picked up when dependencies are met.
- `Blocked`: task cannot proceed without a decision, dependency, or external change.
- `In progress`: task is actively being worked on.
- `Complete`: task acceptance criteria and verification steps have been satisfied.

## Overall Progress

| Task | Status | Depends on | Notes |
| --- | --- | --- | --- |
| [01: Verify Pages And Release Scope](01-verify-pages-and-release-scope.md) | Complete | None | Documented hosting values, first-release scope, data publication rules, ownership, and screenshot non-goal in README. |
| [02: Scaffold Astro Site Foundation](02-scaffold-astro-site-foundation.md) | Complete | 01 | Created the Astro TypeScript site under `site/` with pnpm, GOV.UK Frontend, GitHub Pages base config, shared layout components, and README development commands. |
| [03: Build Canvas Controls Data Contract](03-build-canvas-controls-data-contract.md) | Complete | 02 | Added typed data helpers, validation, active-record filtering, slugs, summary counts, guidance sanitisation, and focused data contract tests. |
| [04: Render Canvas Controls Catalogue](04-render-canvas-controls-catalogue.md) | Complete | 03 | Built `/canvas-controls/` from the real dataset with active-record summary counts, server-rendered table/card listings, fallback text, and no screenshots. |
| [05: Add Progressive Search And Filters](05-add-progressive-search-and-filters.md) | Complete | 04 | Added progressive client-side search, native checkbox filters, shareable query parameters, live result counts, and resettable empty state. |
| [06: Add Control Detail Pages](06-add-control-detail-pages.md) | Complete | 03, 04 | Generated active-control detail pages, added catalogue links, and verified built output. |
| [07: Add Quality And Accessibility Checks](07-add-quality-and-accessibility-checks.md) | Ready | 03, 04, 06 recommended | Add data contract tests, Playwright smoke tests, axe checks, and manual accessibility checklist. |
| [08: Configure GitHub Pages Deployment](08-configure-github-pages-deployment.md) | Ready | 01, 02, 07 recommended | Add the GitHub Actions workflow to build `site/` and deploy `site/dist`. |
| [09: Complete Documentation And Launch Readiness](09-complete-documentation-and-launch-readiness.md) | Ready | 02, 04, 07, 08 recommended | Complete README, public site docs, accessibility statement, contribution notes, and launch-readiness notes. |

## Current Checkpoint

- Task 01 is complete.
- Task 02 is complete.
- Task 03 is complete.
- Task 04 is complete.
- Task 05 is complete.
- Task 06 is complete.
- Hosting, ownership, data publication rules, first-release scope, and screenshot handling are documented in `README.md`.
- The Astro foundation site builds locally, serves under `/accessibility/`, and keeps source datasets outside `site/`.
- The Canvas Controls data contract validates the source export, filters public active records, normalises blank recommendations, creates stable slugs, sanitises guidance HTML, and generates public summary counts.
- The Canvas Controls catalogue renders from the real dataset with active-only counts, complete active-control listings, accessible status, control type, preview status, assessment dates, guidance availability, and clear optional-field fallbacks.
- The Canvas Controls catalogue now progressively enhances with search, recommendation, control type, preview status, and accessibility status filters while keeping all 60 active controls in the server-rendered HTML when JavaScript is unavailable.
- The Canvas Controls detail pages render one page per active public record with base-path-aware catalogue links, sanitised guidance, fallback text for missing guidance and assessment dates, and no screenshots or raw source-system codes.
- The next ready task is `07-add-quality-and-accessibility-checks.md`.

## Update Rules

- Update the relevant task row when work starts, becomes blocked, or completes.
- Add a short checkpoint note whenever a task reaches `Complete`.
- Do not mark a task `Complete` unless its acceptance criteria and verification section have been satisfied.
- Surface skipped checks in the task notes instead of silently treating them as complete.

## Checkpoint Notes

| Date | Task | Note |
| --- | --- | --- |
| 2026-06-09 | Task split | Created the task files and this progress tracker. |
| 2026-06-09 | 01 | Verified the local planning context and documented the public URL, Astro `site`/`base`, first-release scope, data publication rules, ownership and review cadence, and screenshot non-goal in `README.md`. |
| 2026-06-09 | 02 | Scaffolded the pnpm-based Astro TypeScript site in `site/`, configured `site`/`base` for GitHub Pages, added GOV.UK Frontend foundation styles and shared layout/status components, documented local commands, and verified `pnpm run check`, `pnpm run build`, `/accessibility/` preview response, and desktop/narrow visual smoke checks. |
| 2026-06-09 | 03 | Added the typed Canvas Controls data module and focused Vitest contract tests. Verified record count, active-only public data, blank recommendation normalisation, recommendation metadata, unique slugs, nullable fields, summary counts, date formatting, and guidance sanitisation. `pnpm test`, `pnpm run check`, and `pnpm run build` pass. Source JSON was not edited. |
| 2026-06-09 | 04 | Added the canonical `/canvas-controls/` catalogue page, dataset summary component, assessment date display, result count, desktop table, narrow card listing, and fallback text for missing descriptions, guidance, and accessibility-team assessment dates. Verified `npx pnpm@11.5.2 test`, `npx pnpm@11.5.2 run check`, `npx pnpm@11.5.2 run build`, and built HTML assertions for 60 active controls, 63 source controls, inactive-record exclusion, no screenshot rendering, and responsive table/card markup. |
| 2026-06-09 | 05 | Added a progressively enhanced filter panel for search, recommendation values including `Not assessed`, classic/modern type, preview status, and accessibility status. Added deterministic filter logic tests, query-parameter restore/update behaviour, live result-count updates, filtered empty state with reset action, and GOV.UK form component styling. Verified `.\\node_modules\\.bin\\vitest.cmd run`, `.\\node_modules\\.bin\\astro.cmd check`, `.\\node_modules\\.bin\\astro.cmd build`, preview route status 200, Chrome headless filtered URL and empty-result URL behaviour, static no-JavaScript fallback with 60 table rows and 60 cards, native labelled form-control markup, stacked narrow filter layout, and no screenshot rendering. `npx pnpm@11.5.2 test` stopped before running scripts because pnpm requires an `@parcel/watcher` build-script approval in this workspace, so local binaries were used for verification. |
| 2026-06-09 | 06 | Added `/canvas-controls/controls/[slug]/` detail pages for the 60 active public controls, linked catalogue table rows and cards to detail pages, added back-link, metadata, and guidance display components, and verified fallback text for missing guidance and assessment dates. Verified `.\\node_modules\\.bin\\vitest.cmd run`, `.\\node_modules\\.bin\\astro.cmd check`, `.\\node_modules\\.bin\\astro.cmd build`, active-record/detail-page count parity, base-path-aware links, sanitised guidance output, and absence of screenshots/raw source-system codes. `npx pnpm@11.5.2 ...` stopped before running scripts because pnpm requires an `@parcel/watcher` build-script approval in this workspace. |
