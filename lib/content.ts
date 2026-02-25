import content from "../public/content.json";

export type SiteContent = typeof content;

export async function getContent(): Promise<SiteContent> {
  // For now this is a simple in-memory import.
  // If you ever need true runtime loading, this can be
  // replaced with a fetch or filesystem read on the server.
  return content;
}

