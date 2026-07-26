import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

type EduItem = { visible: boolean; institution: string; degree: string };

function loadEducation(): EduItem[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "public", "content.json"),
    "utf8",
  );
  const parsed = JSON.parse(raw) as {
    education: { items: EduItem[] };
  };
  return parsed.education.items.filter((i) => i.visible);
}

test.describe("education section", () => {
  test("groups multiple degrees under a single institution heading", async ({ page }) => {
    const items = loadEducation();
    // Find an institution that appears more than once
    const counts = new Map<string, number>();
    for (const it of items) counts.set(it.institution, (counts.get(it.institution) ?? 0) + 1);
    const grouped = [...counts.entries()].find(([, c]) => c > 1);

    await page.goto("/");
    const section = page.locator("#education");
    await expect(section).toBeVisible();

    if (grouped) {
      const [institution, count] = grouped;
      const headings = section.getByRole("heading", { name: institution, level: 3 });
      // Institution should appear exactly once even though there are multiple degrees
      await expect(headings).toHaveCount(1);
      // The progression list should have at least `count` <li> entries
      const progression = section.locator("article", { hasText: institution }).locator("ol > li");
      expect(await progression.count()).toBeGreaterThanOrEqual(count);
    } else {
      // At minimum the section renders one institution heading
      const headings = section.getByRole("heading", { level: 3 });
      expect(await headings.count()).toBeGreaterThan(0);
    }
  });
});
