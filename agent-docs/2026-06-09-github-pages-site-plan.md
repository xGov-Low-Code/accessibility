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
- 63 records
- Export metadata includes schema version, source, table, export timestamp, and record count
- Current export timestamp: `2026-06-09T20:26:49.5290998Z`
- 60 active records and 3 inactive records
- Inactive records should be ignored for the public site because they are not needed by the target audience
- 32 records include descriptions
- 28 records include guidance
- 58 records include an accessibility team assessment date
- 36 records include a platform team assessment date
- 41 records include Dataverse-relative screenshot URLs, but image export is not yet confirmed

Important record fields:

- `id`
- `name`
- `assessedByAccessibilityTeamOn`
- `assessedByPlatformTeamOn`
- `description`
- `guidance`
- `screenshotUrl`
- `status`
- `statusCode`
- `recommendation`
- `recommendationCode`
- `isInPreview`
- `isClassic`
- `isAccessible`
- `createdOn`
- `modifiedOn`

Current recommendation values:

- `Can use` - 21 records
- `Can use with amendments` - 17 records
- `Avoid using if possible` - 9 records
- `Do not use` - 13 records
- `Can use on mobile only` - 1 record
- Blank / not yet assessed - 2 records

## Product Goal

For the first section, help Power Apps makers quickly understand which Canvas Apps controls are accessible enough to use, which need caution, and which should be avoided.

Primary user needs:

- Search for a control by name.
- Filter by recommendation.
- Filter by classic or modern control type.
- Filter by preview status.
- Distinguish "accessible" from "recommended", since those can differ.
- Read guidance where it is available.
- Understand when data was exported and when individual controls were assessed.
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
- `govuk-frontend` as the only external UI / design package for the first release
- Static JSON import from `data/canvas-controls/ppcoe_canvascontrols.json`
- Source data remains outside the site project in root `data/<subject>/` directories.

### Styling

- GOV.UK Frontend Sass or compiled CSS
- Small local stylesheet for community branding, data cards, and status presentation
- No additional external component library for the first release.
- Do not add Microsoft Fluent, Material UI, Bootstrap, or similar UI kits unless a later requirement clearly justifies it.

### Reusable Components

Use small local Astro components to wrap repeated page and data patterns. These components should use semantic HTML first, then GOV.UK Frontend classes where they fit.

Initial shared components:

- `BaseLayout`: document shell, page title, meta tags, skip link, header, footer, and main landmark.
- `CommunityHeader`: custom non-GOV.UK-branded header with site name and community status.
- `SiteFooter`: custom footer with project links and ownership/status text.
- `SkipLink`: keyboard skip link using GOV.UK Frontend styling.
- `DatasetSummary`: summary counts and export date for the current dataset.
- `RecommendationTag`: display metadata for recommendation values.
- `ControlTypeTag`: classic / modern display label.
- `AssessmentDate`: optional assessment date display with fallback text.
- `FilterPanel`: accessible filter controls.
- `ResultsCount`: visible result count for filter/search updates.
- `ControlResultsTable`: desktop-friendly controls listing.
- `ControlResultCard`: narrow-viewport controls listing.
- `ControlMetadataList`: key-value facts for detail pages.
- `GuidanceBlock`: sanitised guidance rendering with safe fallback.
- `EmptyState`: empty search/filter result state with reset action.
- `BackLink`: navigation back to the catalogue.

Component rules:

- Keep components thin and specific to repeated UI patterns.
- Do not create abstractions for one-off content blocks.
- Prefer GOV.UK Frontend classes for forms, tables, tags, skip links, spacing, and focus states.
- Use local CSS only for community branding, catalogue-specific layout, and recommendation/status presentation.
- Keep filtering behaviour as small TypeScript progressive enhancement. Add Svelte islands only if filter interactions become too complex for simple DOM enhancement.

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

For a first release, include detail pages if feasible because the dataset now contains guidance and assessment dates. If detail pages are deferred, each result on `/canvas-controls/` must still have a stable fragment link so individual controls can be shared.

## Key Interface Elements

### Dataset Summary

Show:

- Total controls
- Active controls
- Last exported date
- Number marked `Can use`
- Number marked `Can use with amendments`
- Number marked `Avoid using if possible`
- Number marked `Do not use`
- Number marked `Can use on mobile only`
- Number not yet assessed
- Number with guidance
- Number with accessibility team assessment dates
- Number with platform team assessment dates

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
- Accessibility team assessment date if available
- Guidance availability

### Detail View

Each control detail should show:

- Name
- Recommendation
- Accessibility status
- Classic / modern
- Preview status
- Description
- Guidance, if available
- Accessibility team assessment date
- Platform team assessment date
- Last modified date
- Raw data fields for transparency, if useful, but do not show source-system codes by default

Do not rely on screenshots until image hosting is resolved. Existing `screenshotUrl` values appear to be Dataverse-relative paths and may not work on GitHub Pages.

## Data Handling

Add a typed data module that:

- Imports the JSON from `data/canvas-controls/ppcoe_canvascontrols.json`
- Validates the top-level shape, schema version, and that `recordCount` matches the actual record count
- Validates or normalises nullable fields
- Treats blank recommendations as `Not assessed`
- Excludes inactive records from public catalogue pages, detail pages, filters, and summary counts
- Creates stable slugs from control names and IDs
- Groups recommendations into display metadata
- Formats dates consistently
- Sanitises guidance HTML before rendering

Guidance handling:

- Source guidance is rich HTML from Dataverse / CKEditor.
- Do not inject guidance HTML directly into pages.
- Strip wrapper `div` elements, inline `style` attributes, generated classes, and source-system IDs.
- Preserve safe semantic elements such as paragraphs, lists, strong emphasis, and links.
- Downshift any heading inside guidance so page heading order remains logical.
- For links that open in a new tab, add clear link text and `rel="noopener noreferrer"`, or avoid forcing a new tab.

Suggested recommendation order:

1. `Can use`
2. `Can use with amendments`
3. `Can use on mobile only`
4. `Avoid using if possible`
5. `Do not use`
6. `Not assessed`

Recommended colour treatment:

- `Can use`: green tag
- `Can use with amendments`: blue or turquoise tag
- `Can use on mobile only`: purple or blue tag with explicit text
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
- Guidance HTML is sanitised and cannot introduce broken heading order, inline colour-only meaning, scripts, or layout-breaking styles.
- External links in guidance have accessible link text.
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

Current structure:

```text
agent-docs/
  2026-06-09-github-pages-site-plan.md
data/
  canvas-controls/
    ppcoe_canvascontrols.json
AGENTS.md
README.md
```

Target structure:

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
- Expected project site URL: `https://xgov-low-code.github.io/accessibility/`.
- Expected Canvas Controls URL: `https://xgov-low-code.github.io/accessibility/canvas-controls/`.
- Confirm the GitHub organisation, repository name, Pages settings, and final URL before implementation.
- Configure Astro `site` and `base` for the project site path.

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

### Phase 0: Confirmation

- Confirm GitHub organisation, repository name, and Pages URL.
- Document that inactive records are excluded from the public site.
- Confirm that `guidance` may be published publicly.
- Confirm who owns the accessibility statement and review process.
- Confirm data refresh cadence.
- Confirm whether screenshots will be exported as static assets later.

Acceptance criteria:

- Public URL and Astro `base` value are known.
- Data publication rules are documented.
- First-release scope is agreed.

### Phase 1: Foundation

- Scaffold Astro site.
- Add TypeScript configuration.
- Add GOV.UK Frontend dependency.
- Add base layout.
- Add community header and footer.
- Add initial reusable components for layout, skip link, header, footer, tags, and empty states.
- Configure base path for GitHub Pages project hosting.
- Add build and preview scripts.

Acceptance criteria:

- Site builds locally.
- Home page renders on desktop and mobile.
- Header clearly says the site is community-maintained and not official GOV.UK.
- Shared layout components render consistently across routes.

### Phase 2: Data Integration

- Import JSON data.
- Add typed data helpers.
- Normalise blank recommendations to `Not assessed`.
- Add display metadata for all recommendation values, including `Can use on mobile only`.
- Exclude inactive records from public catalogue data.
- Sanitise guidance HTML.
- Generate summary counts.
- Render a complete controls list.
- Format dates.
- Implement dataset, recommendation, metadata, and guidance display components.

Acceptance criteria:

- Record count matches source JSON.
- Summary counts match source JSON.
- Null descriptions, guidance, assessment dates, and recommendations do not break rendering.
- Inactive records are excluded from catalogue pages, detail pages, filters, and summary counts.
- Guidance renders without CKEditor wrappers, inline styles, or broken heading order.

### Phase 3: Search and Filters

- Add search input.
- Add recommendation filters.
- Add classic / modern filter.
- Add preview filter.
- Add accessible / not accessible filter.
- Update result count dynamically.
- Store state in query parameters.
- Use reusable filter, result count, table/card, and empty state components.

Acceptance criteria:

- Filters can be operated by keyboard.
- Filtered URLs can be shared.
- Empty results have useful text and a reset action.

### Phase 4: Detail Pages

- Add stable slugs.
- Generate `/canvas-controls/controls/[slug]/` pages.
- Link each listing row/card to detail page.
- Render description, recommendation, accessibility status, guidance, assessment dates, and modified date.
- Add a back link to the catalogue.
- Reuse metadata, recommendation, guidance, and back link components from the catalogue.

Acceptance criteria:

- Each record has a unique page.
- Duplicate names are handled by including part of the ID in the slug.
- Detail pages render complete data without exposing confusing raw codes by default.
- Records without guidance or assessment dates display clear fallback text.

### Phase 5: Accessibility and Quality

- Add linting and formatting.
- Add build check in CI.
- Add data contract tests for record count, recommendation values, inactive-record exclusion, date parsing, and unique slugs.
- Add guidance sanitisation tests.
- Add basic Playwright smoke tests.
- Add axe checks for key pages.
- Test built output under the GitHub Pages base path.
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

### Rich Text Guidance

Risk:

Guidance is exported as rich HTML with CKEditor wrapper markup, inline styles, generated classes, and occasional headings. Rendering it directly could harm accessibility, visual consistency, or security.

Mitigation:

- Sanitise guidance at build time.
- Allow only a small set of semantic HTML elements and safe attributes.
- Strip inline styles and wrapper markup.
- Add tests for the sanitiser.
- Review guidance output in desktop, mobile, keyboard, and screen reader spot checks.

### Inactive Records

Risk:

Inactive records could confuse users if shown alongside active guidance, and they are not needed by the target audience.

Mitigation:

- Exclude inactive records from the public catalogue, detail pages, filters, and summary counts.
- Keep inactive records only in the source dataset for auditability.
- Add a data contract test so accidental inclusion fails loudly.

### Component Over-Abstraction

Risk:

The site is small enough that too many generic components could make implementation harder to read and maintain.

Mitigation:

- Create components only for repeated layout, data display, and interaction patterns.
- Keep one-off page content directly in pages.
- Prefer explicit props and simple markup over generic configuration objects.
- Review component boundaries after the first catalogue and detail page are implemented.

### External UI Package Creep

Risk:

Adding another UI library could conflict with GOV.UK-informed styling, increase JavaScript/CSS weight, and make accessibility behaviour harder to audit.

Mitigation:

- Use `govuk-frontend` as the only external UI / design package for the first release.
- Build project-specific UI as local Astro components.
- Add another UI package only if there is a specific unmet need and the trade-off is documented.

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
- Include the assessment dates so users can judge currency.

### Blank Recommendations

Risk:

Blank recommendation fields could be mistaken for safe controls.

Mitigation:

- Treat blank values as `Not assessed`.
- Include a filter for not assessed controls.
- Style them neutrally.

### Recommendation Values May Change

Risk:

The current dataset includes `Can use on mobile only`, which was not in the original plan. More values could be added in future exports.

Mitigation:

- Validate recommendation values during build.
- Fail loudly for unknown recommendation values unless a deliberate fallback is documented.
- Keep recommendation display metadata close to the data module.

### Static Hosting Base Path

Risk:

GitHub Pages project sites are usually served from `/<repository-name>/`, which can break asset paths.

Mitigation:

- Configure Astro `base` correctly.
- Prefer relative links where suitable.
- Test built output locally before deployment.

## Open Decisions

- Confirm who owns the accessibility statement and review process.
- Confirm data refresh cadence.
- Confirm whether guidance is considered ready for public publishing.
- Confirm whether screenshots will be exported as static assets in a later release.

## First Build Recommendation

Build the first release with:

- Astro site under root `site/`
- Repo-wide landing page
- Canvas Controls catalogue page at `/canvas-controls/`
- Dataset summary
- Search and filters
- Detail pages for individual controls
- Guidance rendering where guidance is available
- Assessment dates where available
- GOV.UK-informed styling with custom community header
- GitHub Actions deployment
- README updates

Then add screenshots once image export and hosting are confirmed.
