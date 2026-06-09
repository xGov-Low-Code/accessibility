# Task 07: Add Quality And Accessibility Checks

## Goal

Add the automated checks needed to keep the static site and daily refreshed dataset from publishing broken or inaccessible output.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- Existing `site/package.json`
- Existing test setup
- Existing data helpers and pages

## Dependencies

- Task 03 should be complete for data contract tests.
- Task 04 should be complete for page-level smoke checks.
- Task 06 is recommended if detail pages are part of the first release.

## Scope

- Add or complete linting and formatting scripts where appropriate for the existing scaffold.
- Add build and typecheck scripts if missing.
- Add data contract tests for:
  - source record count
  - recommendation values
  - inactive-record exclusion
  - date parsing
  - unique slugs
  - guidance sanitisation
- Add basic Playwright smoke tests for key pages.
- Add axe accessibility checks with `@axe-core/playwright` for key pages.
- Test built output under the GitHub Pages base path.
- Add a manual accessibility checklist document or README section.

## Out Of Scope

- GitHub Actions deployment wiring.
- Full manual screen reader audit.
- Fixing unrelated design or content issues outside the pages under test.
- Screenshots or screenshot placeholders.

## Implementation Notes

- Tests should encode why behaviour matters, not just assert implementation details.
- Keep the test surface focused on risks in the plan:
  - daily data refresh changes
  - unknown recommendation values
  - inactive records leaking into public output
  - unsafe or layout-breaking guidance HTML
  - broken GitHub Pages base path
  - inaccessible form and result interactions
- If a test dependency is added, keep it specific to testing or data quality, not UI.

## Acceptance Criteria

- Build passes locally.
- Typecheck passes locally, if configured.
- Data contract tests pass locally.
- Playwright smoke tests cover key pages.
- Axe checks pass for key pages.
- Manual keyboard check steps are documented.
- Manual forced-colours and mobile viewport checks are documented.

## Verification

- Run all relevant local checks from `site/`.
- Run the built-output preview or equivalent base-path test.
- Confirm no test was skipped silently.
- Run `git diff -- site agent-docs README.md` and confirm changes are limited to quality checks and related docs.

## Handoff

Next task: `08-configure-github-pages-deployment.md`.
