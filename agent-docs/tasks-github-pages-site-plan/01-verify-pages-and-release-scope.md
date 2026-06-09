# Task 01: Verify Pages And Release Scope

## Goal

Confirm the hosting, ownership, data publication, and first-release scope decisions before implementation starts.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- `README.md`

## Assumptions To Confirm

- The GitHub organisation is `xgov-low-code`.
- The repository name is `accessibility`.
- The expected public site URL is `https://xgov-low-code.github.io/accessibility/`.
- Astro should use `site: "https://xgov-low-code.github.io"` and `base: "/accessibility"`.
- The site is work in progress until further notice.
- The first public dataset is `data/canvas-controls/ppcoe_canvascontrols.json`.
- Inactive records are excluded from the public site.
- Data refreshes automatically each day from the Defra tenant.
- The Defra Power Platform Service Team and Defra Accessibility Team own the accessibility statement and review process.
- Screenshots are coming soon, but must not be rendered yet.

Ask the user if any of these cannot be verified from local context.

## Scope

- Document the verified public URL, Astro `site`, and Astro `base` values.
- Document first-release scope and explicit non-goals.
- Document data publication rules, including inactive-record exclusion.
- Document the daily data refresh cadence.
- Document accessibility statement ownership and review expectations.
- Document that screenshots are out of scope until static image assets and suitable alt text are available.

## Out Of Scope

- Scaffold the Astro app.
- Add tests.
- Add GitHub Actions.
- Edit source data.
- Render screenshots or screenshot placeholders.

## Acceptance Criteria

- The verified public URL, Astro `site`, and Astro `base` values are documented.
- First-release scope is clear enough for the foundation task to proceed.
- Data publication rules are documented.
- Screenshot handling is explicitly documented as out of scope.
- Any unresolved uncertainty is surfaced rather than silently guessed.

## Verification

- Re-read the changed documentation and check it does not conflict with the canonical plan.
- Run `git diff -- agent-docs README.md AGENTS.md` and confirm only intended documentation changed.
- If no documentation change was needed, report exactly what local source already contained the verified decisions.

## Handoff

Next task: `02-scaffold-astro-site-foundation.md`.
