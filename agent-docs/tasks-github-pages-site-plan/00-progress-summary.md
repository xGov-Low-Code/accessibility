# GitHub Pages Site Plan Task Progress

Last updated: 2026-06-10

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
| [07: Add Quality And Accessibility Checks](07-add-quality-and-accessibility-checks.md) | Complete | 03, 04, 06 recommended | Added focused data contract checks, Playwright built-output smoke tests, axe checks, and README manual accessibility checklist. |
| [08: Configure GitHub Pages Deployment](08-configure-github-pages-deployment.md) | Complete | 01, 02, 07 recommended | Added the GitHub Actions workflow to install from `site/`, run checks and tests, build, upload `site/dist`, and deploy to GitHub Pages. Follow-up patched Node 24-compatible action versions and documented the required one-time Pages source setting. |
| [09: Complete Documentation And Launch Readiness](09-complete-documentation-and-launch-readiness.md) | Complete | 02, 04, 07, 08 recommended | Added README launch docs, public About/Data/Accessibility pages, contribution notes, and explicit final-statement launch blockers. |

## Current Checkpoint

- Task 01 is complete.
- Task 02 is complete.
- Task 03 is complete.
- Task 04 is complete.
- Task 05 is complete.
- Task 06 is complete.
- Task 07 is complete.
- Task 08 is complete.
- Task 09 is complete.
- Hosting, ownership, data publication rules, first-release scope, and screenshot handling are documented in `README.md`.
- The Astro foundation site builds locally, serves under `/accessibility/`, and keeps source datasets outside `site/`.
- The Canvas Controls data contract validates the source export, filters public active records, normalises blank recommendations, creates stable slugs, sanitises guidance HTML, and generates public summary counts.
- The Canvas Controls catalogue renders from the real dataset with active-only counts, complete active-control listings, accessible status, control type, preview status, assessment dates, guidance availability, and clear optional-field fallbacks.
- The Canvas Controls catalogue now progressively enhances with search, recommendation, control type, preview status, and accessibility status filters while keeping all 60 active controls in the server-rendered HTML when JavaScript is unavailable.
- The Canvas Controls detail pages render one page per active public record with base-path-aware catalogue links, sanitised guidance, fallback text for missing guidance and assessment dates, and no screenshots or raw source-system codes.
- The quality checks now cover data refresh risks, built-output base-path smoke tests, automated axe checks for key pages, and documented manual keyboard, forced-colours, mobile, zoom, and screen reader spot checks.
- The GitHub Pages deployment workflow now installs dependencies from `site/`, runs Astro checks, data contract tests, Playwright and axe smoke checks, performs a final build, uploads `site/dist`, and deploys through GitHub Pages actions. The workflow uses Node 24-compatible action majors, but GitHub Pages still has to be enabled with source `GitHub Actions` in the repository settings before deployment can succeed.
- Public documentation pages now explain the community status, first-release scope, source data, export date, daily refresh process, screenshot status, accessibility statement ownership, review cadence, and final-statement launch blockers.
- `CONTRIBUTING.md` now documents local checks, site/data conventions, screenshot rules, and accessibility statement guardrails for contributors.
- The first-release plan is ready for final owner review, manual accessibility checks, and launch approval.
- Launch approval is still blocked on owner-approved final accessibility statement details: compliance status, known non-compliances or confirmation there are none, any disproportionate burden or exemption decisions, feedback contact details, enforcement route, preparation date, review date, and test date.

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
| 2026-06-10 | 07 | Added Playwright and axe browser checks for the built home page, Canvas Controls catalogue, and a generated control detail page under `/accessibility/`; added data-contract assertions for known active recommendation values and parseable source dates; documented manual keyboard, filter, zoom/mobile, forced-colours, and NVDA spot checks in `README.md`; ignored Playwright report artifacts. Verified `.\\node_modules\\.bin\\vitest.cmd run`, `.\\node_modules\\.bin\\astro.cmd check`, `.\\node_modules\\.bin\\astro.cmd build`, `.\\node_modules\\.bin\\playwright.cmd test` with 6 browser tests passing, and `npx pnpm@11.5.2 run test:e2e`. `npx pnpm@11.5.2 add ...` installed the test dependencies but exited non-zero because pnpm still requires `@parcel/watcher` build-script approval in this workspace. |
| 2026-06-10 | 08 | Added `.github/workflows/deploy-pages.yml` for pushes to `main` and manual dispatch. The workflow uses Node 24 with pnpm, installs from `site/`, runs Astro checks, data contract tests, Playwright and axe smoke checks, performs a final build, uploads `site/dist`, and deploys with GitHub Pages actions. README now notes that the repository Pages source must be set to GitHub Actions. Verified `pnpm install --frozen-lockfile`, `pnpm --if-present run check`, `pnpm --if-present run test`, `pnpm --if-present run test:e2e`, `pnpm run build`, and Ruby YAML parsing. GitHub Pages repository settings cannot be verified locally. |
| 2026-06-10 | 08 follow-up | After the first GitHub Actions run failed in `actions/configure-pages` with `Get Pages site failed`, updated the workflow to Node 24-compatible action majors: `actions/setup-node@v6`, `actions/configure-pages@v6`, and `actions/upload-pages-artifact@v5`. README now calls out the one-time repository setting needed before the first deployment: `Settings` > `Pages` > `Build and deployment` > `Source`: `GitHub Actions`. Did not enable `configure-pages` automatic enablement because the action documents that it requires an admin-capable token other than `GITHUB_TOKEN`. |
| 2026-06-10 | 09 | Added `/about/`, `/data/`, and `/accessibility/`; linked them from the home page and footer; expanded README development, deployment, data refresh, route, and launch-readiness documentation; added `CONTRIBUTING.md`; and checked current GOV.UK accessibility statement guidance before drafting statement-readiness content. The accessibility page names the Defra Power Platform Service Team and Defra Accessibility Team as statement owners, documents the review cadence, and surfaces missing final statement facts as launch blockers instead of unverified claims. Verified `pnpm run check`, `pnpm run test`, `pnpm run test:e2e` with 10 browser/axe tests passing, and `npm run build`. |
