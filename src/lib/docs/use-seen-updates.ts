import { useEffect, useState } from "react";
import { markSlugSeen, readSeenSlugs } from "@/lib/docs/updates";

/** Track which updated pages the user has opened (localStorage). */
export function useSeenUpdates(activeSlug?: string) {
  const [seen, setSeen] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setSeen(readSeenSlugs());
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("9router-docs-seen:")) setSeen(readSeenSlugs());
    };
    const onCustom = () => setSeen(readSeenSlugs());
    window.addEventListener("storage", onStorage);
    window.addEventListener("docs-update-seen", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("docs-update-seen", onCustom);
    };
  }, []);

  useEffect(() => {
    if (!activeSlug) return;
    markSlugSeen(activeSlug);
    setSeen(readSeenSlugs());
  }, [activeSlug]);

  return seen;
}
