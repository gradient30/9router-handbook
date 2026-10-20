# 欢迎使用 9Router

**把 Claude、Codex、Gemini 等订阅用尽 • 超低价备用约 $0.20/1M tokens • 内置 RTK 再省 20–40% Token**

9Router 是一款本地 AI 模型路由网关：在编码工具与 40+ AI 提供商之间做智能路由、格式翻译与自动回退，最大化订阅价值并压低溢出成本。

---

## 什么是 9Router?

9Router 是一款智能代理，位于你的编码工具（Cursor、Cline、Claude Code、Codex、OpenClaw…）与 AI 提供商之间。它会根据配额、成本和可用性，自动将请求路由到最合适的模型，并在网关侧压缩工具输出（RTK）。

**告别浪费:**
- ❌ 订阅配额每月未用完就过期
- ❌ 速率限制让你写代码写到一半被卡住
- ❌ 工具输出（git diff、grep、日志）疯狂烧 Token
- ❌ 昂贵的 API（每个提供商每月 $20–50）
- ❌ 在不同提供商之间手动切换

**开始最大化价值:**
- ✅ **RTK Token Saver** - 自动压缩 `tool_result`，通常节省 20–40% 输入 Token
- ✅ **充分利用订阅** - 跟踪并用完 Claude Code、Codex、Copilot、Cursor 的配额
- ✅ **超低价备用** - GLM（约 $0.6/1M）、MiniMax M2.7（约 $0.20/1M）
- ✅ **免费回退** - Kiro、OpenCode Free、Vertex（在免费额度内）
- ✅ **智能回退** - 订阅 → 低价 → 免费，自动切换

> **重要（2026）:** 官方 README 标明 **iFlow / Qwen Code / Gemini CLI 的免费层已停用**。请改用 **Kiro / OpenCode Free / Vertex** 作为免费层。旧文档中的 iFlow/Qwen 示例仅作历史参考。

---

## 核心特性

### 🔄 智能三层回退

```
一次配置,永不停码:

第 1 层(订阅): Claude Code → Codex → Copilot / Cursor
  ↓ 配额耗尽
第 2 层(低价): GLM → MiniMax M2.7 → Kimi
  ↓ 预算上限
第 3 层(免费): Kiro → OpenCode Free → Vertex

→ 自动切换,零停机!
```

### 📉 Token 节省

- **RTK**: 压缩 git/搜索/列表类工具输出，默认开启
- **Caveman**: 约束输出风格，进一步压低输出 Token
- **Headroom**: 可选边车，对超长上下文再压缩（见 Docker）

详见 [Token 节省](/docs/features/token-saver)。

### 📊 配额跟踪

- 每个提供商的实时 token 消耗
- 重置倒计时（5 小时、每日、每周、每月）
- 付费层级的成本估算（仪表盘数字多为「对照价」，不是 9Router 账单）
- 每月支出报告

### 🎯 通用 CLI / IDE 支持

适用于所有支持自定义 OpenAI / Anthropic endpoint 的工具:

✅ **Claude Code** • **Codex** • **Cursor** • **Cline** • **OpenClaw** • **Continue** • **Roo** • **Copilot** • **任意 OpenAI 兼容工具**

### 💰 成本优化

**真实案例（每月约 100M tokens）:**
```
订阅配额内: Claude Code / Codex → $0 额外
溢出走 GLM / MiniMax: 约数美元
免费层兜底: Kiro / OpenCode Free → $0（在额度内）
+ RTK 再砍 20–40% 工具输出 Token
```

---

## 为什么选择 9Router?

### 最大化订阅价值

已经在为 Claude Code（每月 $20–200）或 Codex（每月 $20–200）付费？那就用足它:

- 实时跟踪配额使用
- 配额重置时（5 小时、每周）自动切换
- 在过期前用掉每一个 token
- 溢出流量再落到低价 / 免费层，而不是中断会话

### 超低价备用

订阅配额用完时，只需花几分钱:

| 提供商 | 每 1M tokens 成本 | 重置时间 |
|----------|-------------------|-------|
| **GLM-4.7 / GLM-5.x** | 约输入 $0.60 | 每日 10:00 AM |
| **MiniMax M2.7** | 约输入 $0.20 | 5 小时滚动 |
| **Kimi** | 约 $9/月（额度制） | 每月 |

**比直连高价 API 便宜约一个数量级。**

### 免费回退（当前推荐）

当其他一切都受配额限制时的应急备用:

- **Kiro**: 约 50 credits/月免费额度（Claude 4.5、GLM-5、MiniMax 等）
- **OpenCode Free**: 无需鉴权，模型列表会随官方促销变动
- **Vertex AI**: 新 GCP 账号常见 $300 试用额度；请走 **Vertex AI Studio** 端点以使用免费额度

---

## 快速开始

2 分钟即可上手:

```bash
# 全局安装
npm install -g 9router

# 启动(仪表盘自动打开)
9router
```

🎉 **仪表盘自动打开** → 连接提供商 → 开始编码!

**推荐先接一个免费提供商:**

```
仪表盘 → Providers → 连接 Kiro AI 或 OpenCode Free
```

**在你的 CLI 工具中使用:**

```
Endpoint: http://localhost:20128/v1
API Key: [从仪表盘获取]
Model: kr/claude-sonnet-4.5
```

[→ 完整入门指南](getting-started.md)

---

## 使用场景

### 个人开发者

- 最大化你的 Claude Code / Codex 订阅
- 用 RTK 降低工具输出 Token
- 回退到超低价模型（约 $0.20/1M）
- 用 Kiro / OpenCode Free 兜底，24/7 少中断

### 团队

- 部署在 VPS / 云服务器上共享访问
- 实时跟踪团队支出（对照价）
- 为每层设置预算上限
- 集中管理提供商与 API Key

### 移动 / 远程编码

- 本地隧道或云端同步（见云端部署）
- 从 iPad、手机、任何地方访问
- Cloudflare 边缘网络（隧道场景）

---

## 接下来做什么?

- [入门指南](getting-started.md) - 5 分钟内完成安装和配置
- [安装指南](getting-started/installation.md) - 详细的设置说明
- [Token 节省](/docs/features/token-saver) - RTK / Caveman / Headroom
- [功能特性](features/) - 探索所有能力
- [更新日志](/changelog) - 同步 GitHub Releases
- [常见问题](faq.md) - 常见问题解答

---

<div align="center">
  <sub>内容对齐上游 decolua/9router README 与官方站点；中文手册由社区维护</sub>
</div>
