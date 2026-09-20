import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { DocsShell } from "@/components/docs/shell";
import { MarkdownView, TableOfContents, useDocModel } from "@/components/docs/markdown";
import { DocPager } from "@/components/docs/pager";
import { getPageBySlug } from "@/lib/docs/catalog";

export const Route = createFileRoute("/docs/$")({
  beforeLoad: ({ params }) => {
    if (params._splat === "overview" || params._splat === "index") {
      throw redirect({ to: "/" });
    }
  },
  head: ({ params }) => {
    const page = getPageBySlug(params._splat);
    return {
      meta: [
        { title: page ? `${page.title} · 9Router 中文手册` : "未找到 · 9Router 中文手册" },
        { name: "description", content: page?.description ?? "文档页面不存在" },
      ],
    };
  },
  component: DocPage,
});

function DocPage() {
  const { _splat } = Route.useParams();
  const page = getPageBySlug(_splat);
  if (!page) {
    return (
      <DocsShell>
        <div className="max-w-lg py-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">404</p>
          <h1 className="mt-3 text-2xl font-medium">没有这篇文档</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            路径 {_splat} 不在手册目录中。可以从概览或搜索重新开始。
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            回到概览
          </Link>
        </div>
      </DocsShell>
    );
  }
  return <Article page={page} />;
}

function Article({ page }: { page: NonNullable<ReturnType<typeof getPageBySlug>> }) {
  const { toc } = useDocModel(page.markdown);
  return (
    <DocsShell toc={<TableOfContents items={toc} />}>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">{page.group}</p>
      <MarkdownView markdown={page.markdown} />
      <DocPager slug={page.slug} />
    </DocsShell>
  );
}
