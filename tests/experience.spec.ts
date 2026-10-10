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
    await expect(page.getByRole("link", { name: "Register", exact: true })).toHaveAttribute("href", "/#discover");
    await expect(page.getByRole("button", { name: "Open navigation" })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "On this page" })).toHaveCount(0);
    await expect(page.locator("#revelation")).not.toBeInViewport();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    const order = await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.getAttribute("aria-labelledby")));
    expect(order).toEqual(["festival-title", "reveal-title", "discover-title", "archive-title", "enter-title"]);
    await expect(page.locator("video")).toHaveCount(1);
    await expect(page.locator("#archive .archive-carousel-card")).toHaveCount(4);
    await expect(page.locator("#archive .archive-carousel-count")).toHaveText("01 / 19");
    await expect(page.getByRole("link", { name: /register now/i })).toHaveCount(0);
    await expect(page.locator("#discover .event-poster")).toHaveCount(11);
    await expect(page.locator("#discover .event-poster-open")).toHaveCount(11);
    await expect(page.getByText("Tap the poster for details")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Technical", exact: true })).toHaveCount(0);
    if (width === 390) await page.locator("#discover").screenshot({ path: info.outputPath("event-fan-390.png") });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: info.outputPath(`first-screen-${width}.png`) });
    if (width === 390 || width === 1440) await page.locator("#archive .archive-carousel").screenshot({ path: info.outputPath(`archive-stack-${width}.png`) });
  });
}

test("navigation, shareable filters, invalid slugs and archive", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("link", { name: "Register", exact: true }).click();
  await expect(page).toHaveURL(/#discover$/);
  await page.goto("/events");
  await expect(page.getByRole("button", { name: /Show details for Poster Presentation/ })).toBeVisible();
  await page.goto("/events/poster-presentation");
  await page.getByRole("link", { name: "Back to events" }).click();
  await expect(page).toHaveURL(/\/#discover$/);
  const missing = await page.goto("/events/not-a-real-event");
  expect(missing?.status()).toBe(404);
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { name: /Last time at.*Techkriti/ })).toBeVisible();
  await expect(page.locator("main .archive-carousel-card")).toHaveCount(4);
  await expect(page.locator("main .archive-carousel-count")).toHaveText("01 / 19");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});

test("entrance bats and register feedback respect motion preference", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".entrance-bat")).toHaveCount(6);
  expect(await page.locator(".entrance-bat").first().evaluate((element) => getComputedStyle(element).animationName)).toBe("bat-arrive");
  const register = page.getByRole("link", { name: "Register", exact: true });
  await register.hover();
  await expect.poll(async () => register.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe("rgb(255, 244, 233)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".entrance-bat").first().evaluate((element) => getComputedStyle(element).display)).toBe("none");
});

test("combined event filtering and empty results", () => {
  expect(filterEvents(fixtureEvents, { q: "fixture 2", division: "Technical", category: "competition", day: "2" })).toHaveLength(1);
  expect(filterEvents(fixtureEvents, { q: "does not exist", division: "", category: "", day: "" })).toHaveLength(0);
});

test("keyboard access, reduced motion and 200% layout scaling", async ({ page }) => {
  await page.setViewportSize({ width: 780, height: 1000 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Register", exact: true })).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.evaluate(() => { document.body.style.zoom = "2"; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  await page.evaluate(() => document.getElementById("discover-title")?.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(page.getByRole("heading", { name: "Find your event." })).toBeInViewport();
});

test("touch swiping advances the event counter", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await openFixture(page);
  const rail = page.getByRole("region", { name: "All Techkriti events" });
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
  await expect(page.locator('[aria-live="polite"]')).toContainText("02");
});

test("homepage poster opens compact details without navigating away", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const poster = page.getByRole("button", { name: /Show details for Poster Presentation/ });
  await poster.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Poster Presentation" })).toBeVisible();
  expect((await dialog.boundingBox())!.height).toBeLessThan(700);
  await expect(page).toHaveURL(/\/$/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(poster).toBeFocused();
});

test("gallery cycles all 19 photos on mobile and desktop, with no photo arrows", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const gallery = page.locator("#archive .archive-carousel");
  await expect(gallery.getByText("Swipe, drag, or tap the top photo to explore all 19 memories.")).toBeVisible();
  await expect(gallery.locator(".archive-carousel-card")).toHaveCount(4);
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("01 / 19");
  await expect(gallery.getByRole("button", { name: "Next photo", exact: true })).toHaveCount(0);
  await expect(gallery.getByRole("link", { name: /View full photo/ })).toHaveCount(0);
  await expect(gallery.locator(".archive-stack-open, .archive-carousel-open")).toHaveCount(0);
  expect(await gallery.locator(".archive-carousel-photo img").first().evaluate((image) => getComputedStyle(image).objectFit)).toBe("contain");
  const landscapeRatio = await gallery.locator(".archive-carousel-stage").evaluate((stage) => stage.clientWidth / stage.clientHeight);
  expect(landscapeRatio).toBeCloseTo(1800 / 1201, 1);
  await gallery.getByRole("button", { name: /Photo 1 of 19/ }).click();
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("02 / 19");
  await page.screenshot({ path: info.outputPath("mobile-gallery-stack.png") });
  for (let index = 3; index <= 19; index++) {
    await gallery.getByRole("button", { name: new RegExp(`Photo ${index - 1} of 19`) }).click();
    await expect(gallery.locator(".archive-carousel-count")).toHaveText(`${String(index).padStart(2, "0")} / 19`);
    if (index === 4) {
      await expect(gallery.locator(".archive-carousel-stage")).toHaveAttribute("data-orientation", "portrait");
      await expect.poll(async () => gallery.locator(".archive-carousel-stage").evaluate((stage) => stage.clientWidth / stage.clientHeight)).toBeCloseTo(1800 / 2699, 1);
      await gallery.screenshot({ path: info.outputPath("mobile-gallery-portrait.png") });
    }
  }
  await gallery.getByRole("button", { name: /Photo 19 of 19/ }).click();
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("01 / 19");
  const directions = await page.locator("#discover .pumpkin-direction").evaluateAll((paths) => paths.map((path) => path.getAttribute("d")));
  expect(directions).toHaveLength(2);
  expect(directions[0]).not.toBe(directions[1]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("01 / 19");
  await gallery.getByRole("button", { name: /Photo 1 of 19/ }).click();
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("02 / 19");
});

test("dragging and touch swiping the gallery reveal the next photo", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const gallery = page.locator("#archive .archive-carousel");
  const front = gallery.getByRole("button", { name: /Photo 1 of 19/ });
  await front.scrollIntoViewIfNeeded();
  const desktop = await front.boundingBox();
  await page.mouse.move(desktop!.x + desktop!.width / 2, desktop!.y + desktop!.height / 2);
  await page.mouse.down();
  await page.mouse.move(desktop!.x + desktop!.width / 2 + 135, desktop!.y + desktop!.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("02 / 19");

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileFront = gallery.getByRole("button", { name: /Photo 2 of 19/ });
  await mobileFront.scrollIntoViewIfNeeded();
  const mobile = await mobileFront.boundingBox();
  const client = await page.context().newCDPSession(page);
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const x = mobile!.x + mobile!.width / 2;
  const y = mobile!.y + mobile!.height / 2;
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  for (let step = 1; step <= 7; step++) await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - step * 20, y }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(gallery.locator(".archive-carousel-count")).toHaveText("03 / 19");
});

for (const width of [320, 390, 1440]) {
  test(`populated carousel supports controls and the final card at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openFixture(page);
    await expect(page.locator('[aria-live="polite"]')).toContainText("01");
    await page.getByRole("button", { name: "Next event" }).click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("02");
    await page.getByRole("button", { name: "Next event" }).click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("03");
    const rail = page.getByRole("region", { name: "All Techkriti events" });
    await rail.focus();
    await page.keyboard.press("Home");
    await expect(page.locator('[aria-live="polite"]')).toContainText("01");
    await page.keyboard.press("End");
    await expect(page.locator('[aria-live="polite"]')).toContainText("04");
    await page.getByRole("button", { name: /Show details for Test fixture 4/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Test fixture 4" })).toBeVisible();
    await page.getByRole("button", { name: "Close event details" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL(/__component-test/);
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
