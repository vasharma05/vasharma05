import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";

const ORIGINAL = process.env.NEXT_PUBLIC_BASE_PATH;

async function loadWithBasePath(base?: string) {
  vi.resetModules();
  if (base === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = base;
  const mod = await import("@/lib/base-path");
  return mod.withBasePath;
}

afterAll(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = ORIGINAL;
});

describe("withBasePath (no base path)", () => {
  let withBasePath: (p: string) => string;
  beforeEach(async () => {
    withBasePath = await loadWithBasePath(undefined);
  });

  it("returns absolute paths unchanged", () => {
    expect(withBasePath("/resume.pdf")).toBe("/resume.pdf");
  });

  it("prepends leading slash for relative paths", () => {
    expect(withBasePath("images/foo.png")).toBe("/images/foo.png");
  });

  it("leaves http URLs unchanged", () => {
    expect(withBasePath("http://example.com/x")).toBe("http://example.com/x");
  });

  it("leaves https URLs unchanged", () => {
    expect(withBasePath("https://example.com/x")).toBe("https://example.com/x");
  });

  it("leaves hash-only links unchanged", () => {
    expect(withBasePath("#hero")).toBe("#hero");
  });

  it("returns falsy input unchanged", () => {
    expect(withBasePath("")).toBe("");
  });
});

describe("withBasePath (with base path set)", () => {
  let withBasePath: (p: string) => string;
  beforeEach(async () => {
    withBasePath = await loadWithBasePath("/portfolio");
  });

  it("prepends the base path to absolute paths", () => {
    expect(withBasePath("/resume.pdf")).toBe("/portfolio/resume.pdf");
  });

  it("prepends base path to relative paths and normalizes slash", () => {
    expect(withBasePath("images/foo.png")).toBe("/portfolio/images/foo.png");
  });

  it("does not touch http(s) URLs even with base path set", () => {
    expect(withBasePath("https://example.com/x")).toBe("https://example.com/x");
  });

  it("does not touch hash-only links even with base path set", () => {
    expect(withBasePath("#hero")).toBe("#hero");
  });

  it("strips trailing slash on base path", async () => {
    const fn = await loadWithBasePath("/portfolio/");
    expect(fn("/x.png")).toBe("/portfolio/x.png");
  });
});
