# GitHub Pages Accessibility Site Plan

Date: 2026-06-09

## Summary

Build a static, repo-wide front-end for accessibility data and guidance in this repository and publish it with GitHub Pages. The first section will cover the Power Apps Canvas Apps controls accessibility data.

Recommended direction:

- Use Astro with TypeScript for a small, fast static site.
- Use GOV.UK Frontend as an accessibility and interaction baseline.
- Do not use official GOV.UK branding, crown assets, or service-style framing.
- Present the project as community-maintained guidance for the xGov Low-Code community.
- Deploy from the repository `main` branch.
- Build the site from root `site/`.
- Keep source datasets under root `data/<subject>/` directories.

The site should feel public-sector, plain, trustworthy, and accessible, while making it clear that it is not an official GOV.UK service.

## Context

Current first dataset:

- `data/canvas-controls/ppcoe_canvascontrols.json`
- 61 records
- Approximately 32 KB
- Export metadata includes schema version, source, table, export timestamp, and record count

Important record fields:

- `id`
- `name`
- `description`
- `status`
- `recommendation`
- `recommendationCode`
- `isInPreview`
- `isClassic`
- `isAccessible`
- `createdOn`
- `modifiedOn`

Current recommendation values:

- `Can use`
- `Can use with amendments`
- `Avoid using if possible`
- `Do not use`
- Blank / not yet assessed

## Product Goal

For the first section, help Power Apps makers quickly understand which Canvas Apps controls are accessible enough to use, which need caution, and which should be avoided.

Primary user needs:

- Search for a control by name.
- Filter by recommendation.
- Filter by classic or modern control type.
- Filter by preview status.
- Distinguish "accessible" from "recommended", since those can differ.
- Read concise guidance for each control.
- Understand how current the data is.
- Link to a specific control or filtered view when discussing guidance with others.

## Design Position

### GOV.UK Design System

Use the GOV.UK Design System as a foundation for:

- Typography scale
- Layout spacing
- Accessible form controls
- Tables
- Tags
- Summary cards or lists
- Focus states
- Error and empty states
- Content style

Do not use:

- The GOV.UK crown logo
- The standard GOV.UK header that implies an official service
- The standard GOV.UK footer if it implies ownership by GOV.UK or Crown copyright
- "Start now" service patterns unless the site becomes part of an official service journey

Rationale:

The repository belongs to a UK government context, and the subject is accessibility, so GOV.UK patterns are a good fit. However, this is a community effort rather than an official government service. The visual language should borrow the clarity and accessibility of GOV.UK without suggesting the site is part of GOV.UK.

### Branding

Use a custom community header:

- Site name: `xGov Low-Code Accessibility`
- First section name: `Power Apps Canvas Controls Accessibility`
- Supporting text: `Community-maintained guidance for the xGov Low-Code community`
- Visible status text: `Not an official GOV.UK service`

Suggested visual approach:

- GOV.UK-like content width and rhythm
- White background
- Strong black text
- High-contrast status colours
- Minimal decoration
- No marketing hero section
- No Microsoft Fluent-heavy styling as the primary UI language

## Recommended Tech Stack

### Core

- Astro
- TypeScript
- GOV.UK Frontend
- Static JSON import from `data/canvas-controls/ppcoe_canvascontrols.json`
- Source data remains outside the site project in root `data/<subject>/` directories.

### Styling

- GOV.UK Frontend Sass or compiled CSS
- Small local stylesheet for community branding, data cards, and status presentation

### Client-Side Behaviour

Use limited client-side JavaScript for:

- Search
- Filter controls
- Sort controls
- Result count updates
- Persisting query parameters in the URL

Keep pages useful when JavaScript fails where practical:

- Render the full list server-side at build time.
- Client-side filtering progressively enhances the page.

### Deployment

Use GitHub Actions to build and deploy to GitHub Pages.

Suggested flow:

- On push to `main`, install dependencies.
- Run lint, typecheck, and build.
- Upload Astro `dist` as a Pages artifact.
- Deploy using GitHub Pages.

## Proposed Site Structure

```text
/
  Repo-wide landing page
  Link to available accessibility guidance sections

/canvas-controls/
  Summary of the Canvas Controls dataset
  Search and filters
  Controls list

/canvas-controls/controls/
  Full Canvas Controls index

/canvas-controls/controls/[slug]/
  Detail page for one control

/about/
  About the site, source data, update cadence, and community status

/accessibility/
  Accessibility statement for this static site

/data/
  Link to available source datasets and explain fields
```

For a first release, `/canvas-controls/` can contain the full catalogue and `/canvas-controls/controls/[slug]/` can be deferred if needed. The site should still be structured so detail pages can be added without reworking the design.

## Key Interface Elements

### Dataset Summary

Show:

- Total controls
- Last exported date
- Number marked `Can use`
- Number marked `Can use with amendments`
- Number marked `Avoid using if possible`
- Number marked `Do not use`
- Number not yet assessed

### Filters

Use accessible form controls:

- Text input: search by name and description
- Checkboxes: recommendation values
- Radios or checkboxes: classic / modern
- Checkbox: preview controls
- Checkbox: show not yet assessed

Avoid custom comboboxes unless there is a clear need.

### Results

Use a list or table depending on viewport:

- Desktop: table is acceptable if it remains readable and keyboard-friendly.
- Mobile: stacked result cards or a table with careful responsive handling.

Each result should show:

- Control name
- Recommendation
- Accessible: yes / no
- Classic or modern
- Preview status
- Short description if available
- Last modified date

### Detail View

Each control detail should show:

- Name
- Recommendation
- Accessibility status
- Classic / modern
- Preview status
- Description
- Dates
- Raw data fields for transparency, if useful

Do not rely on screenshots until image hosting is resolved. Existing `screenshotUrl` values appear to be Dataverse-relative paths and may not work on GitHub Pages.

## Data Handling

Add a typed data module that:

- Imports the JSON from `data/canvas-controls/ppcoe_canvascontrols.json`
- Validates or normalises nullable fields
- Creates stable slugs from control names and IDs
- Groups recommendations into display metadata
- Formats dates consistently

Suggested status order:

1. `Can use`
2. `Can use with amendments`
3. `Avoid using if possible`
4. `Do not use`
5. `Not assessed`

Recommended colour treatment:

- `Can use`: green tag
- `Can use with amendments`: blue or turquoise tag
- `Avoid using if possible`: yellow or amber tag with black text
- `Do not use`: red tag
- `Not assessed`: grey tag

Do not use colour alone. Every status must include text.

## Accessibility Requirements

The site should aim for WCAG 2.2 AA.

Minimum checks:

- Keyboard navigation works through all controls and result links.
- Focus indicators are visible.
- Form controls have labels.
- Filter state changes are announced or visible through result counts.
- Status tags do not rely on colour alone.
- Tables have headers and captions where used.
- Heading order is logical.
- Page title changes per route.
- Search and filters work at 200% zoom and on narrow screens.
- No inaccessible custom select, combobox, tab, or disclosure behaviour.
- Respect reduced motion if motion is added.

Suggested automated checks:

- `npm run build`
- TypeScript check
- Playwright smoke test
- Axe accessibility checks with `@axe-core/playwright`

Suggested manual checks:

- Keyboard-only pass
- Windows high contrast / forced colours pass
- Screen reader spot check with NVDA, if available
- Mobile viewport check

## Repository Layout

Confirmed structure:

```text
agent-docs/
  2026-06-09-github-pages-site-plan.md
data/
  canvas-controls/
    ppcoe_canvascontrols.json
site/
  src/
    components/
    data/
    layouts/
    pages/
    styles/
  public/
  astro.config.mjs
  package.json
  tsconfig.json
```

The Astro app will live in root `site/` because GitHub Pages provides one project site for this repository. Subject-specific source data will live under root `data/<subject>/` directories.

## GitHub Pages Plan

Preferred deployment:

- Use GitHub Actions rather than committing generated files.
- Configure Pages source as GitHub Actions.
- Deploy from pushes to `main`.
- Build from `site`.
- Deploy `site/dist`.
- Serve the project site at `https://xgov-low-code.github.io/accessibility/`.
- Serve the Canvas Controls section at `https://xgov-low-code.github.io/accessibility/canvas-controls/`.

Actions workflow outline:

```yaml
name: Deploy accessibility site

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: site/package-lock.json
      - run: npm ci
        working-directory: site
      - run: npm run build
        working-directory: site
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Implementation Phases

### Phase 1: Foundation

- Scaffold Astro site.
- Add TypeScript configuration.
- Add GOV.UK Frontend dependency.
- Add base layout.
- Add community header and footer.
- Configure base path for GitHub Pages project hosting.
- Add build and preview scripts.

Acceptance criteria:

- Site builds locally.
- Home page renders on desktop and mobile.
- Header clearly says the site is community-maintained and not official GOV.UK.

### Phase 2: Data Integration

- Import JSON data.
- Add typed data helpers.
- Normalise blank recommendations to `Not assessed`.
- Generate summary counts.
- Render a complete controls list.
- Format dates.

Acceptance criteria:

- Record count matches source JSON.
- Summary counts match source JSON.
- Null descriptions and recommendations do not break rendering.

### Phase 3: Search and Filters

- Add search input.
- Add recommendation filters.
- Add classic / modern filter.
- Add preview filter.
- Add accessible / not accessible filter.
- Update result count dynamically.
- Store state in query parameters.

Acceptance criteria:

- Filters can be operated by keyboard.
- Filtered URLs can be shared.
- Empty results have useful text and a reset action.

### Phase 4: Detail Pages

- Add stable slugs.
- Generate `/canvas-controls/controls/[slug]/` pages.
- Link each listing row/card to detail page.
- Add previous / next or back link.

Acceptance criteria:

- Each record has a unique page.
- Duplicate names are handled by including part of the ID in the slug.
- Detail pages render complete data without exposing confusing raw codes by default.

### Phase 5: Accessibility and Quality

- Add linting and formatting.
- Add build check in CI.
- Add basic Playwright smoke tests.
- Add axe checks for key pages.
- Add manual accessibility checklist to docs.

Acceptance criteria:

- Build passes in CI.
- Automated accessibility checks pass for key pages.
- Manual keyboard check has been completed.

### Phase 6: Documentation and Launch

- Update README with local development instructions.
- Add GitHub Pages deployment instructions.
- Add data update process.
- Add contribution notes.
- Add an accessibility statement page.

Acceptance criteria:

- New contributors can run the site locally from README instructions.
- Deployment path is documented.
- Site explains data source and update date.

## Risks and Mitigations

### GOV.UK Branding Confusion

Risk:

Users may think the site is an official GOV.UK service.

Mitigation:

- Use GOV.UK Frontend selectively.
- Avoid crown logo and official service header.
- Add visible community status text.
- Add an About page explaining ownership.

### Screenshot URLs May Not Work

Risk:

Current screenshot URLs are relative Dataverse download paths and are unlikely to resolve from GitHub Pages.

Mitigation:

- Do not render screenshots in the first release.
- Add a placeholder only if useful.
- Revisit if screenshots are exported as static assets.

### Recommendation Versus Accessibility Status

Risk:

Some records are marked accessible but have cautious recommendations, or vice versa. Users may misunderstand the distinction.

Mitigation:

- Display both fields clearly.
- Add explanatory text near filters.
- Use "Recommendation" as the primary decision aid.

### Blank Recommendations

Risk:

Blank recommendation fields could be mistaken for safe controls.

Mitigation:

- Treat blank values as `Not assessed`.
- Include a filter for not assessed controls.
- Style them neutrally.

### Static Hosting Base Path

Risk:

GitHub Pages project sites are usually served from `/<repository-name>/`, which can break asset paths.

Mitigation:

- Configure Astro `base` correctly.
- Prefer relative links where suitable.
- Test built output locally before deployment.

## Open Decisions

- Confirm whether detail pages are needed for first release.
- Confirm who owns the accessibility statement and review process.
- Confirm data refresh cadence.

## First Build Recommendation

Build the first release with:

- Astro site under root `site/`
- Repo-wide landing page
- Canvas Controls catalogue page at `/canvas-controls/`
- Dataset summary
- Search and filters
- GOV.UK-informed styling with custom community header
- GitHub Actions deployment
- README updates

Then add detail pages and richer documentation once the basic catalogue is live.
