import overview from "./md/index.md?raw";
import quickStart from "./md/getting-started/quick-start.md?raw";
import installation from "./md/getting-started/installation.md?raw";
import localhost from "./md/deployment/localhost.md?raw";
import docker from "./md/deployment/docker.md?raw";
import cloud from "./md/deployment/cloud.md?raw";
import smartRouting from "./md/features/smart-routing.md?raw";
import combos from "./md/features/combos.md?raw";
import quota from "./md/features/quota-tracking.md?raw";
import tokenSaver from "./md/features/token-saver.md?raw";
import subProviders from "./md/providers/subscription.md?raw";
import cheapProviders from "./md/providers/cheap.md?raw";
import freeProviders from "./md/providers/free.md?raw";
import claudeCode from "./md/integration/claude-code.md?raw";
import cursor from "./md/integration/cursor.md?raw";
import codex from "./md/integration/codex.md?raw";
import cline from "./md/integration/cline.md?raw";
import continueTool from "./md/integration/continue.md?raw";
import roo from "./md/integration/roo.md?raw";
import otherTools from "./md/integration/other-tools.md?raw";
import api from "./md/reference/api.md?raw";
import env from "./md/reference/env.md?raw";
import architecture from "./md/architecture.md?raw";
import faq from "./md/faq.md?raw";
import troubleshooting from "./md/troubleshooting.md?raw";

export type DocPage = {
  slug: string;
  href: string;
  title: string;
  description: string;
  group: string;
  markdown: string;
};

export type NavGroup = {
  title: string;
  items: { title: string; href: string; slug: string }[];
};

export const PAGES: DocPage[] = [
  {
    slug: "overview",
    href: "/",
    title: "概览",
    description: "9Router 是什么，以及它如何帮你把订阅用尽、把成本压低。",
    group: "开始",
    markdown: overview,
  },
  {
    slug: "getting-started/quick-start",
    href: "/docs/getting-started/quick-start",
    title: "快速开始",
    description: "五分钟安装、启动并接上第一个提供商。",
    group: "开始",
    markdown: quickStart,
  },
  {
    slug: "getting-started/installation",
    href: "/docs/getting-started/installation",
    title: "安装",
    description: "npm、npx、源码与系统要求。",
    group: "开始",
    markdown: installation,
  },
  {
    slug: "deployment/localhost",
    href: "/docs/deployment/localhost",
    title: "本地运行",
    description: "在本机启动仪表盘与 /v1 端点。",
    group: "部署",
    markdown: localhost,
  },
  {
    slug: "deployment/docker",
    href: "/docs/deployment/docker",
    title: "Docker",
    description: "官方多架构镜像、数据卷与升级。",
    group: "部署",
    markdown: docker,
  },
  {
    slug: "deployment/cloud",
    href: "/docs/deployment/cloud",
    title: "云端 / VPS",
    description: "VPS、PM2 与远程访问。",
    group: "部署",
    markdown: cloud,
  },
  {
    slug: "features/smart-routing",
    href: "/docs/features/smart-routing",
    title: "智能路由",
    description: "订阅 → 低价 → 免费的三层自动回退。",
    group: "功能",
    markdown: smartRouting,
  },
  {
    slug: "features/combos",
    href: "/docs/features/combos",
    title: "模型组合",
    description: "回退、轮询、Fusion 与 Capacity 策略。",
    group: "功能",
    markdown: combos,
  },
  {
    slug: "features/quota-tracking",
    href: "/docs/features/quota-tracking",
    title: "配额跟踪",
    description: "实时用量、重置倒计时与成本估算。",
    group: "功能",
    markdown: quota,
  },
  {
    slug: "features/token-saver",
    href: "/docs/features/token-saver",
    title: "Token 节省",
    description: "RTK 压缩 tool_result，节省 20–40% 输入。",
    group: "功能",
    markdown: tokenSaver,
  },
  {
    slug: "providers/subscription",
    href: "/docs/providers/subscription",
    title: "订阅型提供商",
    description: "Claude Code、Codex、Gemini、Copilot、Antigravity。",
    group: "提供商",
    markdown: subProviders,
  },
  {
    slug: "providers/cheap",
    href: "/docs/providers/cheap",
    title: "低价提供商",
    description: "GLM、MiniMax、Kimi 等超低价备用。",
    group: "提供商",
    markdown: cheapProviders,
  },
  {
    slug: "providers/free",
    href: "/docs/providers/free",
    title: "免费提供商",
    description: "Kiro、iFlow、Qwen、OpenCode 等零成本回退。",
    group: "提供商",
    markdown: freeProviders,
  },
  {
    slug: "integration/claude-code",
    href: "/docs/integration/claude-code",
    title: "Claude Code",
    description: "把 ANTHROPIC_BASE_URL 指到 9Router。",
    group: "工具接入",
    markdown: claudeCode,
  },
  {
    slug: "integration/cursor",
    href: "/docs/integration/cursor",
    title: "Cursor",
    description: "在 Cursor 中使用自定义 OpenAI 端点。",
    group: "工具接入",
    markdown: cursor,
  },
  {
    slug: "integration/codex",
    href: "/docs/integration/codex",
    title: "Codex",
    description: "OpenAI Codex CLI 接入。",
    group: "工具接入",
    markdown: codex,
  },
  {
    slug: "integration/cline",
    href: "/docs/integration/cline",
    title: "Cline",
    description: "VS Code Cline 扩展接入。",
    group: "工具接入",
    markdown: cline,
  },
  {
    slug: "integration/continue",
    href: "/docs/integration/continue",
    title: "Continue",
    description: "Continue 扩展接入。",
    group: "工具接入",
    markdown: continueTool,
  },
  {
    slug: "integration/roo",
    href: "/docs/integration/roo",
    title: "Roo",
    description: "Roo Code 接入。",
    group: "工具接入",
    markdown: roo,
  },
  {
    slug: "integration/other-tools",
    href: "/docs/integration/other-tools",
    title: "其他工具",
    description: "OpenClaw、Copilot、OpenCode、Grok Build 等。",
    group: "工具接入",
    markdown: otherTools,
  },
  {
    slug: "reference/api",
    href: "/docs/reference/api",
    title: "API 参考",
    description: "OpenAI / Claude / Gemini 兼容端点。",
    group: "参考",
    markdown: api,
  },
  {
    slug: "reference/env",
    href: "/docs/reference/env",
    title: "环境变量",
    description: "端口、存储、认证与云同步配置。",
    group: "参考",
    markdown: env,
  },
  {
    slug: "architecture",
    href: "/docs/architecture",
    title: "架构",
    description: "本地网关、翻译核心与数据流。",
    group: "参考",
    markdown: architecture,
  },
  {
    slug: "faq",
    href: "/docs/faq",
    title: "常见问题",
    description: "价格、安全、配额与云同步问答。",
    group: "参考",
    markdown: faq,
  },
  {
    slug: "troubleshooting",
    href: "/docs/troubleshooting",
    title: "故障排除",
    description: "空响应、限流、OAuth 与端口问题。",
    group: "参考",
    markdown: troubleshooting,
  },
];

const GROUP_ORDER = ["开始", "部署", "功能", "提供商", "工具接入", "参考"];

export const NAV_GROUPS: NavGroup[] = GROUP_ORDER.map((title) => ({
  title,
  items: PAGES.filter((p) => p.group === title).map((p) => ({
    title: p.title,
    href: p.href,
    slug: p.slug,
  })),
}));

export function getPageBySlug(slug: string | undefined): DocPage | undefined {
  if (!slug || slug === "overview" || slug === "index") return PAGES[0];
  return PAGES.find((p) => p.slug === slug);
}

export function getPageByHref(href: string): DocPage | undefined {
  const clean = href.replace(/\/$/, "") || "/";
  return PAGES.find((p) => p.href === clean);
}

export function adjacentPages(slug: string) {
  const i = PAGES.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? PAGES[i - 1] : undefined,
    next: i >= 0 && i < PAGES.length - 1 ? PAGES[i + 1] : undefined,
  };
}

const FILE_TO_HREF: Record<string, string> = {
  "getting-started.md": "/docs/getting-started/quick-start",
  "getting-started/quick-start.md": "/docs/getting-started/quick-start",
  "getting-started/installation.md": "/docs/getting-started/installation",
  "installation.md": "/docs/getting-started/installation",
  "faq.md": "/docs/faq",
  "troubleshooting.md": "/docs/troubleshooting",
  "features/": "/docs/features/smart-routing",
  "features/smart-routing.md": "/docs/features/smart-routing",
  "features/combos.md": "/docs/features/combos",
  "features/quota-tracking.md": "/docs/features/quota-tracking",
  "deployment/localhost.md": "/docs/deployment/localhost",
  "deployment/cloud.md": "/docs/deployment/cloud",
  "deployment/docker.md": "/docs/deployment/docker",
};

export function rewriteDocHref(raw: string): string {
  if (!raw) return raw;
  if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("mailto:")) {
    return raw;
  }
  if (raw.startsWith("#") || raw.startsWith("/")) return raw;
  const [path, hash] = raw.split("#");
  const cleaned = path.replace(/^\.\//, "").replace(/^\.\.\//, "");
  const mapped = FILE_TO_HREF[cleaned] ?? FILE_TO_HREF[cleaned.replace(/^\//, "")];
  const href = mapped ?? (cleaned.endsWith(".md") ? `/docs/${cleaned.replace(/\.md$/, "")}` : raw);
  return hash ? `${href}#${hash}` : href;
}

export type SearchHit = {
  href: string;
  title: string;
  group: string;
  snippet: string;
};

function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchDocs(query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: (SearchHit & { score: number })[] = [];
  for (const page of PAGES) {
    const title = page.title.toLowerCase();
    const desc = page.description.toLowerCase();
    const body = plainText(page.markdown).toLowerCase();
    let score = 0;
    if (title === q) score += 80;
    else if (title.includes(q)) score += 50;
    if (desc.includes(q)) score += 20;
    const idx = body.indexOf(q);
    if (idx >= 0) score += 10;
    if (score === 0) continue;
    let snippet = page.description;
    if (idx >= 0) {
      const start = Math.max(0, idx - 24);
      snippet = `${start > 0 ? "…" : ""}${plainText(page.markdown).slice(start, start + 90)}${idx + q.length < body.length ? "…" : ""}`;
    }
    hits.push({ href: page.href, title: page.title, group: page.group, snippet, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
