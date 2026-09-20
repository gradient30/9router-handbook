# 9Router 中文手册

[9Router](https://9router.com) 开源 AI 路由网关的中文使用手册，内容整理自官方 GitBook 与仓库文档，更新日志同步 GitHub 最近 10 次发布。

**在线阅读：** [https://gradient30.github.io/9router-handbook/](https://gradient30.github.io/9router-handbook/)

- 官方产品：[9router.com](https://9router.com) · 源码：[decolua/9router](https://github.com/decolua/9router)
- 本仓库：**非官方**中文阅读站点，不替代官方文档
- 发布：GitHub Pages（`main` 推送后自动构建；工作流 `.github/workflows/pages.yml`）
- 风格：顶栏 **明 / 暗 / 彩** 三套，切换结果保存在浏览器本地

## 首次启用 Pages（一次性）

仓库刚创建时需要在 GitHub 勾选发布源，之后每次推送都会自动更新：

1. 打开 [Settings → Pages](https://github.com/gradient30/9router-handbook/settings/pages)
2. Build and deployment → Source 选择 **GitHub Actions**
3. 到 [Actions](https://github.com/gradient30/9router-handbook/actions) 把最近一次 *Deploy GitHub Pages* 点 **Re-run jobs**

## 内容

| 部分 | 说明 |
| --- | --- |
| 概览与入门 | 安装、快速开始、本地 / Docker / 云端部署 |
| 功能特性 | 智能三层回退、配额跟踪、Combo、Token Saver |
| 提供商 | 订阅、低价、免费回退 |
| 工具接入 | Cursor、Claude Code、Codex、Cline、Continue、Roo 等 |
| 参考 | API、环境变量、架构、FAQ、排障 |
| 更新日志 | 打开时从 GitHub Releases 拉取最近 10 次发布并汉化 |

## 本地运行

```bash
npm install
npm run dev
```

GitHub Pages 静态构建：

```bash
npm run build:pages
```

产物在 `.output/public`。

## 技术栈

TanStack Start + Vite + Tailwind v4。正文是 `src/lib/docs/md/**/*.md`，由 `src/lib/docs/catalog.ts` 建目录。

## 许可与归属

9Router 是开源项目。本仓库仅提供中文阅读与日常速查，不替代官方文档。
