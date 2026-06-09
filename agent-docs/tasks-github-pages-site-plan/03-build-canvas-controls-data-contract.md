# Task 03: Build Canvas Controls Data Contract

## Goal

Add a typed data module for the Canvas Controls dataset, including validation, public-record filtering, recommendation metadata, slug generation, date formatting, and guidance sanitisation.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- `data/canvas-controls/ppcoe_canvascontrols.json`
- Existing `site/src/` files
- Existing tests and package scripts, if present

## Dependencies

- Task 02 should be complete, or an equivalent Astro site should already exist under `site/`.

## Scope

- Import `data/canvas-controls/ppcoe_canvascontrols.json` from the root `data/` directory.
- Add typed helpers under `site/src/data/` or the existing local convention.
- Validate:
  - top-level dataset shape
  - schema version
  - `exportedAtUtc`
  - `recordCount` equals the actual source record count
  - known recommendation values
  - date parsing for populated date fields
  - unique generated slugs
- Normalise blank recommendations to `Not assessed`.
- Exclude inactive records from public catalogue data.
- Preserve the source dataset for auditability.
- Add display metadata for:
  - `Can use`
  - `Can use with amendments`
  - `Can use on mobile only`
  - `Avoid using if possible`
  - `Do not use`
  - `Not assessed`
- Create stable slugs from control name, classic or modern type, and a short ID suffix.
- Generate summary counts needed by the catalogue.
- Format dates consistently.
- Sanitise guidance HTML at build time before rendering.
- Add focused data contract tests.

## Out Of Scope

- Building the full catalogue UI.
- Adding search and filters.
- Adding detail pages.
- Rendering screenshots or screenshot placeholders.
- Adding external UI packages.

## Implementation Notes

- Treat exported guidance HTML as unsafe for direct rendering, even though the content is team-authored.
- Strip wrapper `div` elements, inline `style` attributes, generated classes, and source-system IDs.
- Preserve safe semantic elements such as paragraphs, lists, strong emphasis, and links.
- Downshift headings so page heading order remains logical.
- If a small build-time sanitiser or parser dependency is needed, keep it non-UI, well maintained, and document why it was added.
- Unknown recommendation values should fail loudly unless the user agrees a fallback.
- Do not include inactive records in public counts, filters, catalogue data, or detail page data.

## Acceptance Criteria

- Source `recordCount` matches the actual source JSON record count by test or explicit assertion.
- Public data includes active records only.
- Blank recommendations become `Not assessed`.
- All current recommendation values have display metadata.
- Slugs are unique and stable for the current dataset.
- Null descriptions, guidance, assessment dates, and recommendations do not break data processing.
- Guidance sanitisation removes CKEditor wrappers, inline styles, generated classes, unsafe attributes, and broken heading order.
- At least one focused sanitisation test exists.

## Verification

- Run the data contract tests.
- Run the site typecheck or build command.
- Inspect generated public counts against the dataset with code, not manual model reasoning.
- Run `git diff -- site data` and confirm the source JSON was not edited.

## Handoff

Next task: `04-render-canvas-controls-catalogue.md`.
