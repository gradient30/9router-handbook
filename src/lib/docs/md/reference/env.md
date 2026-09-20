# 环境变量

9Router 通过环境变量控制端口、存储、认证与云同步。Docker 镜像不会烘焙 `.env`（已被 `.dockerignore` 忽略），请用 `--env-file` 或 `-e` 注入。

---

## 变量表

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `JWT_SECRET` | 自动生成（`~/.9router/jwt-secret`） | 仪表盘 auth cookie 的 JWT 签名。多实例共享时请显式设置 |
| `INITIAL_PASSWORD` | `123456` | 尚无已保存哈希时的首次登录密码 |
| `DATA_DIR` | `~/.9router` | 主数据目录 |
| `PORT` | `20128`（示例） | 监听端口 |
| `HOSTNAME` | 框架默认；Docker 为 `0.0.0.0` | 绑定地址 |
| `NODE_ENV` | 运行时默认 | 部署时设为 `production` |
| `BASE_URL` | `http://localhost:20128` | 云同步作业使用的内部基础 URL |
| `CLOUD_URL` | `https://9router.com` | 云同步端点 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | 向后兼容的公共基础 URL；运行时优先 `BASE_URL` |
| `NEXT_PUBLIC_CLOUD_URL` | `https://9router.com` | 向后兼容的公共云 URL；运行时优先 `CLOUD_URL` |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | 生成 API Key 的 HMAC 密钥 |
| `MACHINE_ID_SALT` | `endpoint-proxy-salt` | 稳定机器 ID 哈希盐 |
| `ENABLE_REQUEST_LOGS` | `false` | 在 `logs/` 下记录请求 / 响应 |
| `AUTH_COOKIE_SECURE` | `false` | HTTPS 反代后设为 `true`，强制 Secure cookie |
| `REQUIRE_API_KEY` | `false` | 对 `/v1/*` 强制 Bearer Key。**公网部署强烈建议开启** |
| `OBSERVABILITY_ENABLED` | `true` | 可观测性开关 |
| `DEBUG` | — | Docker 调试 |
| `HEADROOM_URL` | — | Headroom 代理地址 |
| `HTTP_PROXY` / `HTTPS_PROXY` / `ALL_PROXY` / `NO_PROXY` | 空 | 访问上游时的出站代理 |
| `SEARXNG_URL` | — | 内置未认证 web-search 的 SearXNG 端点 |

小写代理变量同样支持：`http_proxy`、`https_proxy`、`all_proxy`、`no_proxy`。

`INSTANCE_NAME` 出现在旧模板中，当前运行时未使用。

## 生产环境最小集

```bash
export JWT_SECRET="换成足够长的随机串"
export INITIAL_PASSWORD="换成强密码"
export DATA_DIR="/var/lib/9router"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export BASE_URL="http://localhost:20128"
export CLOUD_URL="https://9router.com"
export API_KEY_SECRET="换成独立密钥"
export MACHINE_ID_SALT="换成独立盐"
export REQUIRE_API_KEY="true"
export AUTH_COOKIE_SECURE="true"   # 仅在 HTTPS 后
```

## 运行时文件

- 主状态：`${DATA_DIR}/db.json` 或 `${DATA_DIR}/db/data.sqlite`
- 用量：`~/.9router/usage.json`（部分版本仍独立于 `DATA_DIR`）
- 日志：`~/.9router/log.txt`
- 可选请求日志：`ENABLE_REQUEST_LOGS=true` 时为 `<repo>/logs/...`
- Windows 本地路径会参考 `APPDATA`

## 相关文档

- [本地运行](/docs/deployment/localhost)
- [Docker 部署](/docs/deployment/docker)
- [云端 / VPS](/docs/deployment/cloud)
- [故障排除](/docs/troubleshooting)
