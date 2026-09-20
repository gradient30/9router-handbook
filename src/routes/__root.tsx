import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "9Router 中文手册";
const BASE = import.meta.env.BASE_URL || "/";
const IS_PAGES = BASE !== "/";

const THEME_BOOT = `(function(){try{var t=localStorage.getItem("9router-handbook-theme");if(t!=="light"&&t!=="dark"&&t!=="color")t="dark";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: "9Router 开源 AI 路由网关的中文使用手册与更新日志，发布记录实时同步 GitHub 最近 10 次版本。" },
      { name: "theme-color", content: "#0c0e12" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: `${BASE}favicon.svg` },
      { rel: "stylesheet", href: appCss },
      ...(IS_PAGES
        ? []
        : [
            { rel: "manifest" as const, href: "/__grok/manifest.webmanifest" },
            { rel: "apple-touch-icon" as const, href: "/__grok/icon-180.png" },
          ]),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="zh-CN" className="antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
