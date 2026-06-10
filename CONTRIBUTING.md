# Contributing

This repository contains accessibility artefacts and the work-in-progress static site for the xGov
Low-Code community.

## Local development

The site lives in `site/` and uses Astro, TypeScript, pnpm and GOV.UK Frontend.

```powershell
cd site
pnpm install
pnpm run dev
```

Run these checks before publishing changes:

```powershell
cd site
pnpm run check
pnpm run test
pnpm run test:e2e
pnpm run build
```

## Site changes

- Keep source datasets under root `data/<subject>/` directories.
- Keep static site code under `site/`.
- Use GOV.UK Frontend as the only external UI/design package unless a later decision changes this.
- Do not use GOV.UK crown assets, official GOV.UK headers or service-style framing.
- Treat exported guidance HTML as unsafe and sanitise it before rendering.
- Do not render screenshots or screenshot placeholders until static image assets and suitable alt text exist.

## Data changes

The Canvas Controls JSON export updates automatically each day from the Defra tenant. The public site
publishes active controls only. Inactive records stay in the source dataset for auditability and must
remain excluded from public catalogue pages, detail pages, filters and summary counts.

Data contract tests should fail loudly when the export shape, record count, date parsing,
recommendation values, active-record filtering, slugs or guidance sanitisation no longer match the
published contract.

## Accessibility statement

The accessibility statement and review process are owned by the Defra Power Platform Service Team and
Defra Accessibility Team. The statement must be reviewed before launch, after significant site
changes, and at least every 12 months.

Do not invent compliance status, contact details, enforcement routes, disproportionate burden claims,
exemptions or review dates. Surface missing statement details as launch blockers until the statement
owners confirm them.
