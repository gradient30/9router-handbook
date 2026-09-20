import { Link, useRouterState } from "@tanstack/react-router";
import { Github, Menu, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { RouterMark } from "@/components/brand/mark";
import { SearchDialog } from "@/components/docs/search";
import { ThemeSwitch } from "@/components/docs/theme-switch";
import { Button } from "@/components/ui/button";
import { NAV_GROUPS } from "@/lib/docs/catalog";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="space-y-6" aria-label="文档导航">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href as never}
                    onClick={onNavigate}
                    className={cn(
                      "flex min-h-9 items-center rounded-lg px-2.5 text-sm transition-colors",
                      active ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/70 hover:text-fg",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div>
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">发布</p>
        <Link
          to="/changelog"
          onClick={onNavigate}
          className={cn(
            "flex min-h-9 items-center rounded-lg px-2.5 text-sm transition-colors",
            pathname === "/changelog" ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/70 hover:text-fg",
          )}
        >
          更新日志
        </Link>
      </div>
    </nav>
  );
}

export function DocsShell({ children, toc }: { children: ReactNode; toc?: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="docs-header sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[88rem] items-center gap-2 px-3 sm:gap-3 sm:px-6">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-fg md:hidden"
            aria-label={menuOpen ? "关闭目录" : "打开目录"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <RouterMark />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="text-[15px] font-medium tracking-tight">9Router</span>
              <span className="mt-0.5 text-[11px] text-faint">中文手册</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-2 hidden h-9 min-w-[14rem] items-center gap-2 rounded-lg bg-elevated px-3 text-left text-sm text-faint shadow-[var(--shadow-border)] hover:text-muted lg:flex"
          >
            <Search className="size-3.5" />
            搜索文档…
            <kbd className="ml-auto rounded-md bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-faint">⌘K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="搜索"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
            </Button>
            <Link
              to="/changelog"
              className={cn(
                "hidden h-9 items-center rounded-lg px-3 text-sm md:inline-flex",
                pathname === "/changelog" ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              更新日志
            </Link>
            <a
              href="https://9router.com"
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center rounded-lg px-3 text-sm text-muted hover:text-fg xl:inline-flex"
            >
              官网
            </a>
            <ThemeSwitch />
            <a
              href="https://github.com/decolua/9router"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 仓库"
              className="inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-fg"
            >
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-30 md:hidden">
          <button type="button" className="absolute inset-0 bg-bg/70" aria-label="关闭" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] overflow-y-auto bg-elevated px-4 pb-10 pt-16 shadow-[var(--shadow-border)]">
            <SidebarNav onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-[88rem] gap-8 px-4 sm:px-6">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 pr-2 md:block">
          <SidebarNav />
        </aside>
        <div className="flex min-w-0 flex-1 gap-10 py-8">
          <div className="min-w-0 flex-1">{children}</div>
          {toc}
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-4 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>内容整理自 9Router 官方 GitBook 与仓库文档，全文中文。</p>
          <p>
            更新日志实时同步{" "}
            <a
              className="text-muted hover:text-fg"
              href="https://github.com/decolua/9router/releases"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Releases
            </a>{" "}
            最近 10 次发布
          </p>
        </div>
      </footer>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
