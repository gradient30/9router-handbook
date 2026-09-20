import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DocsShell } from "@/components/docs/shell";
import { MarkdownView, TableOfContents, useDocModel } from "@/components/docs/markdown";
import { DocPager } from "@/components/docs/pager";
import { getPageBySlug } from "@/lib/docs/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "9Router 中文手册" },
      {
        name: "description",
        content: "9Router 开源 AI 路由网关中文使用手册：安装、智能回退、提供商、工具接入与 API。",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const page = getPageBySlug("overview")!;
  const body = page.markdown.replace(/^# .+\n+/, "");
  const { toc } = useDocModel(body);
  return (
    <DocsShell toc={<TableOfContents items={toc} />}>
      <div className="mb-8 max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">开源 AI 路由网关</p>
        <h1 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
          把所有编码工具接到一个端点
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-[0.975rem] leading-7 text-muted">
          9Router 将 Claude Code、Cursor、Codex、Cline 等工具连接到 60+ 提供商。订阅用尽时自动回退到低价与免费模型，并压缩 Token。本站是完整中文手册，更新日志同步 GitHub 最近 10 次发布。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/docs/$"
            params={{ _splat: "getting-started/quick-start" }}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            快速开始
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/changelog"
            className="inline-flex h-11 items-center rounded-lg px-4 text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
          >
            查看更新日志
          </Link>
        </div>
      </div>
      <MarkdownView markdown={body} />
      <DocPager slug={page.slug} />
    </DocsShell>
  );
}
