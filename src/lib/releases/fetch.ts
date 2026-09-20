import { FALLBACK_RELEASES, FETCHED_AT_BUILD } from "./fallback";
import { toChangelog } from "./translate";
import type { ChangelogRelease, GithubRelease } from "./types";

const GITHUB_URL = "https://api.github.com/repos/decolua/9router/releases?per_page=10";
const TTL_MS = 2 * 60 * 1000;

const FALLBACK_BY_TAG = new Map(FALLBACK_RELEASES.map((r) => [r.tag_name, r]));

export type ReleasePayload = {
  releases: ChangelogRelease[];
  source: "live" | "cache";
  fetchedAt: string;
};

let cache: { at: number; payload: ReleasePayload } | null = null;

function mergeRelease(live: GithubRelease): GithubRelease {
  const cached = FALLBACK_BY_TAG.get(live.tag_name);
  if (!cached) return live;
  return { ...live, body: cached.body, name: cached.name };
}

export function fallbackPayload(): ReleasePayload {
  return {
    releases: FALLBACK_RELEASES.map((r) => toChangelog(r, "cache")),
    source: "cache",
    fetchedAt: FETCHED_AT_BUILD,
  };
}

export async function loadReleases(force = false): Promise<ReleasePayload> {
  if (!force && cache && Date.now() - cache.at < TTL_MS) return cache.payload;
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (typeof window === "undefined") {
      headers["User-Agent"] = "9router-zh-docs";
    }
    const res = await fetch(GITHUB_URL, { headers });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const json = (await res.json()) as GithubRelease[];
    const list = json
      .filter((r) => !r.draft)
      .slice(0, 10)
      .map((r) => mergeRelease(r));
    const payload: ReleasePayload = {
      releases: list.map((r) => toChangelog(r, "live")),
      source: "live",
      fetchedAt: new Date().toISOString(),
    };
    cache = { at: Date.now(), payload };
    return payload;
  } catch {
    if (cache) return cache.payload;
    return fallbackPayload();
  }
}

export function clearReleaseCache() {
  cache = null;
}
