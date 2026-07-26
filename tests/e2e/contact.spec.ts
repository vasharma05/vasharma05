import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test("renders form with required fields and a submit button", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#contact");
    await expect(section).toBeVisible();
    await section.scrollIntoViewIfNeeded();

    const form = section.locator("form");
    await expect(form).toBeVisible();

    // Should have at least name, email, and message
    await expect(form.locator("#name")).toBeVisible();
    await expect(form.locator("#email")).toBeVisible();
    await expect(form.locator("#message")).toBeVisible();

    // Required attribute is set on visible required fields
    await expect(form.locator("#name")).toHaveAttribute("required", "");
    await expect(form.locator("#email")).toHaveAttribute("required", "");

    // Submit button present
    await expect(form.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("empty submit is blocked by native validation (mailto: does not fire)", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("#contact");
    await section.scrollIntoViewIfNeeded();
    const form = section.locator("form");

    let navigatedToMailto = false;
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame() && frame.url().startsWith("mailto:")) {
        navigatedToMailto = true;
      }
    });

    await form.getByRole("button", { name: /send message/i }).click();
    // Give it a beat
    await page.waitForTimeout(300);

    // First required field should be marked invalid
    const nameInvalid = await form
      .locator("#name")
      .evaluate((el: HTMLInputElement) => !el.checkValidity());
    expect(nameInvalid).toBe(true);
    expect(navigatedToMailto).toBe(false);
  });
});
