import { test, expect } from "@playwright/test";

test.describe("theme toggle", () => {
  test("toggling switches the html dark class", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /switch to (light|dark) theme/i });
    await expect(toggle).toBeVisible();

    const before = (await html.getAttribute("class")) ?? "";
    const wasDark = before.includes("dark");

    await toggle.click();

    await expect
      .poll(async () => ((await html.getAttribute("class")) ?? "").includes("dark"), {
        timeout: 3000,
      })
      .toBe(!wasDark);

    // Toggle back
    await page.getByRole("button", { name: /switch to (light|dark) theme/i }).click();
    await expect
      .poll(async () => ((await html.getAttribute("class")) ?? "").includes("dark"), {
        timeout: 3000,
      })
      .toBe(wasDark);
  });
});
