import { test, expect } from "@playwright/test";

test.describe("site nav", () => {
  test("desktop nav is present with multiple links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header nav").first();
    await expect(nav).toBeVisible();
    const links = nav.locator('a[href^="#"]');
    expect(await links.count()).toBeGreaterThan(2);
  });

  test("clicking a nav item scrolls to that section", async ({ page }) => {
    await page.goto("/");
    // Pick a stable section that's visible in nav
    const target = page.locator('header nav a[href="#experience"]').first();
    if ((await target.count()) === 0) {
      test.skip(true, "experience nav link not visible");
    }
    await target.click();
    // Give scroll animation a moment
    const section = page.locator("#experience");
    await expect(section).toBeInViewport({ timeout: 5000 });
  });

  test("scroll-spy sets aria-current on the active nav item", async ({ page }) => {
    await page.goto("/");
    const target = page.locator('header nav a[href="#experience"]').first();
    if ((await target.count()) === 0) {
      test.skip(true, "experience nav link not visible");
    }
    // Scroll into the middle of the experience section
    await page.locator("#experience").scrollIntoViewIfNeeded();
    // Nudge a bit further so it's clearly the active section
    await page.mouse.wheel(0, 200);
    // Wait for scroll-spy to update
    await expect
      .poll(async () => await target.getAttribute("aria-current"), { timeout: 5000 })
      .toBe("location");
  });
});
