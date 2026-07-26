import { test, expect } from "@playwright/test";

test.describe("a11y landmarks", () => {
  test("page exposes nav, main and footer landmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header nav").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("main sections have h2 headings", async ({ page }) => {
    await page.goto("/");
    const h2s = page.locator("main h2");
    expect(await h2s.count()).toBeGreaterThan(3);
  });

  test("hero has an h1", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator("h1").count()).toBeGreaterThanOrEqual(1);
  });
});
