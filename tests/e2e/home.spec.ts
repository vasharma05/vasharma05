import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("loads with main landmark and hero visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("#hero")).toBeVisible();
    // h1 in hero
    await expect(page.locator("#hero h1")).toBeVisible();
  });

  test("hero has at least one CTA / anchor", async ({ page }) => {
    await page.goto("/");
    const heroLinks = page.locator("#hero a");
    await expect(heroLinks.first()).toBeVisible();
    expect(await heroLinks.count()).toBeGreaterThan(0);
  });

  test("has a scroll-down affordance in the hero", async ({ page }) => {
    await page.goto("/");
    // The ScrollDownArrow is rendered as an anchor inside hero
    const arrow = page.locator('#hero a[href^="#"]').last();
    await expect(arrow).toBeVisible();
  });
});
