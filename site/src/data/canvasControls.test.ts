import { describe, expect, test } from "vitest";
import {
  RECOMMENDATION_METADATA,
  RECOMMENDATIONS,
  canvasControlsSummary,
  formatDate,
  publicCanvasControls,
  sanitiseGuidanceHtml,
  sourceCanvasControlsDataset
} from "./canvasControls";

describe("Canvas Controls data contract", () => {
  test("source recordCount matches the actual source JSON record count", () => {
    expect(sourceCanvasControlsDataset.recordCount).toBe(sourceCanvasControlsDataset.records.length);
  });

  test("public controls include active source records only", () => {
    const activeSourceRecords = sourceCanvasControlsDataset.records.filter(
      (record) => record.status === "Active"
    );

    expect(publicCanvasControls).toHaveLength(activeSourceRecords.length);
    expect(publicCanvasControls.every((control) => control.status === "Active")).toBe(true);
  });

  test("blank source recommendations are normalised to Not assessed", () => {
    const activeBlankRecommendationIds = sourceCanvasControlsDataset.records
      .filter((record) => record.status === "Active")
      .filter((record) => !record.recommendation?.trim())
      .map((record) => record.id);

    const publicBlankRecommendations = publicCanvasControls.filter((control) =>
      activeBlankRecommendationIds.includes(control.id)
    );

    expect(activeBlankRecommendationIds.length).toBeGreaterThan(0);
    expect(publicBlankRecommendations).toHaveLength(activeBlankRecommendationIds.length);
    expect(publicBlankRecommendations.every((control) => control.recommendation === "Not assessed")).toBe(
      true
    );
  });

  test("all recommendation values have display metadata", () => {
    expect(Object.keys(RECOMMENDATION_METADATA).sort()).toEqual([...RECOMMENDATIONS].sort());
  });

  test("generated slugs are unique and include name, control type, and short id suffix", () => {
    const slugs = publicCanvasControls.map((control) => control.slug);

    expect(new Set(slugs).size).toBe(slugs.length);

    for (const control of publicCanvasControls) {
      expect(control.slug).toContain(control.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
      expect(control.slug).toContain(control.controlType.toLowerCase());
      expect(control.slug.endsWith(control.id.slice(0, 8).toLowerCase())).toBe(true);
    }
  });

  test("nullable text, dates, and guidance do not break public data processing", () => {
    expect(publicCanvasControls.some((control) => control.description === null)).toBe(true);
    expect(publicCanvasControls.some((control) => control.guidanceHtml === null)).toBe(true);
    expect(publicCanvasControls.some((control) => control.assessedByAccessibilityTeamOn === null)).toBe(true);
    expect(publicCanvasControls.some((control) => control.assessedByPlatformTeamOn === null)).toBe(true);

    for (const control of publicCanvasControls) {
      expect(typeof control.name).toBe("string");
      expect(control.description === null || typeof control.description === "string").toBe(true);
      expect(control.guidanceHtml === null || typeof control.guidanceHtml === "string").toBe(true);
    }
  });

  test("summary counts are generated from active public records", () => {
    const activeSourceRecords = sourceCanvasControlsDataset.records.filter(
      (record) => record.status === "Active"
    );

    expect(canvasControlsSummary.sourceRecordCount).toBe(sourceCanvasControlsDataset.records.length);
    expect(canvasControlsSummary.publicRecordCount).toBe(activeSourceRecords.length);
    expect(canvasControlsSummary.inactiveRecordCount).toBe(
      sourceCanvasControlsDataset.records.length - activeSourceRecords.length
    );

    for (const recommendation of RECOMMENDATIONS) {
      expect(canvasControlsSummary.recommendationCounts[recommendation]).toBe(
        publicCanvasControls.filter((control) => control.recommendation === recommendation).length
      );
    }

    expect(canvasControlsSummary.withGuidanceCount).toBe(
      publicCanvasControls.filter((control) => control.guidanceHtml !== null).length
    );
  });

  test("dates are formatted consistently in UK English using UTC", () => {
    expect(formatDate("2026-01-15T00:00:00Z")).toBe("15 January 2026");
    expect(formatDate(null)).toBeNull();
  });

  test("guidance sanitisation removes wrappers, unsafe attributes, scripts, and broken heading order", () => {
    const html = sanitiseGuidanceHtml(`
      <div class="ck-content" data-wrapper="true" dir="ltr" style="font-family: Segoe UI">
        <h1 class="generated" id="source-heading" data-id="header" style="color: red" onclick="alert(1)">
          Source heading
        </h1>
        <p style="margin: 0">
          <span class="generated" style="color: red"><strong>Keep semantic emphasis.</strong></span>
          <a href="javascript:alert(1)" onclick="alert(1)">Unsafe link</a>
          <a href="https://example.com" target="_blank" style="color: red">Safe link</a>
        </p>
        <script>alert("bad")</script>
      </div>
    `);

    expect(html).not.toBeNull();
    expect(html).toContain("<h3>");
    expect(html).not.toMatch(/<(?:div|span|script|h1|h2)\b/i);
    expect(html).not.toMatch(/\s(?:class|data-[\w-]+|id|onclick|style)=/i);
    expect(html).not.toContain("javascript:");
    expect(html).toContain("<a>Unsafe link</a>");
    expect(html).toContain(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Safe link</a>'
    );
  });
});
