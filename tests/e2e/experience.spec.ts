import { test, expect } from "@playwright/test";

test.describe("experience cards", () => {
  test("show-more button expands and collapses via aria-expanded", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#experience");
    await expect(section).toBeVisible();
    await section.scrollIntoViewIfNeeded();

    // Find the first card that has an expand toggle
    const cards = section.locator("article", {
      has: page.locator("button[aria-expanded]"),
    });
    const cardCount = await cards.count();
    test.skip(cardCount === 0, "No collapsible experience cards in current content");

    const card = cards.first();
    // Button carries aria-expanded (unlike the tech "+N more" button)
    const toggle = card.locator("button[aria-expanded]").first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveText(/^show \d+ more$/i);
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveText(/show less/i);
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveText(/^show \d+ more$/i);
  });
});
