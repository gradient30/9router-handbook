# 免费提供商 - 零成本回退

订阅与低价配额都紧缺时的应急层。在免费额度内可做到接近 $0 的 24/7 编码。

---

## 概览（2026 现状）

当前官方 README 推荐的免费层:

- 🆓 **Kiro AI** — 约 50 credits/月免费额度（Claude 4.5、GLM-5、MiniMax 等）；之上另有付费档
- 🆓 **OpenCode Free** — 无需鉴权，模型列表自动拉取，会随促销变动
- 🆓 **Vertex AI** — 新 GCP 账号常见 $300 试用额度（请走 Vertex AI Studio 端点）

**策略:** 作为第 3 层回退；与 RTK 组合可在 $0 附近把工具输出再砍 20–40%。

> **已停用免费层:** iFlow、Qwen Code、Gemini CLI 的免费额度在 2026 年已停用。手册中若仍见旧示例，请改用本节提供商。

---

## Kiro AI（推荐首选）

### 价格与额度

| 档位 | 费用 | 说明 |
|------|------|------|
| 免费 | $0 | 约 50 credits/月（含 Claude 4.5、GLM-5、MiniMax 等） |
| 付费 | 按官方 | 额度用尽后可升级，仍可通过 9Router 连接 |

### 设置

```bash
9router
# 仪表盘 → 提供商 → 连接 Kiro
```

登录方式常见为 AWS Builder ID / Google / GitHub / 外部 IdP 导入等（以仪表盘选项为准）。连接后开启自动 token 刷新。

### 常用模型 ID

```
kr/claude-sonnet-4.5
kr/claude-haiku-4.5
kr/glm-5
kr/MiniMax-M2.5
kr/qwen3-coder-next
kr/deepseek-3.2
```

具体目录以仪表盘 / `GET /v1/models` 为准（版本会更新）。

### 专业建议

- 零成本起步首选：先接 Kiro，再配 OpenCode Free 做第二兜底
- 额度是 credits，不是「无限」——耗尽后请回退到 OpenCode Free / Vertex 或低价 API
- 适合放在 Combo 末尾作应急质量层

---

## OpenCode Free（无需鉴权）

### 特点

| 项目 | 说明 |
|------|------|
| 费用 | $0 |
| 鉴权 | 无需 API Key / OAuth |
| 模型 | 从上游自动拉取；列表会变，部分模型仅限时免费 |

### 设置

```bash
9router
# 仪表盘 → 提供商 → 连接 OpenCode Free
```

在 CLI 中可用类似 `oc/<model>` 的前缀（以仪表盘复制的模型名为准；也可用 Combo 指向「自动」槽位）。

### 注意

- 模型可用性不稳定属正常现象（促销结束会消失）
- 适合「永远有一个能打的兜底」，不要当唯一生产通道

---

## Vertex AI（GCP 试用额度）

### 特点

| 项目 | 说明 |
|------|------|
| 费用 | 新账号常见 $300 试用额度（约 90 天，以 GCP 为准） |
| 模型 | Gemini 系列；Partner 目录含 DeepSeek / GLM / Qwen 等 |

### 设置要点

1. 仪表盘 → 连接 **Vertex AI**
2. 在 GCP 项目中启用 Vertex AI API，并配置 ADC / 授权用户凭据
3. **自 2026-03 起：** 普通 Gemini API 端点不再消耗该试用额度时，请改用 **Vertex AI Studio** 端点（以官方说明与仪表盘提示为准）

### 示例模型 ID

```
vertex/gemini-3.1-pro-preview
vertex/gemini-3-flash-preview
vertex/gemini-2.5-flash
vertex-partner/glm-5-maas
vertex-partner/deepseek-v3.2-maas
```

---

## 特性对比

| 提供商 | 鉴权 | 额度性质 | 最佳场景 |
|----------|------|----------|----------|
| **Kiro** | OAuth / Builder ID 等 | ~50 credits/月 | 免费 Claude / GLM 质量 |
| **OpenCode Free** | 无 | 列表浮动 | 零配置兜底 |
| **Vertex** | GCP 凭据 | $300 试用等 | Gemini / Partner 模型 |

**推荐组合:** Kiro 主力 + OpenCode Free 兜底 +（可选）Vertex。

---

## 推荐 Combo

### 纯免费

```
仪表盘 → 组合 → 新建

名称: free-forever
模型:
  1. kr/claude-sonnet-4.5
  2. kr/glm-5
  3. oc/<仪表盘中的 OpenCode 模型>

CLI 中使用: free-forever
```

### 完整三层

```
名称: complete-fallback
模型:
  1. cc/claude-opus-4-7          # 订阅
  2. glm/glm-5.1                 # 低价
  3. minimax/MiniMax-M2.7        # 更便宜
  4. kr/claude-sonnet-4.5        # 免费兜底
```

---

## 与 RTK 一起用

免费层 + RTK 是官方强调的「$0 + 省 Token」组合:

- 打开 [Token 节省](/docs/features/token-saver)
- 仪表盘 → Endpoint → Token Saver，确认 RTK 开启
- 个别请求可加请求头 `X-9Router-Token-Saver: off` 绕过

---

## 相关页面

- [低价提供商](/docs/providers/cheap)
- [订阅型提供商](/docs/providers/subscription)
- [智能路由](/docs/features/smart-routing)
- [模型组合](/docs/features/combos)
