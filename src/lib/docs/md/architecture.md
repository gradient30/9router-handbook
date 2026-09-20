# 架构概览

9Router 是一个本地运行的 AI 路由网关与控制面板，基于 Next.js 构建。它对外提供单一的 OpenAI 兼容端点（`/v1/*`），在多个上游提供商之间完成协议翻译、回退、Token 刷新与用量统计。

---

## 核心能力

- 面向 CLI / IDE 的 OpenAI 兼容 API
- 跨提供商请求 / 响应格式翻译（OpenAI ↔ Claude ↔ Gemini 等）
- 模型组合回退（多模型序列）
- 同一提供商的多账号回退与轮询
- OAuth + API Key 连接管理
- 本地持久化：提供商、密钥、别名、组合、设置、价格
- 用量 / 成本跟踪与请求日志
- 可选云同步，用于多设备状态同步

## 运行时模型

- Next.js App Router 下的 `src/app/api/*` 同时承载仪表盘管理 API 与兼容 API
- `next.config.mjs` 将 `/v1/*` 重写到 `/api/v1/*`
- 共享的 SSE / 路由核心（`src/sse/*` + `open-sse/*`）负责提供商执行、翻译、流式输出、回退与用量采集

## 范围

**包含**

- 本地网关运行时
- 仪表盘管理 API
- 提供商认证与 Token 刷新
- 请求翻译与 SSE 流式传输
- 本地状态与用量持久化
- 可选云同步编排

**不包含**

- `CLOUD_URL` 背后的云服务实现
- 上游提供商自身的 SLA / 控制面
- 外部 CLI 二进制（Claude CLI、Codex CLI 等）

## 系统上下文

```
开发者客户端
  Claude Code / Codex / OpenClaw / Cline / Continue / Roo / 任意 OpenAI 兼容客户端
        │  http://localhost:20128/v1
        ▼
┌─────────────────────────────────────────┐
│              9Router 本地进程             │
│  /v1/* 兼容 API                          │
│  /api/* 仪表盘与管理 API                   │
│  SSE + 翻译核心                           │
│  db.json / usage.json                    │
└─────────────────────────────────────────┘
        │
        ├─ OAuth 提供商：Claude / Codex / Gemini / Qwen / iFlow / GitHub / Kiro / Cursor / Antigravity
        ├─ API Key 提供商：OpenAI / Anthropic / OpenRouter / GLM / Kimi / MiniMax
        └─ 兼容节点：OpenAI-compatible / Anthropic-compatible

可选：仪表盘 ↔ 云同步端点（CLOUD_URL）
```

## 核心组件

### 1. API 与路由层

- `src/app/api/v1/*`、`src/app/api/v1beta/*`：兼容 API
- `src/app/api/*`：管理 / 配置 API
- 将 `/v1/chat/completions`、`/v1/messages`、`/v1/responses`、`/v1/models` 等统一接入翻译与执行流水线

### 2. 翻译与执行核心

- 把客户端协议转换成目标提供商协议
- 处理流式 SSE、工具调用、thinking / reasoning 字段
- 在组合策略下按回退、轮询、Fusion、Capacity 选择上游
- 规范化用量（input / output / cache tokens）后写入统计

### 3. 持久化

主状态库：

- 文件：`${DATA_DIR}/db.json`（未设置 `DATA_DIR` 时为 `~/.9router/db.json`）
- 实体：`providerConnections`、`providerNodes`、`modelAliases`、`combos`、`apiKeys`、`settings`、`pricing`

用量与日志：

- `~/.9router/usage.json`
- `~/.9router/log.txt`
- `ENABLE_REQUEST_LOGS=true` 时写入仓库下的 `logs/`

新版本 Docker 镜像也会使用 SQLite（`$DATA_DIR/db/data.sqlite`）并带自动备份。

### 4. 认证

- 仪表盘：JWT Cookie，首次登录使用 `INITIAL_PASSWORD`（默认 `123456`）
- API：`REQUIRE_API_KEY=true` 时，`/v1/*` 强制 Bearer Key
- 提供商侧：OAuth PKCE 自动刷新，或静态 API Key

## 请求生命周期（简化）

1. 客户端把模型 ID（如 `cc/claude-opus-4-6` 或某个 Combo 名）发到 `/v1/chat/completions`
2. 网关解析前缀 / 别名 / 组合
3. 检查配额、账号健康度、能力（视觉 / 工具 / 思考）
4. 翻译请求体并调用上游
5. 流式返回；失败则按策略切到下一模型或下一账号
6. 记录 tokens、费用与错误，供仪表盘展示

## 默认端口与路径

| 用途 | 地址 |
|------|------|
| 仪表盘 | `http://localhost:20128/dashboard` |
| OpenAI 兼容 API | `http://localhost:20128/v1` |
| Claude 兼容 | `http://localhost:20128/v1/messages` |
| 模型列表 | `http://localhost:20128/v1/models` |
| 健康检查 | `http://localhost:20128/api/health` |

更细的模块划分、SSE 流水线与数据实体说明见仓库中的 [`docs/ARCHITECTURE.md`](https://github.com/decolua/9router/blob/master/docs/ARCHITECTURE.md)。
