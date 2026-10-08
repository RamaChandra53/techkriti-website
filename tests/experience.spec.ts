import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { build } from "esbuild";
import path from "node:path";
import { fixtureEvents } from "./fixtures";
import { filterEvents } from "../lib/events";

let fixtureBundle: string;

async function openFixture(page: Page, view = "carousel") {
  if (!fixtureBundle) {
    const result = await build({
      entryPoints: [path.resolve("tests/component-fixture.tsx")],
      bundle: true,
      write: false,
      platform: "browser",
      jsx: "automatic",
      define: { "process.env": "{}", "process.env.NODE_ENV": '"production"' },
      plugins: [{
        name: "next-component-adapters",
        setup(builder) {
          builder.onResolve({ filter: /^next\/(link|image)$/ }, (args) => ({ path: args.path, namespace: "test-adapter" }));
          builder.onLoad({ filter: /.*/, namespace: "test-adapter" }, (args) => ({
            loader: "tsx",
            resolveDir: process.cwd(),
            contents: args.path === "next/link"
              ? 'export default function Link({href, children, ...props}) { return <a href={href} {...props}>{children}</a>; }'
              : 'export default function Image({src, alt}) { return <img src={src} alt={alt} />; }',
          }));
        },
      }],
    });
    fixtureBundle = result.outputFiles[0].text;
  }
  const home = await page.request.get("/");
  const cssLinks = (await home.text()).match(/<link[^>]+rel="stylesheet"[^>]*>/g)?.join("") ?? "";
  await page.route("**/__component-test?*", (route) => route.fulfill({
    contentType: "text/html",
    body: `<!doctype html><html lang="en"><head><title>Isolated component test</title><meta name="viewport" content="width=device-width,initial-scale=1">${cssLinks}</head><body class="font-sans"><div id="fixture" style="max-width:960px;margin:20px"></div></body></html>`,
  }));
  await page.goto(`/__component-test?view=${view}`);
  await page.addScriptTag({ content: fixtureBundle });
}

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`homepage fits ${width}px and keeps event access visible`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Techkriti After dark.");
    await expect(page.getByRole("link", { name: "Explore events", exact: true })).toHaveAttribute("href", "#discover");
    await expect(page.getByRole("link", { name: "The revelation", exact: true })).toHaveAttribute("href", "#revelation");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    const order = await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.getAttribute("aria-labelledby")));
    expect(order).toEqual(["festival-title", "reveal-title", "discover-title", "archive-title", "enter-title"]);
    await expect(page.locator("video")).toHaveCount(1);
    await expect(page.getByRole("link", { name: /register now/i })).toHaveCount(0);
    await page.getByRole("button", { name: "Non-technical", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Mummy Wrap" })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: info.outputPath(`first-screen-${width}.png`) });
    await page.screenshot({ path: info.outputPath(`home-${width}.png`), fullPage: true });
  });
}

test("navigation, shareable filters, invalid slugs and archive", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Schedule" }).click();
  await expect(page).toHaveURL(/\/schedule$/);
  await page.goto("/events");
  await expect(page.getByRole("heading", { name: "Poster Presentation" })).toBeVisible();
  const missing = await page.goto("/events/not-a-real-event");
  expect(missing?.status()).toBe(404);
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { name: "The people." })).toBeVisible();
  await expect(page.locator("main figure")).toHaveCount(19);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});

test("combined event filtering and empty results", () => {
  expect(filterEvents(fixtureEvents, { q: "fixture 2", division: "Technical", category: "competition", day: "2" })).toHaveLength(1);
  expect(filterEvents(fixtureEvents, { q: "does not exist", division: "", category: "", day: "" })).toHaveLength(0);
});

test("keyboard menu, reduced motion and 200% layout scaling", async ({ page }) => {
  await page.setViewportSize({ width: 780, height: 1000 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Home", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.evaluate(() => { document.body.style.zoom = "2"; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  await page.locator("#discover-title").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Find your event." })).toBeInViewport();
});

test("native touch swiping advances the event counter", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await openFixture(page);
  const rail = page.getByRole("region", { name: "Technical events" });
  await rail.scrollIntoViewIfNeeded();
  const bounds = await rail.boundingBox();
  const client = await page.context().newCDPSession(page);
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const x = bounds!.x + bounds!.width - 25;
  const y = bounds!.y + 100;
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  for (let step = 1; step <= 6; step++) {
    await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - step * 43, y }] });
  }
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(async () => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(150);
  await expect(page.getByRole("button", { name: "Previous event" })).toBeEnabled();
});

for (const width of [320, 390, 1440]) {
  test(`populated carousel supports controls and the final card at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openFixture(page);
    await expect(page.getByRole("button", { name: "Previous event" })).toBeDisabled();
    await page.getByRole("button", { name: "Next event" }).click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("02");
    await page.getByRole("button", { name: "Next event" }).click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("03");
    await expect(page.getByRole("button", { name: "Next event" })).toBeDisabled();
    const rail = page.getByRole("region", { name: "Technical events" });
    await rail.focus();
    await page.keyboard.press("Home");
    await expect(page.getByRole("button", { name: "Previous event" })).toBeDisabled();
    await page.keyboard.press("End");
    await expect(page.getByRole("button", { name: "Next event" })).toBeDisabled();
    await page.getByRole("button", { name: "Non-technical", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Test fixture 4" })).toBeVisible();
    await expect(page.locator('[aria-live="polite"]')).toContainText("01");
    await expect(page.getByRole("button", { name: "Next event" })).toBeDisabled();
    await page.getByRole("button", { name: "Technical", exact: true }).click();
    await expect(page.getByRole("button", { name: "Previous event" })).toBeDisabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  });
}

test("event details show essentials first and only supplied registration", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openFixture(page, "detail");
  const form = page.getByRole("link", { name: /Register now/ }).filter({ visible: true });
  await expect(form).toHaveAttribute("href", fixtureEvents[0].registrationUrl!);
  await expect(form).toHaveAttribute("target", "_blank");
  await expect(form).toHaveAttribute("rel", "noopener noreferrer");
  const essentials = await page.getByRole("complementary").boundingBox();
  const about = await page.getByRole("heading", { name: "About the event" }).boundingBox();
  expect(essentials!.y).toBeLessThan(about!.y);
  await page.getByText("Read all 5 rules", { exact: true }).click();
  await expect(page.getByText("Test rule five", { exact: true })).toBeVisible();
  await openFixture(page, "missing-form");
  await expect(page.getByRole("link", { name: /Register now/ })).toHaveCount(0);
  await expect(page.getByText("Registration link coming soon.")).toBeVisible();
});

test("key pages and populated controls have no automated accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/events", "/gallery"]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(result.violations, route).toEqual([]);
  }
  await openFixture(page);
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
});
