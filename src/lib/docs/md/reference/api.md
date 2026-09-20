# API 参考

9Router 对外暴露 OpenAI / Claude / Gemini 风格端点。默认根地址：

```
http://localhost:20128
```

仪表盘复制的 API Key 通过 `Authorization: Bearer` 传递。本地默认 `REQUIRE_API_KEY=false`；公网部署请打开强制校验。

---

## 聊天补全（OpenAI）

```bash
POST http://localhost:20128/v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "写一个二分查找"}
  ],
  "stream": true
}
```

`model` 可以是：

- 提供商前缀模型：`cc/claude-sonnet-4-5`、`glm/glm-4.7`、`kr/claude-sonnet-4.5`
- 仪表盘里创建的 Combo 名称

## Claude Messages

```bash
POST http://localhost:20128/v1/messages
Authorization: Bearer your-api-key
Content-Type: application/json
anthropic-version: 2023-06-01

{
  "model": "cc/claude-sonnet-4-5",
  "max_tokens": 4096,
  "messages": [
    {"role": "user", "content": "Hello"}
  ]
}
```

Claude Code 将 `ANTHROPIC_BASE_URL` 指到 `http://localhost:20128/v1` 即可走这条路径。

## 列出模型

```bash
GET http://localhost:20128/v1/models
Authorization: Bearer your-api-key
```

返回 OpenAI 格式的模型列表，包含已连接提供商的模型与 Combo。

## 兼容端点一览

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/v1/chat/completions` | OpenAI Chat Completions |
| `POST` | `/v1/messages` | Anthropic Messages |
| `POST` | `/v1/responses` | OpenAI Responses（Codex） |
| `GET` | `/v1/models` | 模型与组合目录 |
| `POST` | `/v1/messages/count_tokens` | Anthropic 计 token |
| `GET` | `/v1beta/models` | Gemini 风格目录 |
| `POST` | `/v1beta/models/{path}` | Gemini `generateContent` |
| `POST` | `/v1/api/chat` | Ollama 风格转换 |
| `POST` | `/v1/videos` | xAI Grok Imagine 视频（需对应提供商） |
| `GET` | `/api/health` | 健康检查，成功时 `{"ok":true}` |

## 在 CLI 中填写

```
Endpoint: http://localhost:20128/v1
API Key:  从仪表盘复制
Model:    kr/claude-sonnet-4.5
```

适用于 Claude Code、Codex、Cursor、Cline、Continue、Roo、OpenClaw、GitHub Copilot 等。各工具的具体字段见 [工具接入](/docs/integration/claude-code)。

## 云端调用注意

直接打 `https://9router.com/v1` 时：

- 必须先在本地仪表盘创建 Key，并执行 **Enable Cloud → Sync Now**
- 非流式（`stream=false`）若上游返回 SSE，可能解析失败；优先使用 `stream=true`
- 未同步的旧 Key 会在云端返回 `Invalid API key`

## 技能（Skills）

可以把 9Router 能力交给任意 Agent。先配置：

```bash
export NINEROUTER_URL="http://localhost:20128"
export NINEROUTER_KEY="sk-..."   # 仅当 requireApiKey=true
```

入口技能：

```
https://raw.githubusercontent.com/decolua/9router/refs/heads/master/skills/9router/SKILL.md
```

另有 chat、image、video、TTS、STT、embeddings、web-search、web-fetch 等能力技能，见仓库 [`skills/`](https://github.com/decolua/9router/tree/master/skills)。
