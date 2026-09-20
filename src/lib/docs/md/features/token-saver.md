# Token 节省（RTK）

RTK（Router Token Saver）会在请求进入上游之前压缩工具结果（`tool_result`）等内容，通常可节省 **20–40%** 输入 Token。配合 Caveman 模式，输出侧最高可再降约 65%。

---

## 解决什么问题

编码代理会把 `git diff`、`grep`、`ls`、测试日志等大段工具输出原样塞回上下文。这些内容往往：

- 重复、冗长、对下一轮推理贡献有限
- 快速吃掉订阅的 5 小时窗口
- 在多轮 Agent 循环里指数膨胀

RTK 针对这类 `tool_result` 做结构化压缩，而不是简单截断对话。

## 工作方式

```
CLI 工具
  └─ 带 tool_result 的请求
        ▼
   9Router RTK
   · 压缩 git / 搜索 / 文件列表类输出
   · 保留路径、错误、关键 diff 行
   · 可选 Headroom 代理做更激进的压缩
        ▼
   上游模型（Claude / GLM / Kimi …）
```

压缩发生在网关内部，客户端无需改协议。对 Claude Code、Cline、Cursor、OpenClaw 等走 `/v1` 的工具都生效。

## 仪表盘入口

```
仪表盘 → Endpoint → Token Saver
```

可查看：

- 是否启用 RTK / Headroom / Caveman
- 压缩前后 Token 对比
- 按请求的节省量

## 按请求绕过

个别请求不想压缩时，加上：

```http
X-9Router-Token-Saver: off
```

网关会跳过该请求的 Token Saver（v0.5.35 起）。

## Caveman 模式

Caveman 用更短、更指令化的系统风格约束模型输出，减少客套话与重复解释。适合：

- 只要补丁 / 命令、不要长篇分析的循环
- 需要压低输出 Token 的批量任务

可在提供商或 Endpoint 页按模型启用，并支持针对上游的风格规则。

## Headroom

Headroom 是可选的外部压缩代理，不打进 9Router 镜像。Docker 中作为边车运行，详见 [Docker 部署](/docs/deployment/docker)。

典型组合：

1. 本地 RTK 做第一层 tool_result 压缩
2. Headroom 对超长上下文再压缩
3. 仍按 OpenAI / Claude 形状转发给上游

## 能省多少

官方 README 的经验值：

| 手段 | 大致效果 |
|------|----------|
| RTK 压缩 tool_result | 输入 Token 减少 20–40% |
| Caveman 约束输出 | 输出最高再降约 65% |
| 三层回退（订阅 → 低价 → 免费） | 避免把溢出流量打到高价 API |

实际比例取决于仓库大小、测试日志长度和 Agent 轮数。建议在仪表盘用量页对比开启前后的 input tokens。

## 相关功能

- [智能路由](/docs/features/smart-routing) — 配额耗尽时自动换模型
- [配额跟踪](/docs/features/quota-tracking) — 看每个提供商还剩多少
- [模型组合](/docs/features/combos) — 把省 Token 的模型串进回退链
