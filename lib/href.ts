/** True if the href is an absolute http(s) URL. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
