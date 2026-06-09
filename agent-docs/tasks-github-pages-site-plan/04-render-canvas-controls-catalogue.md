# Task 04: Render Canvas Controls Catalogue

## Goal

Build the first useful Canvas Controls page at `/canvas-controls/`, rendered from the real JSON dataset and useful without client-side JavaScript.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- Existing `site/src/data/` helpers
- Existing `site/src/components/`
- `data/canvas-controls/ppcoe_canvascontrols.json` only as needed to understand fields

## Dependencies

- Task 03 should be complete, or equivalent typed Canvas Controls data helpers should already exist.

## Scope

- Add `/canvas-controls/` as the canonical controls catalogue route.
- Render the page from the active public records returned by the data module.
- Add or complete these components where they are repeated UI patterns:
  - `DatasetSummary`
  - `AssessmentDate`
  - `ResultsCount`
  - `ControlResultsTable`
  - `ControlResultCard`
  - `GuidanceBlock`
- Show dataset summary counts:
  - total controls
  - active controls
  - last exported date
  - count for each recommendation value
  - controls with guidance
  - controls with accessibility team assessment dates
  - controls with platform team assessment dates
- Render a simple complete active-controls list or table.
- For each result, show:
  - control name
  - recommendation
  - accessible: yes or no
  - classic or modern
  - preview status
  - short description if available
  - accessibility team assessment date if available
  - guidance availability
- Render sanitised guidance only if the page design includes guidance previews.
- Add clear fallback text for missing optional fields.

## Out Of Scope

- Client-side search and filters.
- Detail pages.
- GitHub Actions deployment.
- Screenshots or screenshot placeholders.
- Raw source-system codes in the main user-facing UI.

## Implementation Notes

- The page must be useful without JavaScript.
- The canonical catalogue route is `/canvas-controls/`. Do not add a second full controls index route.
- Prefer table presentation on desktop only if it remains readable and keyboard-friendly.
- Provide a stacked card view or responsive handling for narrow screens.
- Do not rely on colour alone for recommendation or accessibility status.
- Keep one-off page content inside the page rather than creating generic abstractions.

## Acceptance Criteria

- `/canvas-controls/` builds and renders from the real JSON dataset.
- Summary counts are generated from active public records only.
- Inactive records are not present in the rendered catalogue.
- The page works without client-side filtering JavaScript.
- Guidance, if rendered, is sanitised.
- Screenshots are not rendered.
- Missing optional fields have clear fallback text.

## Verification

- Run data contract tests.
- Run `npm run build` from `site/`.
- Preview the page locally if practical.
- Inspect desktop and narrow viewport output.
- Verify inactive records are excluded by test, page output assertion, or explicit data helper assertion.

## Handoff

Next task: `05-add-progressive-search-and-filters.md`.
