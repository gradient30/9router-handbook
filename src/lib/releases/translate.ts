import type { ChangelogRelease, GithubRelease } from "./types";

const SECTION_HEADING: Record<string, string> = {
  features: "功能",
  feature: "功能",
  fixes: "修复",
  fix: "修复",
  improvements: "改进",
  improvement: "改进",
  docs: "文档",
  documentation: "文档",
  internal: "内部",
  breaking: "破坏性变更",
  security: "安全",
  performance: "性能",
  perf: "性能",
};

const TITLE_PREFIX: Array<[RegExp, string]> = [
  [/^feat:\s*/i, "新功能："],
  [/^fix:\s*/i, "修复："],
  [/^docs:\s*/i, "文档："],
  [/^chore:\s*/i, "杂项："],
  [/^perf:\s*/i, "性能："],
];

const KNOWN_TITLES: Record<string, string> = {
  "v0.5.35": "新功能：Grok Imagine 视频、Copilot Claude 路由、泰语/波斯语 i18n",
  "v0.5.20": "新功能：思考级别选择器，并在各提供商支持后缀",
  "v0.5.18": "缓存 Token 统计与提供商修复",
  "v0.5.12": "新功能：Token Saver 仪表盘、Venice AI、Blackbox 目录重做",
  "v0.5.8": "新功能：Antigravity 原生生图、CodeBuddy CN 认证",
  "v0.5.6": "新功能：Ponytail 代码生成、Headroom 代理、CodeBuddy CN",
  "v0.5.4": "修复：Kiro / Antigravity / 小米提供商、Fusion 工具历史、视觉模型",
  "v0.5.2": "新功能：Combo Fusion 与 Capacity 自动切换、Kiro API Key、Claude 自动唤醒",
  "v0.4.80": "新功能：Vercel AI Gateway、MiMo Free、Kiro 故障转移与安全修复",
  "v0.4.71": "修复：Codex 流式超时与 Responses 终结事件",
};

const PHRASE: Array<[RegExp, string]> = [
  [/\badd(?:ed|s)?\b/gi, "新增"],
  [/\bsupport(?:s|ed|ing)?\b/gi, "支持"],
  [/\bfix(?:es|ed|ing)?\b/gi, "修复"],
  [/\bprevent(?:s|ed|ing)?\b/gi, "避免"],
  [/\bpreserve(?:s|d)?\b/gi, "保留"],
  [/\benable(?:s|d)?\b/gi, "启用"],
  [/\bimprove(?:s|d|ments?)?\b/gi, "改进"],
  [/\bupdate(?:s|d)?\b/gi, "更新"],
  [/\bremove(?:s|d)?\b/gi, "移除"],
  [/\bstrip(?:s|ped)?\b/gi, "剥离"],
  [/\bnormalize(?:s|d)?\b/gi, "规范化"],
  [/\broute(?:s|d|ing)?\b/gi, "路由"],
  [/\btranslate(?:s|d|ion)?\b/gi, "翻译"],
  [/\bprovider(?:s)?\b/gi, "提供商"],
  [/\bdashboard\b/gi, "仪表盘"],
  [/\brelease notes\b/gi, "发布说明"],
  [/\bbreaking change(?:s)?\b/gi, "破坏性变更"],
  [/\bno longer\b/gi, "不再"],
  [/\bper request\b/gi, "按请求"],
  [/\bacross providers\b/gi, "跨提供商"],
  [/\blanguage support\b/gi, "语言支持"],
  [/\bvideo generation\b/gi, "视频生成"],
  [/\bimage generation\b/gi, "图像生成"],
  [/\bnative\b/gi, "原生"],
  [/\bquota\b/gi, "配额"],
  [/\bvisibility settings\b/gi, "可见性设置"],
  [/\bbulk[- ]add\b/gi, "批量添加"],
  [/\bbulk[- ]delete\b/gi, "批量删除"],
  [/\bAPI keys?\b/gi, "API 密钥"],
  [/\boverwrite existing keys\b/gi, "覆盖已有密钥"],
  [/\btranslations? \/ README\b/gi, "翻译 / README"],
  [/\btranslations?\b/gi, "翻译"],
  [/\bmodel family\b/gi, "模型系列"],
  [/\bmodel catalog\b/gi, "模型目录"],
  [/\bthinking level picker\b/gi, "思考级别选择器"],
  [/\bcached tokens?\b/gi, "缓存 Token"],
  [/\binput\/output\/cache cost\b/gi, "输入 / 输出 / 缓存费用"],
  [/\bnew models and capabilities\b/gi, "新模型与能力"],
  [/\bprovider support\b/gi, "提供商支持"],
  [/\bprovider fixes\b/gi, "提供商修复"],
  [/\bon startup\b/gi, "启动时"],
  [/\binactive background services\b/gi, "未启用的后台服务"],
  [/\bskip\b/gi, "跳过"],
  [/\bCLI tools\b/gi, "CLI 工具"],
  [/\bwrites\b/gi, "写入"],
  [/\bversion\b/gi, "版本"],
];

export function translateTitle(tag: string, name: string): string {
  if (KNOWN_TITLES[tag]) return KNOWN_TITLES[tag];
  let t = name.replace(new RegExp(`\\s*version\\s*${tag.replace(/^v/, "")}\\s*$`, "i"), "").trim();
  t = t.replace(new RegExp(`^${tag}:\\s*`, "i"), "");
  for (const [re, cn] of TITLE_PREFIX) {
    if (re.test(t)) {
      t = t.replace(re, cn);
      break;
    }
  }
  return t || tag;
}

function translateLine(line: string): string {
  if (/[\u4e00-\u9fff]/.test(line)) return line;
  let out = line;
  for (const [re, cn] of PHRASE) out = out.replace(re, cn);
  return out.replace(/\s{2,}/g, " ").trim();
}

export function parseAndTranslateBody(body: string): ChangelogRelease["sections"] {
  const lines = (body || "").replace(/\r\n/g, "\n").split("\n");
  const sections: ChangelogRelease["sections"] = [];
  let current: ChangelogRelease["sections"][number] | null = null;

  const flushHeading = (raw: string) => {
    const key = raw.replace(/[:：]\s*$/, "").trim().toLowerCase();
    const heading = SECTION_HEADING[key] ?? raw.replace(/[:：]\s*$/, "").trim();
    current = { heading, items: [] };
    sections.push(current);
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const headingMatch = /^(?:#{1,3}\s*)?([A-Za-z][A-Za-z /-]+)\s*[:：]?\s*$/.exec(line);
    if (headingMatch && SECTION_HEADING[headingMatch[1].trim().toLowerCase()]) {
      flushHeading(headingMatch[1]);
      continue;
    }
    if (/^(Features|Fixes|Improvements|Docs|Internal|Breaking|Security|Performance)[:：]?\s*$/i.test(line)) {
      flushHeading(line);
      continue;
    }
    const item = line.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, "");
    if (!current) {
      current = { heading: "说明", items: [] };
      sections.push(current);
    }
    current.items.push(translateLine(item));
  }

  return sections.filter((s) => s.items.length > 0 || s.heading !== "说明");
}

export function toChangelog(release: GithubRelease, source: "live" | "cache"): ChangelogRelease {
  return {
    tag: release.tag_name,
    title: translateTitle(release.tag_name, release.name || release.tag_name),
    publishedAt: release.published_at,
    htmlUrl: release.html_url,
    prerelease: Boolean(release.prerelease),
    sections: parseAndTranslateBody(release.body || ""),
    source,
  };
}
