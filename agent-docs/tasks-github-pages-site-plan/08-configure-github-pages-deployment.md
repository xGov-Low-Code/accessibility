# Task 08: Configure GitHub Pages Deployment

## Goal

Add the GitHub Actions workflow that builds the Astro site from `site/` and deploys `site/dist` to GitHub Pages.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- Existing `.github/workflows/` files, if any
- `site/package.json`
- Current GitHub Pages and Actions documentation if action versions or Pages setup need verification

## Dependencies

- Task 02 should be complete for the Astro scaffold.
- Task 07 is recommended so CI can run the quality checks.
- Task 01 should confirm the Pages URL and base path.

## Scope

- Add a GitHub Actions workflow for GitHub Pages deployment.
- Trigger on pushes to `main` and `workflow_dispatch`.
- Use Pages permissions:
  - `contents: read`
  - `pages: write`
  - `id-token: write`
- Install dependencies in `site/`.
- Run check, test, and build commands where present.
- Upload `site/dist` as the Pages artifact.
- Deploy through the official Pages deployment action.
- Use a Node version compatible with the site dependencies and documented by the project.

## Out Of Scope

- Changing repository Pages settings through the GitHub UI.
- Committing generated `dist` output.
- Adding deployment targets beyond GitHub Pages.
- Changing data refresh automation.

## Implementation Notes

- Prefer GitHub Actions deployment rather than committing generated files.
- Keep the workflow close to the outline in the canonical plan unless current action versions require small updates.
- If action versions differ from the plan, document why.
- The build must run from `site/`.
- The artifact path must be `site/dist`.

## Acceptance Criteria

- A workflow exists for building and deploying the site to GitHub Pages.
- The workflow runs checks before build where scripts are available.
- The workflow deploys `site/dist`.
- The workflow does not commit generated files.
- Documentation mentions that repository Pages source must be configured for GitHub Actions.

## Verification

- Run local equivalents of the workflow commands from `site/`.
- Validate the workflow YAML syntax if a local tool is available.
- Run `git diff -- .github site README.md agent-docs` and confirm only intended deployment-related files changed.
- Surface any GitHub settings that cannot be verified locally.

## Handoff

Next task: `09-complete-documentation-and-launch-readiness.md`.
