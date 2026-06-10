import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import { createReadStream, readFileSync } from "node:fs";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

interface SourceCanvasControl {
  id: string;
  name: string;
  description: string | null;
  guidance: string | null;
  status: string;
  isClassic: boolean;
}

interface SourceCanvasControlsDataset {
  records: SourceCanvasControl[];
}

interface TestCanvasControl extends SourceCanvasControl {
  hasGuidance: boolean;
  slug: string;
}

const basePath = "/accessibility";
const host = "127.0.0.1";
const port = 4322;
const testDirectory = dirname(fileURLToPath(import.meta.url));
const distDirectory = resolve(testDirectory, "../dist");
const controls = readActiveControls().sort((first, second) =>
  first.name.localeCompare(second.name, "en-GB")
);
const detailControl = controls.find((control) => control.hasGuidance) ?? controls[0];
const searchableControl = controls.find((control) => {
  const query = control.name.toLowerCase();
  const matches = controls.filter((candidate) =>
    `${candidate.name} ${candidate.description ?? ""}`.toLowerCase().includes(query)
  );

  return matches.length === 1;
});

if (!detailControl || !searchableControl) {
  throw new Error("Canvas Controls smoke tests need at least one active control and one unique search term.");
}

let server: Server;
let origin: string;

test.beforeAll(async () => {
  server = createServer(serveBuiltFile);

  await new Promise<void>((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(port, host, () => {
      server.off("error", rejectListen);
      origin = `http://${host}:${port}`;
      resolveListen();
    });
  });
});

test.afterAll(async () => {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
});

function readActiveControls(): TestCanvasControl[] {
  const datasetPath = resolve(testDirectory, "../../data/canvas-controls/ppcoe_canvascontrols.json");
  const dataset = JSON.parse(readFileSync(datasetPath, "utf8").replace(/^\uFEFF/, "")) as SourceCanvasControlsDataset;

  return dataset.records
    .filter((control) => control.status === "Active")
    .map((control) => ({
      ...control,
      hasGuidance: Boolean(control.guidance?.trim()),
      slug: createControlSlug(control)
    }));
}

function createControlSlug(control: SourceCanvasControl): string {
  return `${slugify(control.name)}-${control.isClassic ? "classic" : "modern"}-${control.id
    .slice(0, 8)
    .toLowerCase()}`;
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug.length > 0 ? slug : "control";
}

function pageUrl(path: string): string {
  return `${origin}${path}`;
}

function serveBuiltFile(request: IncomingMessage, response: ServerResponse): void {
  const requestUrl = new URL(request.url ?? "/", origin);

  if (!requestUrl.pathname.startsWith(basePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const pathWithoutBase = requestUrl.pathname.slice(basePath.length);
  const relativePath =
    pathWithoutBase.length === 0 || pathWithoutBase.endsWith("/")
      ? `${pathWithoutBase}index.html`
      : pathWithoutBase;
  const filePath = resolve(distDirectory, `.${relativePath}`);

  if (!filePath.startsWith(distDirectory)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const stream = createReadStream(filePath);

  stream.on("error", () => {
    response.writeHead(404);
    response.end("Not found");
  });
  response.setHeader("Content-Type", contentType(filePath));
  stream.pipe(response);
}

function contentType(filePath: string): string {
  if (filePath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }

  if (filePath.endsWith(".js")) {
    return "text/javascript; charset=utf-8";
  }

  if (filePath.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }

  if (filePath.endsWith(".svg")) {
    return "image/svg+xml";
  }

  return "text/html; charset=utf-8";
}

async function expectNoAxeViolations(pageUrl: string, page: Page) {
  await page.goto(pageUrl);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
}

test.describe("built site smoke checks", () => {
  test("home page links to the catalogue under the GitHub Pages base path", async ({ page }) => {
    await page.goto(pageUrl(`${basePath}/`));

    await expect(page).toHaveTitle("Home - xGov Low-Code Accessibility");
    await expect(page.getByRole("heading", { name: "xGov Low-Code Accessibility" })).toBeVisible();
    await expect(page.getByText("Not an official GOV.UK service")).toBeVisible();
    await expect(page.getByRole("link", { name: "Power Apps Canvas Controls Accessibility" })).toHaveAttribute(
      "href",
      `${basePath}/canvas-controls/`
    );
    await expect(page.getByRole("link", { name: "About this community site" })).toHaveAttribute(
      "href",
      `${basePath}/about/`
    );
  });

  test("public documentation pages explain launch readiness without screenshots", async ({ page }) => {
    for (const [route, heading] of [
      [`${basePath}/about/`, "About xGov Low-Code Accessibility"],
      [`${basePath}/data/`, "Data"],
      [`${basePath}/accessibility/`, "Accessibility statement"]
    ] as const) {
      await page.goto(pageUrl(route));

      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
      await expect(page.getByText("Not an official GOV.UK service", { exact: true })).toBeVisible();
      await expect(page.locator("img")).toHaveCount(0);
    }

    await expect(page.getByText("compliance status against WCAG 2.2 AA")).toBeVisible();
    await expect(page.getByText("A public contact route for accessibility feedback")).toBeVisible();
  });

  test("catalogue renders active controls and client filters without losing the base path", async ({ page }) => {
    await page.goto(pageUrl(`${basePath}/canvas-controls/`));

    await expect(page).toHaveTitle(
      "Power Apps Canvas Controls Accessibility - xGov Low-Code Accessibility"
    );
    await expect(page.getByRole("heading", { name: "Controls catalogue" })).toBeVisible();
    await expect(page.locator(".app-results-table tbody [data-control-result]")).toHaveCount(
      controls.length
    );
    await expect(page.locator("img")).toHaveCount(0);

    await expect(page.locator("[data-controls-filter-form]")).toBeVisible();
    await page.getByLabel("Search controls").fill(searchableControl.name);

    await expect(page.locator("[data-results-count]")).toHaveText("1 control matches these filters.");
    await expect(page.locator(".app-results-table tbody [data-control-result]:visible")).toHaveCount(1);
    expect(new URL(page.url()).pathname).toBe(`${basePath}/canvas-controls/`);
    expect(new URL(page.url()).searchParams.get("q")).toBe(searchableControl.name);
  });

  test("detail pages render sanitised guidance without screenshots or raw source codes", async ({ page }) => {
    await page.goto(pageUrl(`${basePath}/canvas-controls/controls/${detailControl.slug}/`));

    await expect(page).toHaveTitle(`${detailControl.name} - Canvas Control - xGov Low-Code Accessibility`);
    await expect(page.getByRole("heading", { name: detailControl.name })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Canvas Controls" })).toHaveAttribute(
      "href",
      `${basePath}/canvas-controls/`
    );
    await expect(page.locator("img")).toHaveCount(0);
    await expect(page.locator(".app-guidance-block")).toBeVisible();
    await expect(page.locator(".app-guidance-block script")).toHaveCount(0);
    await expect(page.locator(".app-guidance-block [style]")).toHaveCount(0);
    await expect(page.getByText("statusCode")).toHaveCount(0);
    await expect(page.getByText("recommendationCode")).toHaveCount(0);
  });
});

test.describe("axe accessibility checks", () => {
  for (const [name, route] of [
    ["home page", `${basePath}/`],
    ["about page", `${basePath}/about/`],
    ["data page", `${basePath}/data/`],
    ["accessibility page", `${basePath}/accessibility/`],
    ["catalogue page", `${basePath}/canvas-controls/`],
    ["control detail page", `${basePath}/canvas-controls/controls/${detailControl.slug}/`]
  ] as const) {
    test(`${name} has no automated axe violations`, async ({ page }) => {
      await expectNoAxeViolations(pageUrl(route), page);
    });
  }
});
