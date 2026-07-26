import { describe, it, expect } from "vitest";
import { isExternalHref } from "@/lib/href";

describe("isExternalHref", () => {
  it("returns true for https URLs", () => {
    expect(isExternalHref("https://example.com")).toBe(true);
  });

  it("returns true for http URLs", () => {
    expect(isExternalHref("http://example.com/path")).toBe(true);
  });

  it("is case insensitive", () => {
    expect(isExternalHref("HTTPS://example.com")).toBe(true);
  });

  it("returns false for hash-only links", () => {
    expect(isExternalHref("#hero")).toBe(false);
  });

  it("returns false for absolute paths", () => {
    expect(isExternalHref("/about")).toBe(false);
  });

  it("returns false for relative paths", () => {
    expect(isExternalHref("about/team")).toBe(false);
  });

  it("returns false for mailto (non http/https)", () => {
    expect(isExternalHref("mailto:foo@bar.com")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isExternalHref("")).toBe(false);
  });
});
