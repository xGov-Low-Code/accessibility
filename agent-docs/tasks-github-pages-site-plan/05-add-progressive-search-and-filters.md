# Task 05: Add Progressive Search And Filters

## Goal

Add accessible client-side search, filters, sort controls if needed, result count updates, query parameter persistence, and an empty state to `/canvas-controls/`.

This task is scoped to fit in one 100k token context window. Stop after completing this task unless the user explicitly asks you to continue into the next task.

## Read First

- `AGENTS.md`
- `agent-docs/2026-06-09-github-pages-site-plan.md`
- Existing `/canvas-controls/` implementation
- Existing data helpers and catalogue components

## Dependencies

- Task 04 should be complete, or `/canvas-controls/` should already render a full active-controls catalogue without JavaScript.

## Scope

- Add search by control name and description.
- Add recommendation filters, including `Not assessed`.
- Add classic and modern control type filters.
- Add preview status filter.
- Add accessible and not accessible filter.
- Add result count updates.
- Persist filter state in query parameters.
- Restore filter state from query parameters on page load.
- Add an empty results state with useful text and a reset action.
- Keep the full active-controls catalogue in the server-rendered HTML so the page remains useful if JavaScript fails.
- Add focused tests for deterministic filter logic if the logic is separable.

## Out Of Scope

- Detail pages.
- Server-side search endpoints.
- Custom comboboxes, custom selects, tabs, or disclosure widgets.
- Framework islands such as Svelte unless simple DOM enhancement becomes clearly insufficient.
- Screenshots or screenshot placeholders.

## Implementation Notes

- Use accessible native form controls.
- Avoid custom comboboxes unless the user explicitly agrees there is a clear need.
- Make filter changes visibly reflected through result counts.
- If result count changes are announced, do so without creating noisy screen reader output.
- Keep TypeScript small and deterministic.
- Use code for routing, query parsing, and filtering logic rather than model-generated manual mappings.

## Acceptance Criteria

- Filters can be operated by keyboard.
- Filtered URLs can be shared and reload to the same state.
- Result count updates when filters or search change.
- Empty results show useful text and a reset action.
- Status tags still include text and do not rely on colour alone.
- The full list remains available in HTML when JavaScript is unavailable.

## Verification

- Run unit tests for filter logic if added.
- Run `npm run build` from `site/`.
- Manually test keyboard operation.
- Manually test shared query URLs.
- Check narrow viewport and 200 percent zoom behaviour.

## Handoff

Next task: `06-add-control-detail-pages.md`.
