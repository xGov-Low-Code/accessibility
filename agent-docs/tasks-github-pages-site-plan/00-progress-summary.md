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
| [03: Build Canvas Controls Data Contract](03-build-canvas-controls-data-contract.md) | Ready | 02 | Add typed data helpers, validation, active-record filtering, slugs, summary counts, and guidance sanitisation. |
| [04: Render Canvas Controls Catalogue](04-render-canvas-controls-catalogue.md) | Ready | 03 | Build `/canvas-controls/` from the real dataset with summary counts and a server-rendered active-controls list. |
| [05: Add Progressive Search And Filters](05-add-progressive-search-and-filters.md) | Ready | 04 | Add accessible client-side search, filters, query parameters, result counts, and empty state. |
| [06: Add Control Detail Pages](06-add-control-detail-pages.md) | Ready | 03, 04 | Generate stable detail pages and link to them from the catalogue. |
| [07: Add Quality And Accessibility Checks](07-add-quality-and-accessibility-checks.md) | Ready | 03, 04, 06 recommended | Add data contract tests, Playwright smoke tests, axe checks, and manual accessibility checklist. |
| [08: Configure GitHub Pages Deployment](08-configure-github-pages-deployment.md) | Ready | 01, 02, 07 recommended | Add the GitHub Actions workflow to build `site/` and deploy `site/dist`. |
| [09: Complete Documentation And Launch Readiness](09-complete-documentation-and-launch-readiness.md) | Ready | 02, 04, 07, 08 recommended | Complete README, public site docs, accessibility statement, contribution notes, and launch-readiness notes. |

## Current Checkpoint

- Task 01 is complete.
- Task 02 is complete.
- Hosting, ownership, data publication rules, first-release scope, and screenshot handling are documented in `README.md`.
- The Astro foundation site builds locally, serves under `/accessibility/`, and keeps source datasets outside `site/`.
- The next task to pick up is `03-build-canvas-controls-data-contract.md`.

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
