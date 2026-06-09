# Task 06: Add Control Detail Pages

## Goal

Add stable detail pages for individual Canvas Controls at `/canvas-controls/controls/[slug]/` and link to them from the catalogue.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- Existing Canvas Controls data helpers
- Existing catalogue components
- Existing routing and base path helpers, if any

## Dependencies

- Task 03 should be complete for unique stable slugs.
- Task 04 should be complete for catalogue links.

## Scope

- Generate `/canvas-controls/controls/[slug]/` pages for active public records.
- Link each catalogue row or card to the corresponding detail page.
- Add or complete reusable detail components where repeated:
  - `ControlMetadataList`
  - `GuidanceBlock`
  - `BackLink`
  - `AssessmentDate`
- Show:
  - control name
  - recommendation
  - accessibility status
  - classic or modern status
  - preview status
  - description
  - sanitised guidance, if available
  - accessibility team assessment date
  - platform team assessment date
  - last modified date
- Add fallback text for missing guidance and missing assessment dates.
- Keep raw source-system codes hidden by default unless there is a clear transparency need.

## Out Of Scope

- Search and filter implementation, unless needed only to preserve existing catalogue links.
- Rendering screenshots or screenshot placeholders.
- Publishing inactive records.
- Adding a second full controls index route.

## Implementation Notes

- Duplicate names must be handled by including classic or modern type and a short ID suffix in the slug.
- Use the existing sanitised guidance output. Do not inject raw guidance HTML.
- Ensure page titles are unique and include the control name.
- The back link should return to the catalogue route, not browser history.
- Links should be base-path aware for GitHub Pages.

## Acceptance Criteria

- Each active public record has one unique detail page.
- Inactive records do not generate public detail pages.
- Catalogue items link to their detail pages.
- Detail pages render complete data without exposing confusing raw codes by default.
- Records without guidance or assessment dates display clear fallback text.
- Guidance is sanitised and preserves logical heading order.

## Verification

- Run data contract tests, including slug uniqueness.
- Run `npm run build` from `site/`.
- Inspect a sample detail page with guidance.
- Inspect a sample detail page without guidance or assessment dates, if present.
- Verify generated URLs include the GitHub Pages base path correctly in built output.

## Handoff

Next task: `07-add-quality-and-accessibility-checks.md`.
