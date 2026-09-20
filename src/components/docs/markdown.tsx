import { marked, type Token, type Tokens } from "marked";
import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { rewriteDocHref } from "@/lib/docs/catalog";
import { cn } from "@/lib/cn";

export type TocItem = { id: string; text: string; depth: number };

function slugify(text: string, used: Map<string, number>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff\- ]+/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section";
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n === 0 ? base : `${base}-${n}`;
}

function extractText(token: Token | Token[]): string {
  if (Array.isArray(token)) return token.map(extractText).join("");
  if ("text" in token && typeof token.text === "string" && !("tokens" in token)) return token.text;
  if ("tokens" in token && Array.isArray(token.tokens)) return extractText(token.tokens as Token[]);
  if ("items" in token && Array.isArray((token as Tokens.List).items)) {
    return (token as Tokens.List).items.map((i) => extractText(i as Token)).join("");
  }
  return "raw" in token && typeof token.raw === "string" ? token.raw : "";
}

function Inline({ tokens }: { tokens?: Token[] }) {
  if (!tokens) return null;
  return (
    <>
      {tokens.map((t, i) => {
        switch (t.type) {
          case "strong":
            return (
              <strong key={i} className="font-medium text-fg">
                <Inline tokens={(t as Tokens.Strong).tokens} />
              </strong>
            );
          case "em":
            return (
              <em key={i}>
                <Inline tokens={(t as Tokens.Em).tokens} />
              </em>
            );
          case "codespan":
            return (
              <code key={i} className="rounded-sm bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
                {(t as Tokens.Codespan).text}
              </code>
            );
          case "link": {
            const href = rewriteDocHref((t as Tokens.Link).href);
            const inner = <Inline tokens={(t as Tokens.Link).tokens} />;
            if (href.startsWith("http") || href.startsWith("mailto:")) {
              return (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link underline decoration-border underline-offset-4 hover:text-fg"
                >
                  {inner}
                </a>
              );
            }
            if (href.startsWith("#")) {
              return (
                <a key={i} href={href} className="text-link underline decoration-border underline-offset-4 hover:text-fg">
                  {inner}
                </a>
              );
            }
            return (
              <Link
                key={i}
                to={href as never}
                className="text-link underline decoration-border underline-offset-4 hover:text-fg"
              >
                {inner}
              </Link>
            );
          }
          case "br":
            return <br key={i} />;
          case "del":
            return (
              <del key={i}>
                <Inline tokens={(t as Tokens.Del).tokens} />
              </del>
            );
          case "text":
            return <span key={i}>{(t as Tokens.Text).text}</span>;
          case "escape":
            return <span key={i}>{(t as Tokens.Escape).text}</span>;
          default:
            return <span key={i}>{extractText(t)}</span>;
        }
      })}
    </>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-fg"
      aria-label={copied ? "已复制" : "复制代码"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* ignore */
        }
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}

function Block({ tokens }: { tokens: Token[] }) {
  const nodes: ReactNode[] = [];

  tokens.forEach((token, i) => {
    switch (token.type) {
      case "heading": {
        const h = token as Tokens.Heading & { id?: string };
        const id = h.id ?? slugify(extractText(h.tokens ?? []), new Map());
        const Tag = (`h${Math.min(h.depth, 4)}` as unknown) as "h2";
        const sizes: Record<number, string> = {
          1: "mt-2 text-3xl font-medium tracking-tight text-fg md:text-4xl",
          2: "mt-10 text-xl font-medium tracking-tight text-fg",
          3: "mt-8 text-lg font-medium text-fg",
          4: "mt-6 text-base font-medium text-fg",
        };
        nodes.push(
          <Tag key={i} id={id} className={cn("scroll-mt-24 text-balance", sizes[h.depth] ?? sizes[4])}>
            <Inline tokens={h.tokens} />
          </Tag>,
        );
        break;
      }
      case "paragraph": {
        const p = token as Tokens.Paragraph;
        nodes.push(
          <p key={i} className="mt-4 text-pretty text-[0.975rem] leading-7 text-muted">
            <Inline tokens={p.tokens} />
          </p>,
        );
        break;
      }
      case "list": {
        const list = token as Tokens.List;
        const Tag = list.ordered ? "ol" : "ul";
        nodes.push(
          <Tag
            key={i}
            className={cn(
              "mt-4 space-y-2 pl-5 text-[0.975rem] leading-7 text-muted",
              list.ordered ? "list-decimal" : "list-disc",
            )}
          >
            {list.items.map((item, j) => (
              <li key={j} className="pl-1">
                {item.tokens.map((child, k) => {
                  if (child.type === "list") {
                    return <Block key={k} tokens={[child]} />;
                  }
                  if (child.type === "paragraph" || child.type === "text") {
                    const toks =
                      "tokens" in child && Array.isArray(child.tokens)
                        ? (child.tokens as Token[])
                        : [child];
                    return (
                      <span key={k}>
                        <Inline tokens={toks} />
                      </span>
                    );
                  }
                  return (
                    <span key={k}>
                      <Inline tokens={[child]} />
                    </span>
                  );
                })}
              </li>
            ))}
          </Tag>,
        );
        break;
      }
      case "code": {
        const c = token as Tokens.Code;
        nodes.push(
          <div key={i} className="relative mt-5 overflow-hidden rounded-xl bg-bg shadow-[var(--shadow-border)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">
                {c.lang || "code"}
              </span>
            </div>
            <CopyButton code={c.text} />
            <pre className="overflow-x-auto p-4 pt-3 text-[13px] leading-6">
              <code className="font-mono text-fg/90">{c.text}</code>
            </pre>
          </div>,
        );
        break;
      }
      case "table": {
        const table = token as Tokens.Table;
        nodes.push(
          <div key={i} className="mt-5 overflow-x-auto rounded-xl shadow-[var(--shadow-border)]">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-subtle text-fg">
                <tr>
                  {table.header.map((cell, j) => (
                    <th key={j} className="px-4 py-2.5 font-medium">
                      <Inline tokens={cell.tokens} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, r) => (
                  <tr key={r} className="border-t border-border text-muted">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2.5 align-top">
                        <Inline tokens={cell.tokens} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        break;
      }
      case "blockquote": {
        const q = token as Tokens.Blockquote;
        nodes.push(
          <blockquote
            key={i}
            className="mt-5 border-l-2 border-fg/25 pl-4 text-muted"
          >
            <Block tokens={q.tokens} />
          </blockquote>,
        );
        break;
      }
      case "hr":
        nodes.push(<hr key={i} className="my-10 border-border" />);
        break;
      case "html": {
        const raw = (token as Tokens.HTML).text.replace(/<[^>]+>/g, " ").trim();
        if (raw) {
          nodes.push(
            <p key={i} className="mt-4 text-sm text-faint">
              {raw}
            </p>,
          );
        }
        break;
      }
      case "space":
        break;
      default:
        break;
    }
  });

  return <>{nodes}</>;
}

export function useDocModel(markdown: string) {
  return useMemo(() => {
    const cleaned = markdown.replace(/<div[\s\S]*?<\/div>/gi, (block) =>
      block.replace(/<[^>]+>/g, " ").trim(),
    );
    const tokens = marked.lexer(cleaned);
    const slugs = new Map<string, number>();
    const toc: TocItem[] = [];
    for (const token of tokens) {
      if (token.type === "heading") {
        const h = token as Tokens.Heading & { id?: string };
        const text = extractText(h.tokens ?? []);
        h.id = slugify(text, slugs);
        if (h.depth > 1) toc.push({ id: h.id, text, depth: h.depth });
      }
    }
    return { tokens, toc };
  }, [markdown]);
}

export function MarkdownView({ markdown }: { markdown: string }) {
  const { tokens } = useDocModel(markdown);
  return (
    <div className="doc-prose max-w-3xl pb-16">
      <Block tokens={tokens} />
    </div>
  );
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]?.target.id) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <nav aria-label="本页目录" className="sticky top-24 hidden w-56 shrink-0 xl:block">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">本页目录</p>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-0.5 text-[13px] leading-5 transition-colors",
                item.depth > 2 ? "pl-5" : "pl-3",
                active === item.id
                  ? "-ml-px border-fg text-fg"
                  : "border-transparent text-faint hover:text-muted",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
