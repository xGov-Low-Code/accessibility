export interface CanvasControlFilterRecord {
  slug: string;
  searchText: string;
  recommendation: string;
  controlType: string;
  preview: string;
  accessible: string;
}

export interface CanvasControlFilterState {
  query: string;
  recommendations: string[];
  controlTypes: string[];
  preview: string[];
  accessible: string[];
}

export function filterCanvasControlRecords(
  records: CanvasControlFilterRecord[],
  state: CanvasControlFilterState
): CanvasControlFilterRecord[] {
  const query = normaliseSearch(state.query);

  return records.filter((record) => {
    if (query && !normaliseSearch(record.searchText).includes(query)) {
      return false;
    }

    return (
      matchesSelectedValue(record.recommendation, state.recommendations) &&
      matchesSelectedValue(record.controlType, state.controlTypes) &&
      matchesSelectedValue(record.preview, state.preview) &&
      matchesSelectedValue(record.accessible, state.accessible)
    );
  });
}

export function hasCanvasControlFilters(state: CanvasControlFilterState): boolean {
  return (
    normaliseSearch(state.query).length > 0 ||
    state.recommendations.length > 0 ||
    state.controlTypes.length > 0 ||
    state.preview.length > 0 ||
    state.accessible.length > 0
  );
}

function matchesSelectedValue(value: string, selectedValues: string[]): boolean {
  return selectedValues.length === 0 || selectedValues.includes(value);
}

function normaliseSearch(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}
