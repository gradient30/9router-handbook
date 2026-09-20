import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { adjacentPages } from "@/lib/docs/catalog";

export function DocPager({ slug }: { slug: string }) {
  const { prev, next } = adjacentPages(slug);
  if (!prev && !next) return null;
  return (
    <div className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={prev.href as never}
          className="group flex min-h-16 flex-col justify-center rounded-xl px-4 py-3 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
        >
          <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-faint">
            <ArrowLeft className="size-3" />
            上一篇
          </span>
          <span className="mt-1 text-sm text-fg group-hover:text-fg">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.href as never}
          className="group flex min-h-16 flex-col items-end justify-center rounded-xl px-4 py-3 text-right shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
        >
          <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-faint">
            下一篇
            <ArrowRight className="size-3" />
          </span>
          <span className="mt-1 text-sm text-fg">{next.title}</span>
        </Link>
      ) : null}
    </div>
  );
}
