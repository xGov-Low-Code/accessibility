# Task 09: Complete Documentation And Launch Readiness

## Goal

Finish public and contributor documentation needed for the first release, including the About page, data page, accessibility statement, deployment notes, contribution notes, and launch-readiness checks.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue beyond the first-release plan.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- Existing `README.md`
- Existing site pages under `site/src/pages/`
- Existing quality checklist from Task 07
- Current public sector accessibility statement guidance before drafting or finalising statement content

## Dependencies

- Task 02 should be complete for site pages and layout.
- Task 04 should be complete so public pages can describe the dataset accurately.
- Task 07 should be complete for quality and accessibility evidence.
- Task 08 is recommended for deployment documentation.

## Scope

- Update README with:
  - local development instructions
  - build and preview commands
  - test commands
  - deployment path
  - source data location
  - daily data refresh process
- Add or complete `/about/`.
- Add or complete `/data/`.
- Add or complete `/accessibility/`.
- Add contribution notes appropriate to the current repository.
- Document the data update process:
  - exported JSON updates automatically each day from the Defra tenant
  - data contract tests validate refreshed data
  - generated summary counts are reviewed through build output
  - site publishes through GitHub Pages deployment
- Document screenshot status:
  - coming soon
  - out of scope until static assets and suitable alt text exist
  - no screenshot placeholders
- Prepare launch-readiness notes for unresolved risks or manual checks.

## Out Of Scope

- Launching with placeholder accessibility statement content.
- Inventing contact details, enforcement details, compliance status, or review dates that cannot be verified.
- Rendering screenshots.
- Adding new product features.

## Implementation Notes

- The accessibility statement is owned by the Defra Power Platform Service Team and Defra Accessibility Team.
- Review should happen before launch, after significant site changes, and at least every 12 months.
- The statement should follow current public sector accessibility statement requirements.
- It should include, once verified:
  - compliance status against WCAG 2.2 AA
  - known non-compliances with WCAG references
  - disproportionate burden or exempt content claims, if any
  - feedback contact details
  - enforcement route
  - preparation date
  - review date
- If any required statement details are unknown, stop and ask rather than filling placeholders.

## Acceptance Criteria

- New contributors can run the site locally from README instructions.
- Deployment path is documented.
- The site explains data source, export date, and daily refresh cadence.
- The site explains community status and that it is not an official GOV.UK service.
- Accessibility statement ownership and review cadence are clear.
- The accessibility statement does not contain unverified placeholder claims.
- Known launch blockers or unresolved checks are surfaced explicitly.

## Verification

- Run documentation links through the built site if practical.
- Run `npm run build` from `site/`.
- Run configured tests.
- Review all public pages for accidental official GOV.UK framing.
- Review all public pages for screenshot placeholders.
- Run `git diff -- README.md site agent-docs` and confirm documentation changes match this task.

## Handoff

After this task, the first-release plan should be ready for final review, manual accessibility checks, and launch approval.
