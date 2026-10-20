/** Current docs sync release — bump `id` when shipping the next sync so badges reset. */
export const DOCS_UPDATE = {
  id: "2026-10-sync",
  label: "本次更新",
} as const;

const STORAGE_KEY = `9router-docs-seen:${DOCS_UPDATE.id}`;

export function readSeenSlugs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((s): s is string => typeof s === "string"));
  } catch {
    return new Set();
  }
}

export function markSlugSeen(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const next = readSeenSlugs();
    if (next.has(slug)) return;
    next.add(slug);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    window.dispatchEvent(new CustomEvent("docs-update-seen", { detail: { slug } }));
  } catch {
    /* ignore quota / private mode */
  }
}

export function isSlugSeen(slug: string, seen: Set<string>): boolean {
  return seen.has(slug);
}
