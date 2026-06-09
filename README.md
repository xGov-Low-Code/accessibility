# xGov Low-Code Accessibility

Accessibility artefacts and guidance for the xGov Low-Code community.

This repository is currently planning a static GitHub Pages site for Power Apps Canvas Controls accessibility guidance. The site is work in progress until further notice.

The canonical implementation plan is [agent-docs/2026-06-09-github-pages-site-plan.md](agent-docs/2026-06-09-github-pages-site-plan.md).

## Planned site

The first release will be a static GitHub Pages site built from `site/` with Astro and TypeScript.

- Expected public URL: `https://xgov-low-code.github.io/accessibility/`
- Astro `site`: `https://xgov-low-code.github.io`
- Astro `base`: `/accessibility`
- Repository remote: `https://github.com/xGov-Low-Code/accessibility.git`

The first release is limited to the Power Apps Canvas Controls accessibility catalogue. It will show public guidance, assessment metadata, recommendation status, and active-record summary counts from the source dataset. It will not include screenshots, screenshot placeholders, additional datasets, GitHub Actions deployment, or official GOV.UK service branding in the foundation slice.

## Data

The first dataset is [data/canvas-controls/ppcoe_canvascontrols.json](data/canvas-controls/ppcoe_canvascontrols.json). It refreshes automatically each day from the Defra tenant.

First-release rules:

- inactive controls are ignored for the public site
- source data stays under root `data/<subject>/` directories
- guidance must be sanitised before rendering
- blank recommendations are treated as `Not assessed`
- Dataverse `screenshotUrl` values are not rendered
- screenshots are coming soon but are not rendered until static image assets and suitable alt text are available

## Ownership

The accessibility statement and review process are owned by the Defra Power Platform Service Team and Defra Accessibility Team.

The accessibility statement is reviewed before launch, after significant site changes, and at least every 12 months.

## Development

The site uses pnpm and lives under `site/`.

```powershell
cd site
pnpm install
pnpm run dev
```

Use these checks before publishing changes:

```powershell
cd site
pnpm run check
pnpm run build
pnpm run preview
```
