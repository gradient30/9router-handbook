import type { GithubRelease } from "./types";

export const FETCHED_AT_BUILD = "2026-07-16T11:14:39Z";

export const FALLBACK_RELEASES: GithubRelease[] = [
  {
    tag_name: "v0.5.35",
    name: "feat: Grok Imagine video, Copilot Claude route, i18n th/fa version 0.5.35",
    published_at: "2026-07-16T11:14:39Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.35",
    prerelease: false,
    draft: false,
    body: `Features:
- xAI：Grok Imagine 视频生成（/v1/videos）及 CLI
- CLI 工具：Grok Build 一键配置，写入 ~/.grok/config.toml 的 [model.9router]
- GitHub Copilot：通过 Copilot 原生 /v1/messages 路由 Claude 模型
- Kiro：新增 GPT-5.6 模型系列（#2596）
- RTK：X-9Router-Token-Saver 请求头，可按请求绕过 Token Saver
- 提供商：配额可见性设置
- 翻译器：所有 Claude 模型不再发送 temperature
- i18n：泰语（th）与波斯语（fa）翻译 / README

Fixes:
- 提供商：批量添加 API 密钥不再覆盖已有密钥（按空位补 Key N）
- Anthropic：anthropic-version 请求头改为小写，避免 /v1/messages 重复
- Alicode-intl：改用 DashScope compatible-mode 端点，标准密钥可直接使用
- Grok CLI：Grok Build 对齐当前订阅协议（#2590）
- Grok CLI：暴露 expiresAt，以便主动刷新 Token（#2546）
- Kiro：改进直接会话缓存复用
- 模型：为实时目录中的 LLM 填充 capabilities
- 模型：在 /v1/models 列出兼容提供商模型
- Thinking：在 output_config.effort 之外显式发送 thinking:{type:adaptive}
- 翻译器：openai-responses 转 openai 时去掉 client_metadata

Improvements:
- 性能：启动时跳过未启用的后台服务

Docs:
- README：波斯语 YouTube 教程`,
  },
  {
    tag_name: "v0.5.20",
    name: "feat: thinking level picker + suffix support across providers version 0.5.20",
    published_at: "2026-07-07T09:30:44Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.20",
    prerelease: false,
    draft: false,
    body: `Features:
- Thinking：提供商页按模型选择思考级别，复制模型名时附加 (level) 后缀，可在 openai / claude / gemini / deepseek / kimi / qwen / zai / minimax / hunyuan / step 等格式强制推理强度
- RTK：新增 JS 原生 git-log 过滤器（#2423）
- Caveman：补充与上游对齐的定向风格规则（#2424）
- i18n：新增波斯语（fa）支持（#2385）

Fixes:
- Thinking：向上游发送前去掉 body.model 中的 (level) 后缀，避免提供商拒请求
- 翻译器：openai-responses 转换时保留 developer 指令（#2434）
- count_tokens：统计结构化 Anthropic 块（#2419）
- Volcengine-ark：将 GLM-5 的 max_tokens 限制在模型输出上限（#2428）
- Kimi：将 reasoning_effort 规范化为后端枚举（#2427）
- Claude：协调 max_tokens 与 thinking budget，并提高单模型上限（#2381）
- Kiro：原生下发 system prompt，新增 Opus 4.5 / 4.7 / 4.8，兼容带横杠的版本 ID（#2366）
- Headroom：通过应用代理仪表盘（#2372）
- MITM：服务器启动时从过期锁文件恢复

Docs:
- README：换成越南语教程视频；补充英语与乌尔都语 / 印地语教程（#2305）
- 新增 CLAUDE.md，指导 Claude Code 用法（#2354）`,
  },
  {
    tag_name: "v0.5.18",
    name: "v0.5.18: cached token tracking, provider fixes version 0.5.18",
    published_at: "2026-07-03T08:38:06Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.18",
    prerelease: false,
    draft: false,
    body: `Features:
- 用量：跟踪缓存 Token，并正确计算输入 / 输出 / 缓存费用（#2209）
- Codex：展示额度重置与过期细节（#2290）
- NVIDIA：新增模型与能力
- ClinePass：新增提供商支持

Fixes:
- 用量：对流式 request-details 日志去重
- Claude：透传时丢弃外来 thinking 签名
- 避免非 SSE 流管道崩溃，以及跨 IdP 账号互相覆盖（#2244）
- Kiro：将 IdC 认证路由到区域 CodeWhisperer 入口（#2297）
- Kiro：支持 Claude Sonnet 5（#2264）
- Xiaomi-tokenplan：区域选择、密钥校验、多连接（#2251）
- 翻译器：严格遵循 Anthropic content block（#2225）
- Kimchi：剥离 reasoning_content 回声，限制多轮输入 Token
- Kimchi：User-Agent 升至 kimchi/0.1.40（#2256）
- Codebuddy-cn：去掉空的 tool_calls 数组以保留推理
- Antigravity：保留 Claude 工具增量 index（#2223）
- MITM：服务器启动时生成根证书（#2228）`,
  },
  {
    tag_name: "v0.5.12",
    name: "feat: token-saver dashboard, Venice AI, Blackbox catalog overhaul version 0.5.12",
    published_at: "2026-06-26T11:04:55Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.12",
    prerelease: false,
    draft: false,
    body: `Features:
- 新增 Token Saver 仪表盘页面
- 提供商连接支持批量删除
- 从上游解析 GitHub Copilot 模型目录
- 新增 Venice AI 提供商
- Kiro 支持 Microsoft SSO 的 external_idp 导入（CLIProxyAPI）
- 重做 Blackbox 提供商目录，并支持 WebUI 测试

Fixes:
- DeepSeek / Gemini 思考兼容
- 从源头避免流式用量被重复计数
- 用量日志去重，减少统计抖动
- 非 JSON SSE 行 / 重复 [DONE] 不再打挂客户端（#2046）
- 从目录解析 Gemini TTS 模型
- 支持 Kiro IDC（组织）Token 导入
- 为 JSON 客户端保留强制流式（#2031）
- 保留 Codex Responses 文本格式
- 支持 Gemini 原生 TTS generateContent 端点
- 补上缺失的 zh-CN 端点密钥标签
- CodeBuddy：仅在客户端请求推理时发送 reasoning 参数（#2071）
- 组合选择器展示自定义提供商模型
- Docker：默认启用 Headroom 的 docker-compose.yml
- 厘清 Token 诊断与提供商账单的区别（Headroom，#1998）
- 将 openai-responses 输入经 OpenAI 翻译后再压缩（#1998）
- Kiro：为 claude-opus-4.8 报告 1M 上下文
- 认证变更后避免过期重定向（#2100）
- 将 Claude Opus 4.7（带横杠 ID）标为 1M 上下文
- Codex 翻译链路保留 reasoning effort
- Token Saver：卡片全宽布局
- Antigravity：对短暂上游失败重试
- 参数支持：处理没有 match/drop 的 strip 规则（#1960）
- 翻译器：调试端点解析自定义提供商前缀（#1083）`,
  },
  {
    tag_name: "v0.5.8",
    name: "feat: Antigravity native image gen, CodeBuddy CN auth version 0.5.8",
    published_at: "2026-06-21T11:05:29Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.8",
    prerelease: false,
    draft: false,
    body: `Features:
- Antigravity：原生图像生成（图像模型标记 kind:image，展示在媒体提供商界面）
- CodeBuddy CN：API 密钥认证 + 积分配额跟踪
- CodeBuddy CN：短前缀别名 cbcn

Fixes:
- MiniMax-M3：启用视觉能力
- Headroom：支持 Docker 边车代理
- Antigravity：图像执行器修复
- mimo-free：轮换 Chrome User-Agent 以绕过反滥用门禁
- cloudflare-ai：将 content-part 数组展平为字符串，避免 oneOf 400（#1926）
- 翻译器：对非 Anthropic 提供商将 tools 规范为 Anthropic 原生形状
- CLI：兼容 Next.js 16 嵌套 standalone 输出路径（#1940）
- Codex：请求规范化时保留自定义工具
- next.config：为 responses 端点增加 API 路由`,
  },
  {
    tag_name: "v0.5.6",
    name: "feat: Ponytail code gen, Headroom proxy, CodeBuddy CN provider version 0.5.6",
    published_at: "2026-06-20T09:13:12Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.6",
    prerelease: false,
    draft: false,
    body: `Features:
- Ponytail：极简代码生成
- Headroom：代理生命周期管理 + 仪表盘（一键启停、安装检测、状态探测、Token Saver、claude↔openai 形状转换）
- CodeBuddy CN：新 OAuth 提供商（copilot.tencent.com）— 15 个模型、/v2 推理、强制流式、OpenAI 风格 reasoning
- OpenCode-Go：模型对齐官方端点；Qwen 3.7 MiniMax 走 /v1/messages，GLM / Kimi / DeepSeek / MiMo 走 /chat/completions

Fixes:
- Anthropic 兼容校验：改用 POST /v1/messages（GET /models 非规范，有效密钥会被误判）
- CLI 工具：8 条设置路由均容忍 JSONC（opencode、openclaw、kilo、droid、cowork、copilot、claude、cline）
- Gemini / Antigravity：工具 schema 翻译时保留 pattern（glob / grep）
- Combo / Fusion：面板调用中展平 Anthropic 风格工具消息（避免 503）
- 模型：按提供商作用域存储自定义模型
- Perplexity：用 /v1/models 校验密钥`,
  },
  {
    tag_name: "v0.5.4",
    name: "fix: Kiro/AG/Xiaomi providers, fusion tool history, vision models version 0.5.4",
    published_at: "2026-06-18T10:46:46Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.4",
    prerelease: false,
    draft: false,
    body: `Fixes:
- Kiro：遵循 thinking effort 预算
- Antigravity / Kiro / 小米：提供商修复
- Combo / Fusion：面板调用中展平工具历史，避免 503
- LLM 选择器：在选择器与模型列表中展示自定义视觉模型
- 图像：避免兼容节点遮蔽提供商标识`,
  },
  {
    tag_name: "v0.5.2",
    name: "feat: Combo Fusion + Capacity auto-switch, Kiro API-key, Claude auto-ping & 429 throttle version 0.5.2",
    published_at: "2026-06-17T05:03:17Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.5.2",
    prerelease: false,
    draft: false,
    body: `Features:
- Combo Fusion 策略 — 并行查询所有模型，由裁判模型合成一个答案
- 每个组合可选 fallback / round-robin / fusion / capacity，并指定裁判模型
- Capacity 自动切换 — 图像 / PDF / 音频请求优先打到具备相应能力的模型
- Kiro 无头 API 密钥认证（ksk_）+ 直接 claude↔kiro 路由
- Claude 自动唤醒 — 5 小时配额窗口重置后立即预热

Fixes:
- Claude 429：节流 OAuth 用量轮询（缓存 resetAt、3 分钟刷新、冷却），聊天不受影响
- 用量日志始终为空：getRecentLogs 中 getAdapter() 缺少 await
- 执行器：去掉提供商 / 模型不支持的参数（claude-opus-4 temperature 400）
- 翻译器：Gemini / Antigravity → OpenAI 使用确定性 tool_call id（避免工具配对 400）
- Antigravity：发给 Gemini 前去掉 tool schema 中的 optional
- Claude→OpenAI：非流式路径处理 OpenAI 格式响应
- 用量视图：提供商页与配额跟踪使用一致的已编辑连接名
- 安全：加固反向代理的本地访问信任，以及 web fetch 的 SSRF 防护

Internal:
- 大规模重构 open-sse / 翻译器：统一注册表、单源 URL、去重、黄金测试`,
  },
  {
    tag_name: "v0.4.80",
    name: "feat: Vercel AI Gateway, MiMo Free, Kiro failover + security & provider fixes version 0.4.80",
    published_at: "2026-06-13T08:41:57Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.4.80",
    prerelease: false,
    draft: false,
    body: `Features:
- Vercel AI Gateway：支持 embeddings、图像与积分用量（#1183）
- 新增 MiMo Free 免认证提供商（#1789）
- Vertex：支持 ADC authorized_user 凭证
- Cowork：重新启用 Claude Cowork（仅预设 stdio MCP）
- Codex：通过 JSON 批量添加账号（#1719）
- Kiro：GenerateAssistantResponse 启用多端点故障转移（#1722）

Fixes:
- 安全：导出 / 导入数据库需重新认证；web fetch 增加 SSRF 防护
- 认证：按真实客户端 IP 限流 + 远程默认密码防护
- Cerebras / Mistral：去掉下游不支持的 client_metadata（#1742）
- SiliconFlow：baseUrl 从 .cn 改为 .com，并整理已验证模型列表（#1760）
- Gemini→OpenAI：未签名 thought 部分写入 reasoning_content（#1752）
- Claude→OpenAI：从 system prompt 去掉 Anthropic 账单头（#1765）
- Anthropic 兼容：第三方网关发送 Bearer 认证（#1795）
- 用量统计：避免初始 SSE 竞态导致部分统计（#1767）
- 代理：proxy.js 使用 export default，以便 Next.js 16 检测中间件
- Claude 透传：增加 body 规范化
- GitHub Copilot：模型发现时刷新缺失 / 过期 Token（#1727）；为 Copilot MITM 增加可映射的 gpt-5-mini / gpt-5.4-nano 槽位（#1653）
- Kiro：自动解析 profileArn 避免 IDC 登录 403，增强 ARN 解析，端点改为 runtime.us-east-1.kiro.dev（#1713）
- 隧道：通过双套接字探测系统安装的 Tailscale（#1723）；非阻塞探测以免界面卡死
- CommandCode：transformRequest 中强制 stream=true（#1706）
- Qoder：提高推理模型超时并改进流处理
- 仪表盘：拓扑图显示提供商节点名而非连接名（#1770）；组合页明确展示 kind=llm 的组合（#1684）

Docs:
- README：增加印尼语 9Router 教程视频（#1709）`,
  },
  {
    tag_name: "v0.4.71",
    name: "fix: codex streaming timeouts + Responses terminal events version 0.4.71",
    published_at: "2026-06-06T09:18:09Z",
    html_url: "https://github.com/decolua/9router/releases/tag/v0.4.71",
    prerelease: false,
    draft: false,
    body: `Features:
- Caveman：增加文言级别并同步上游提示；端点页按语言环境显示
- i18n：多语言端点暴露提示 + 俄语 README
- Antigravity：新增 gemini-3.5-flash-extra-low（Low）模型
- xiaomi-tokenplan：经专用执行器提供 Claude 原生 MiMo V2.5 Pro 别名
- Qoder：拉取最新模型 + 仪表盘「导入模型」按钮（#1642）
- MiniMax：新增 MiniMax-M3，并更新配额跟踪的 coding / CN（#1631）

Fixes:
- Codex：加强流式超时（stall / connect 提到 60s，可按提供商配置）；接受 response.done；当流在终结事件前关闭、停滞或中止时，始终发出 response.failed + [DONE]，避免 Codex 客户端挂起（#1648、#1680、#1688、#1618）
- Codex：持久化 OAuth 刷新生命周期（#1664）
- 隧道：跳过虚拟网卡，避免误报 netchange 看门狗
- Claude：修复 cc/ OAuth 路由上强制 tool_choice 导致的 400（#1592）
- 代理：Next 客户端 body 上限提到 128MB（#1529、#1572）
- MiniMax：后续轮次回显 reasoning_content，避免 400（#1543）
- Kiro：处理带工具历史的 400；增加可映射 auto 模型槽；修复二进制 EventStream 崩溃以及模型 / TTS 工具过滤
- Antigravity：透传 tab 补全，并将默认 agent 槽标为必填
- Qoder：允许 qmodel_latest 模型键（#1638）
- 提供商：恢复兼容 / embedding 节点的单连接保护
- 模型测试：图像 / STT 探测打到真实端点；连接测试加入 opencode-go 与 xiaomi-tokenplan（#1576、#1628）

Improvements:
- 仪表盘：重新整理侧栏 / 顶栏 / 个人菜单动作
- 翻译器：增加数据驱动覆盖、暴露缺陷的用例与真实提供商冒烟测试`,
  },
];
