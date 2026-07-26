import content from "../public/content.json";
import type { SiteContent } from "./content-types";

export type { SiteContent } from "./content-types";

// Single boundary cast: the raw JSON literal type is widened/narrowed here so
// downstream consumers get the shared, well-typed SiteContent surface.
const typedContent = content as unknown as SiteContent;

export async function getContent(): Promise<SiteContent> {
  return typedContent;
}
