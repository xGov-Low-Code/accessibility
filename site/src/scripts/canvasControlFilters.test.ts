import { describe, expect, test } from "vitest";
import {
  filterCanvasControlRecords,
  hasCanvasControlFilters,
  type CanvasControlFilterRecord,
  type CanvasControlFilterState
} from "./canvasControlFilters";

const records: CanvasControlFilterRecord[] = [
  {
    slug: "button-modern-11111111",
    searchText: "Button Select an action",
    recommendation: "Can use",
    controlType: "Modern",
    preview: "not-in-preview",
    accessible: "yes"
  },
  {
    slug: "classic-date-picker-22222222",
    searchText: "Classic date picker Pick a calendar date",
    recommendation: "Can use with amendments",
    controlType: "Classic",
    preview: "not-in-preview",
    accessible: "no"
  },
  {
    slug: "barcode-reader-33333333",
    searchText: "Barcode reader Scan product codes",
    recommendation: "Not assessed",
    controlType: "Modern",
    preview: "in-preview",
    accessible: "no"
  }
];

const emptyState: CanvasControlFilterState = {
  query: "",
  recommendations: [],
  controlTypes: [],
  preview: [],
  accessible: []
};

describe("Canvas Controls filter logic", () => {
  test("blank filters keep the full catalogue available", () => {
    expect(filterCanvasControlRecords(records, emptyState).map((record) => record.slug)).toEqual([
      "button-modern-11111111",
      "classic-date-picker-22222222",
      "barcode-reader-33333333"
    ]);
    expect(hasCanvasControlFilters(emptyState)).toBe(false);
  });

  test("search matches control names and descriptions without depending on case or repeated spaces", () => {
    const matches = filterCanvasControlRecords(records, {
      ...emptyState,
      query: "  CALENDAR   date "
    });

    expect(matches.map((record) => record.slug)).toEqual(["classic-date-picker-22222222"]);
  });

  test("selected values are combined as OR within a group and AND across filter groups", () => {
    const matches = filterCanvasControlRecords(records, {
      ...emptyState,
      recommendations: ["Can use", "Not assessed"],
      controlTypes: ["Modern"],
      accessible: ["no"]
    });

    expect(matches.map((record) => record.slug)).toEqual(["barcode-reader-33333333"]);
  });

  test("preview and accessibility filters can return no matches for the empty state", () => {
    const matches = filterCanvasControlRecords(records, {
      ...emptyState,
      preview: ["in-preview"],
      accessible: ["yes"]
    });

    expect(matches).toHaveLength(0);
    expect(
      hasCanvasControlFilters({
        ...emptyState,
        preview: ["in-preview"],
        accessible: ["yes"]
      })
    ).toBe(true);
  });
});
