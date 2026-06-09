# Task 02: Scaffold Astro Site Foundation

## Goal

Create the initial static Astro site under `site/` with TypeScript, GOV.UK Frontend, shared layout components, base styling, and local development commands.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- `agent-docs/tasks-github-pages-site-plan/01-verify-pages-and-release-scope.md`
- Existing `site/` files, if the directory already exists
- Current Astro documentation before using integrations, content collections, actions, sessions, or deployment config

## Dependencies

- Task 01 should be complete, or the user should explicitly confirm the hosting and scope decisions.

## Scope

- Scaffold an Astro app in root `site/`.
- Use TypeScript.
- Add `govuk-frontend` as the only external UI or design package.
- Configure Astro for GitHub Pages project hosting with:
  - `site: "https://xgov-low-code.github.io"`
  - `base: "/accessibility"`
- Add build and preview scripts.
- Add the minimum shared structure needed for later tasks:
  - `src/layouts/BaseLayout.astro`
  - `src/components/SkipLink.astro`
  - `src/components/CommunityHeader.astro`
  - `src/components/SiteFooter.astro`
  - `src/components/RecommendationTag.astro`
  - `src/components/ControlTypeTag.astro`
  - `src/components/EmptyState.astro`
  - `src/styles/`
  - `src/pages/index.astro`
- Add a plain repo-wide home page that links to the future Canvas Controls section.
- Add minimal local development instructions to `README.md` or `site/README.md`, matching the repository's existing documentation style.

## Out Of Scope

- Importing or rendering the Canvas Controls dataset.
- Search, filters, or detail pages.
- GitHub Actions deployment.
- Full accessibility statement content.
- Screenshots or screenshot placeholders.
- Extra UI libraries.

## Implementation Notes

- Do not use the GOV.UK crown, official GOV.UK header, or service framing.
- The header must clearly present:
  - `xGov Low-Code Accessibility`
  - `Community-maintained guidance for the xGov Low-Code community`
  - `Not an official GOV.UK service`
  - `Work in progress`
- Prefer GOV.UK Frontend classes for typography, spacing, focus states, forms, and tags.
- Keep local CSS small and specific to community branding and site layout.
- Avoid decorative landing-page treatment. The first screen should be plain, useful, and public-sector appropriate.

## Acceptance Criteria

- `site/` contains a working Astro TypeScript app.
- The site builds locally.
- The home page renders with the custom community header and footer.
- The header does not imply the site is an official GOV.UK service.
- Local development commands are documented.
- No source datasets were moved into `site/`.

## Verification

- Run the package install command required by the scaffold.
- Run `npm run build` from `site/`.
- Run any generated typecheck command if present.
- Preview locally if practical and inspect desktop and narrow viewport layout.
- Run `git diff -- site README.md` and confirm only intended scaffold and documentation files changed.

## Handoff

Next task: `03-build-canvas-controls-data-contract.md`.
