import { Command } from "cmdk";
import { FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { searchDocs } from "@/lib/docs/catalog";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const hits = searchDocs(query);
  const changelogHit =
    Boolean(query) &&
    (query.includes("更新") ||
      query.toLowerCase().includes("log") ||
      query.toLowerCase().includes("release") ||
      "更新日志".includes(query))
      ? [{ href: "/changelog", title: "更新日志", group: "发布", snippet: "从 GitHub 同步最近 10 次发布" }]
      : [];

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (href: string) => {
    onOpenChange(false);
    void navigate({ to: href as never });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-bg/70"
        aria-label="关闭搜索"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative mx-auto mt-[12vh] w-[min(40rem,calc(100%-1.5rem))] overflow-hidden rounded-2xl bg-elevated shadow-[var(--shadow-border-hover)]">
        <Command label="搜索文档" shouldFilter={false} className="bg-transparent">
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="size-4 text-faint" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="搜索手册、功能、提供商…"
              className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
            />
            <kbd className="hidden rounded-md bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-faint sm:inline">ESC</kbd>
          </div>
          <Command.List className="max-h-[min(24rem,50vh)] overflow-y-auto p-2">
            {query && hits.length === 0 && changelogHit.length === 0 ? (
              <Command.Empty className="px-3 py-8 text-center text-sm text-faint">没有匹配的文档</Command.Empty>
            ) : null}
            {!query ? (
              <p className="px-3 py-6 text-center text-sm text-faint">输入关键词，例如「Docker」或「Claude Code」</p>
            ) : null}
            {[...changelogHit, ...hits].map((hit) => (
              <Command.Item
                key={hit.href}
                value={hit.href}
                onSelect={() => go(hit.href)}
                className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 data-[selected=true]:bg-subtle"
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-faint" />
                <span>
                  <span className="block text-sm text-fg">{hit.title}</span>
                  <span className="mt-0.5 block text-xs text-faint">
                    {hit.group} · {hit.snippet}
                  </span>
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
