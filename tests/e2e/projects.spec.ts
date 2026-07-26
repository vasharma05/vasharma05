import { test, expect } from "@playwright/test";

test.describe("projects grid", () => {
  test("renders a list of projects", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#projects");
    await expect(section).toBeVisible();
    const items = section.locator("ul > li");
    expect(await items.count()).toBeGreaterThan(0);
  });

  test("expandable project card toggles aria-expanded", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#projects");
    await section.scrollIntoViewIfNeeded();

    const cards = section.locator("li", {
      has: page.locator("button[aria-expanded]"),
    });
    const count = await cards.count();
    test.skip(count === 0, "No expandable projects in current content");

    const card = cards.first();
    const toggle = card.locator("button[aria-expanded]").first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
