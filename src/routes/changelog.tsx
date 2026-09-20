import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { DocsShell } from "@/components/docs/shell";
import { Button } from "@/components/ui/button";
import { fallbackPayload, loadReleases } from "@/lib/releases/fetch";
import type { ChangelogRelease } from "@/lib/releases/types";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "更新日志 · 9Router 中文手册" },
      { name: "description", content: "9Router 最近 10 次 GitHub 发布记录，实时同步并全文中文。" },
    ],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  const [data, setData] = useState(fallbackPayload);
  const [busy, setBusy] = useState(true);

  const sync = async (force = false) => {
    setBusy(true);
    try {
      const next = await loadReleases(force);
      setData(next);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    void sync(false);
  }, []);

  return (
    <DocsShell>
      <div className="max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">发布</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">更新日志</h1>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-muted">
              从 GitHub 仓库实时拉取最近 10 次正式发布，分类标题与说明已汉化。新版本出现后刷新即可看到。
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => void sync(true)} disabled={busy}>
            <RefreshCw className={`size-3.5 ${busy ? "animate-spin" : ""}`} />
            {busy ? "同步中" : "立即同步"}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-faint">
          <span className="rounded-full bg-subtle px-2.5 py-1 text-muted">
            {data.source === "live" ? "已连接 GitHub" : "使用本地缓存"}
          </span>
          <span suppressHydrationWarning>
            同步于{" "}
            {formatDistanceToNow(new Date(data.fetchedAt), { addSuffix: true, locale: zhCN })}
          </span>
          <span>{data.releases.length} 个版本</span>
        </div>

        <ol className="relative mt-10 space-y-10 border-l border-border pl-6">
          {data.releases.map((release, index) => (
            <ReleaseCard key={release.tag} release={release} latest={index === 0} />
          ))}
        </ol>
      </div>
    </DocsShell>
  );
}

function ReleaseCard({ release, latest }: { release: ChangelogRelease; latest: boolean }) {
  const date = new Date(release.publishedAt);
  const dateLabel = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <li className="relative">
      <span className="absolute -left-[1.6875rem] top-1.5 size-2.5 rounded-full bg-fg" />
      <article className="rounded-2xl bg-elevated p-5 shadow-[var(--shadow-border)]">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={release.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-fg hover:text-link"
          >
            {release.tag}
          </a>
          {latest ? (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-fg">最新</span>
          ) : null}
          {release.prerelease ? (
            <span className="rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">预发布</span>
          ) : null}
        </div>
        <h2 className="mt-2 text-lg font-medium leading-snug text-fg">{release.title}</h2>
        <p className="mt-1 text-xs text-faint">{dateLabel}</p>
        <div className="mt-5 space-y-5">
          {release.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{section.heading}</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-muted">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <a
          href={release.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-xs text-faint hover:text-fg"
        >
          在 GitHub 查看
          <ExternalLink className="size-3" />
        </a>
      </article>
    </li>
  );
}
