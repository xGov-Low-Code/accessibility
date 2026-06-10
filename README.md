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

The first release is limited to the Power Apps Canvas Controls accessibility catalogue. It will show public guidance, assessment metadata, recommendation status, and active-record summary counts from the source dataset. It will not include screenshots, screenshot placeholders, additional datasets, or official GOV.UK service branding in the foundation slice.

Deployment uses GitHub Actions to build `site/` and publish `site/dist` to GitHub Pages. The repository Pages source must be configured to use GitHub Actions in the GitHub Pages settings.

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
pnpm run test
pnpm run test:e2e
pnpm run build
pnpm run preview
```

The end-to-end checks build the static site, serve the built output under `/accessibility/`, run
Playwright smoke tests for the home page, Canvas Controls catalogue and a generated detail page, and
run axe checks on those key pages.

## Manual accessibility checklist

Use this checklist before launch and after significant changes to the public pages:

- Keyboard: tab from the browser address bar through the skip link, header, catalogue filters, reset
  button, result links, detail-page back link and footer links. Check focus is visible and order is
  logical.
- Filters: use only the keyboard to search, select and clear filters. Confirm the result count changes
  visibly and the empty state can be reset.
- Zoom and mobile: check the home page, catalogue and one detail page at 200% zoom and around 390px
  viewport width. Confirm text, filters, cards and guidance do not overlap or require two-dimensional
  scrolling except for the desktop table fallback.
- Forced colours: check the same pages in Windows high contrast / forced-colours mode. Confirm links,
  tags, focus indicators, form controls and selected checkboxes remain distinguishable without relying
  on colour alone.
- Screen reader spot check, if NVDA is available: confirm page titles, headings, landmarks, form labels,
  table caption and result-count updates are announced clearly.
