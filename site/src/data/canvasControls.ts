import { parseFragment, serialize } from "parse5";
import type { DefaultTreeAdapterMap } from "parse5";
import sourceDatasetJson from "../../../data/canvas-controls/ppcoe_canvascontrols.json";

export const RECOMMENDATIONS = [
  "Can use",
  "Can use with amendments",
  "Can use on mobile only",
  "Avoid using if possible",
  "Do not use",
  "Not assessed"
] as const;

export type Recommendation = (typeof RECOMMENDATIONS)[number];
export type ControlType = "Classic" | "Modern";

export interface RecommendationMetadata {
  label: Recommendation;
  tagClass: string;
}

export const RECOMMENDATION_METADATA: Record<Recommendation, RecommendationMetadata> = {
  "Can use": {
    label: "Can use",
    tagClass: "govuk-tag--green"
  },
  "Can use with amendments": {
    label: "Can use with amendments",
    tagClass: "govuk-tag--turquoise"
  },
  "Can use on mobile only": {
    label: "Can use on mobile only",
    tagClass: "govuk-tag--purple"
  },
  "Avoid using if possible": {
    label: "Avoid using if possible",
    tagClass: "govuk-tag--yellow"
  },
  "Do not use": {
    label: "Do not use",
    tagClass: "govuk-tag--red"
  },
  "Not assessed": {
    label: "Not assessed",
    tagClass: "govuk-tag--grey"
  }
};

export interface SourceCanvasControl {
  id: string;
  name: string;
  assessedByAccessibilityTeamOn: string | null;
  assessedByPlatformTeamOn: string | null;
  description: string | null;
  guidance: string | null;
  screenshotUrl: string | null;
  status: string;
  statusCode: number;
  recommendation: string | null;
  recommendationCode: number | null;
  isInPreview: boolean;
  isClassic: boolean;
  isAccessible: boolean;
  createdOn: string;
  modifiedOn: string;
}

export interface SourceCanvasControlsDataset {
  schemaVersion: "1.0";
  source: string;
  table: "ppcoe_canvascontrols";
  exportedAtUtc: string;
  recordCount: number;
  records: SourceCanvasControl[];
}

export interface PublicCanvasControl
  extends Omit<SourceCanvasControl, "recommendation" | "description" | "guidance"> {
  controlType: ControlType;
  description: string | null;
  guidanceHtml: string | null;
  recommendation: Recommendation;
  slug: string;
}

export interface CanvasControlsSummary {
  sourceRecordCount: number;
  publicRecordCount: number;
  inactiveRecordCount: number;
  exportedAtUtc: string;
  exportedDate: string;
  recommendationCounts: Record<Recommendation, number>;
  accessibleCount: number;
  inaccessibleCount: number;
  classicCount: number;
  modernCount: number;
  previewCount: number;
  withGuidanceCount: number;
  withAccessibilityTeamAssessmentCount: number;
  withPlatformTeamAssessmentCount: number;
}

type ParseNode = DefaultTreeAdapterMap["node"];
type ParseChildNode = DefaultTreeAdapterMap["childNode"];
type ParseElement = DefaultTreeAdapterMap["element"];
type ParseAttribute = ParseElement["attrs"][number];
type ParseParentNode = ParseNode & { childNodes: ParseChildNode[] };

const DATE_FIELDS = [
  "assessedByAccessibilityTeamOn",
  "assessedByPlatformTeamOn",
  "createdOn",
  "modifiedOn"
] as const;

const UNSAFE_TAGS = new Set(["script", "style", "iframe", "object", "embed", "link", "meta"]);
const ALLOWED_TAGS = new Set(["a", "br", "em", "h3", "li", "ol", "p", "strong", "ul"]);
const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

export const sourceCanvasControlsDataset = validateSourceDataset(sourceDatasetJson);
export const publicCanvasControls = buildPublicCanvasControls(sourceCanvasControlsDataset);
export const canvasControlsSummary = buildCanvasControlsSummary(
  sourceCanvasControlsDataset,
  publicCanvasControls
);

export function buildPublicCanvasControls(dataset: SourceCanvasControlsDataset): PublicCanvasControl[] {
  const controls = dataset.records.filter(isActiveRecord).map(toPublicCanvasControl);
  assertUniqueSlugs(controls);

  return controls;
}

export function buildCanvasControlsSummary(
  dataset: SourceCanvasControlsDataset,
  controls: PublicCanvasControl[]
): CanvasControlsSummary {
  const recommendationCounts = createEmptyRecommendationCounts();

  for (const control of controls) {
    recommendationCounts[control.recommendation] += 1;
  }

  return {
    sourceRecordCount: dataset.recordCount,
    publicRecordCount: controls.length,
    inactiveRecordCount: dataset.records.length - controls.length,
    exportedAtUtc: dataset.exportedAtUtc,
    exportedDate: formatRequiredDate(dataset.exportedAtUtc),
    recommendationCounts,
    accessibleCount: controls.filter((control) => control.isAccessible).length,
    inaccessibleCount: controls.filter((control) => !control.isAccessible).length,
    classicCount: controls.filter((control) => control.controlType === "Classic").length,
    modernCount: controls.filter((control) => control.controlType === "Modern").length,
    previewCount: controls.filter((control) => control.isInPreview).length,
    withGuidanceCount: controls.filter((control) => control.guidanceHtml !== null).length,
    withAccessibilityTeamAssessmentCount: controls.filter(
      (control) => control.assessedByAccessibilityTeamOn !== null
    ).length,
    withPlatformTeamAssessmentCount: controls.filter(
      (control) => control.assessedByPlatformTeamOn !== null
    ).length
  };
}

export function normaliseRecommendation(value: string | null): Recommendation {
  const recommendation = value?.trim();

  if (!recommendation) {
    return "Not assessed";
  }

  if (isRecommendation(recommendation)) {
    return recommendation;
  }

  throw new Error(`Unknown Canvas Controls recommendation: ${recommendation}`);
}

export function createControlSlug(control: SourceCanvasControl): string {
  const controlType = control.isClassic ? "classic" : "modern";
  const idSuffix = control.id.slice(0, 8).toLowerCase();

  return `${slugify(control.name)}-${controlType}-${idSuffix}`;
}

export function formatDate(value: string | null): string | null {
  if (value === null) {
    return null;
  }

  assertValidDate(value, "date");

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "UTC"
  }).format(new Date(value));
}

function formatRequiredDate(value: string): string {
  return formatDate(value) ?? value;
}

export function sanitiseGuidanceHtml(value: string | null): string | null {
  const guidance = value?.trim();

  if (!guidance) {
    return null;
  }

  const fragment = parseFragment(guidance);
  fragment.childNodes = sanitiseChildren(fragment);

  const html = serialize(fragment).trim();

  return html.length > 0 ? html : null;
}

function validateSourceDataset(value: unknown): SourceCanvasControlsDataset {
  const dataset = readObject(value, "Canvas Controls dataset");
  const schemaVersion = readString(dataset, "schemaVersion", "Canvas Controls dataset");
  const source = readString(dataset, "source", "Canvas Controls dataset");
  const table = readString(dataset, "table", "Canvas Controls dataset");
  const exportedAtUtc = readString(dataset, "exportedAtUtc", "Canvas Controls dataset");
  const recordCount = readNumber(dataset, "recordCount", "Canvas Controls dataset");
  const recordsValue = dataset.records;

  if (schemaVersion !== "1.0") {
    throw new Error(`Unsupported Canvas Controls schemaVersion: ${schemaVersion}`);
  }

  if (table !== "ppcoe_canvascontrols") {
    throw new Error(`Unexpected Canvas Controls table: ${table}`);
  }

  assertValidDate(exportedAtUtc, "exportedAtUtc");

  if (!Array.isArray(recordsValue)) {
    throw new Error("Canvas Controls dataset records must be an array");
  }

  if (recordCount !== recordsValue.length) {
    throw new Error(
      `Canvas Controls recordCount ${recordCount} does not match actual record count ${recordsValue.length}`
    );
  }

  const records = recordsValue.map((record, index) => validateSourceRecord(record, index));
  assertUniqueSlugs(records.map(toPublicCanvasControl));

  return {
    schemaVersion,
    source,
    table,
    exportedAtUtc,
    recordCount,
    records
  };
}

function validateSourceRecord(value: unknown, index: number): SourceCanvasControl {
  const context = `Canvas Controls record ${index + 1}`;
  const record = readObject(value, context);
  const sourceRecord: SourceCanvasControl = {
    id: readString(record, "id", context),
    name: readString(record, "name", context),
    assessedByAccessibilityTeamOn: readNullableString(record, "assessedByAccessibilityTeamOn", context),
    assessedByPlatformTeamOn: readNullableString(record, "assessedByPlatformTeamOn", context),
    description: readNullableString(record, "description", context),
    guidance: readNullableString(record, "guidance", context),
    screenshotUrl: readNullableString(record, "screenshotUrl", context),
    status: readString(record, "status", context),
    statusCode: readNumber(record, "statusCode", context),
    recommendation: readNullableString(record, "recommendation", context),
    recommendationCode: readNullableNumber(record, "recommendationCode", context),
    isInPreview: readBoolean(record, "isInPreview", context),
    isClassic: readBoolean(record, "isClassic", context),
    isAccessible: readBoolean(record, "isAccessible", context),
    createdOn: readString(record, "createdOn", context),
    modifiedOn: readString(record, "modifiedOn", context)
  };

  if (sourceRecord.id.trim().length === 0) {
    throw new Error(`${context} id must not be blank`);
  }

  if (sourceRecord.name.trim().length === 0) {
    throw new Error(`${context} name must not be blank`);
  }

  normaliseRecommendation(sourceRecord.recommendation);

  for (const field of DATE_FIELDS) {
    assertValidDate(sourceRecord[field], `${context} ${field}`);
  }

  return sourceRecord;
}

function toPublicCanvasControl(control: SourceCanvasControl): PublicCanvasControl {
  return {
    ...control,
    controlType: control.isClassic ? "Classic" : "Modern",
    description: normaliseNullableString(control.description),
    guidanceHtml: sanitiseGuidanceHtml(control.guidance),
    recommendation: normaliseRecommendation(control.recommendation),
    slug: createControlSlug(control)
  };
}

function createEmptyRecommendationCounts(): Record<Recommendation, number> {
  return Object.fromEntries(RECOMMENDATIONS.map((recommendation) => [recommendation, 0])) as Record<
    Recommendation,
    number
  >;
}

function isActiveRecord(record: SourceCanvasControl): boolean {
  return record.status === "Active";
}

function isRecommendation(value: string): value is Recommendation {
  return RECOMMENDATIONS.includes(value as Recommendation);
}

function assertUniqueSlugs(controls: Pick<PublicCanvasControl, "slug">[]): void {
  const slugs = new Set<string>();

  for (const control of controls) {
    if (slugs.has(control.slug)) {
      throw new Error(`Duplicate Canvas Controls slug generated: ${control.slug}`);
    }

    slugs.add(control.slug);
  }
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug.length > 0 ? slug : "control";
}

function sanitiseChildren(parent: ParseParentNode): ParseChildNode[] {
  return parent.childNodes.flatMap(sanitiseNode);
}

function sanitiseNode(node: ParseChildNode): ParseChildNode[] {
  if (!isElementNode(node)) {
    return node.nodeName === "#text" ? [node] : [];
  }

  const tagName = normaliseTagName(node.tagName);

  if (UNSAFE_TAGS.has(tagName)) {
    return [];
  }

  if (hasChildNodes(node)) {
    node.childNodes = sanitiseChildren(node);
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    return hasChildNodes(node) ? node.childNodes : [];
  }

  node.nodeName = tagName;
  node.tagName = tagName;
  node.attrs = sanitiseAttributes(tagName, node.attrs);

  return [node];
}

function normaliseTagName(tagName: string): string {
  const lowerTagName = tagName.toLowerCase();

  if (HEADING_TAGS.has(lowerTagName)) {
    return "h3";
  }

  if (lowerTagName === "b") {
    return "strong";
  }

  if (lowerTagName === "i") {
    return "em";
  }

  return lowerTagName;
}

function sanitiseAttributes(tagName: string, attrs: ParseAttribute[]): ParseAttribute[] {
  if (tagName !== "a") {
    return [];
  }

  const href = attrs.find((attr) => attr.name.toLowerCase() === "href")?.value.trim();
  const target = attrs.find((attr) => attr.name.toLowerCase() === "target")?.value.trim();
  const safeAttrs: ParseAttribute[] = [];

  if (!href || !isSafeHref(href)) {
    return safeAttrs;
  }

  safeAttrs.push({ name: "href", value: href });

  if (target === "_blank") {
    safeAttrs.push({ name: "target", value: "_blank" });
    safeAttrs.push({ name: "rel", value: "noopener noreferrer" });
  }

  return safeAttrs;
}

function isSafeHref(value: string): boolean {
  const normalisedValue = value.trim().toLowerCase();

  return !(
    normalisedValue.startsWith("javascript:") ||
    normalisedValue.startsWith("data:") ||
    normalisedValue.startsWith("vbscript:")
  );
}

function isElementNode(node: ParseNode): node is ParseElement {
  return "tagName" in node && "attrs" in node;
}

function hasChildNodes(node: ParseNode): node is ParseParentNode {
  return "childNodes" in node && Array.isArray(node.childNodes);
}

function assertValidDate(value: string | null, context: string): void {
  if (value === null) {
    return;
  }

  if (Number.isNaN(Date.parse(value))) {
    throw new Error(`${context} must be a valid date`);
  }
}

function normaliseNullableString(value: string | null): string | null {
  const normalisedValue = value?.trim();

  return normalisedValue ? normalisedValue : null;
}

function readObject(value: unknown, context: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${context} must be an object`);
  }

  return value as Record<string, unknown>;
}

function readString(record: Record<string, unknown>, key: string, context: string): string {
  const value = record[key];

  if (typeof value !== "string") {
    throw new Error(`${context} ${key} must be a string`);
  }

  return value;
}

function readNullableString(record: Record<string, unknown>, key: string, context: string): string | null {
  const value = record[key];

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    throw new Error(`${context} ${key} must be a string or null`);
  }

  return value;
}

function readNumber(record: Record<string, unknown>, key: string, context: string): number {
  const value = record[key];

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${context} ${key} must be a finite number`);
  }

  return value;
}

function readNullableNumber(record: Record<string, unknown>, key: string, context: string): number | null {
  const value = record[key];

  if (value === null) {
    return null;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${context} ${key} must be a finite number or null`);
  }

  return value;
}

function readBoolean(record: Record<string, unknown>, key: string, context: string): boolean {
  const value = record[key];

  if (typeof value !== "boolean") {
    throw new Error(`${context} ${key} must be a boolean`);
  }

  return value;
}
