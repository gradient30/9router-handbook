# Docker 部署

在容器中运行 9Router。官方镜像 [`decolua/9router`](https://hub.docker.com/r/decolua/9router) 同时提供 `linux/amd64` 与 `linux/arm64`。

---


## 官方 docker-compose（含 Headroom）

上游仓库自带 `docker-compose.yml`，默认把 Headroom 作为边车并设置 `HEADROOM_URL`：

```yaml
services:
  9router:
    image: decolua/9router:latest
    container_name: 9router
    restart: always
    ports:
      - "20128:20128"
    volumes:
      - 9router-data:/app/data
    env_file:
      - .env
    environment:
      DATA_DIR: /app/data
      PORT: "20128"
      HOSTNAME: "0.0.0.0"
      NODE_ENV: production
      HEADROOM_URL: http://headroom:8787
    depends_on:
      - headroom

  headroom:
    image: ghcr.io/chopratejas/headroom:latest
    container_name: headroom
    restart: always
    ports:
      - "8787:8787"

volumes:
  9router-data:
    name: 9router-data
```

```bash
cp .env.example .env   # 至少改 JWT_SECRET / INITIAL_PASSWORD
docker compose up -d
```

打开 <http://localhost:20128> 。数据在命名卷 `9router-data`；若更习惯绑定宿主机目录，可用下文的 `docker run -v "$HOME/.9router:/app/data"`。

## 快速启动（单容器）

```bash
docker run -d \
  -p 20128:20128 \
  -v "$HOME/.9router:/app/data" \
  -e DATA_DIR=/app/data \
  --name 9router \
  decolua/9router:latest
```

服务监听 `20128` 端口。打开：<http://localhost:20128>

## 常用命令

```bash
docker logs -f 9router        # 查看日志
docker stop 9router           # 停止
docker start 9router          # 再次启动
docker rm -f 9router          # 删除容器
```

## 数据持久化

```bash
-v "$HOME/.9router:/app/data" \
-e DATA_DIR=/app/data
```

未设置 `DATA_DIR` 时，应用会回退到 `~/.9router/`（macOS / Linux）或 `%APPDATA%\9router\`（Windows）。容器内必须设置 `DATA_DIR=/app/data`，绑定挂载才会生效。

`$DATA_DIR/` 目录结构：

```text
$DATA_DIR/
├── db/
│   ├── data.sqlite       # 主数据库
│   └── backups/          # 自动备份
└── ...                   # 证书、日志、运行时配置
```

- 宿主机路径：`$HOME/.9router/db/data.sqlite`
- 容器路径：`/app/data/db/data.sqlite`

## 可选环境变量

```bash
docker run -d \
  -p 20128:20128 \
  -v "$HOME/.9router:/app/data" \
  -e DATA_DIR=/app/data \
  -e PORT=20128 \
  -e HOSTNAME=0.0.0.0 \
  -e DEBUG=true \
  --name 9router \
  decolua/9router:latest
```

完整变量说明见 [环境变量](/docs/reference/env)。

## 可选 Headroom 边车

9Router 镜像不内置 Python / Headroom。若要在 Docker 中使用 Headroom，请作为独立服务运行，并让 9Router 指向该代理：

```yaml
services:
  9router:
    image: decolua/9router:latest
    ports:
      - "20128:20128"
    volumes:
      - "$HOME/.9router:/app/data"
    environment:
      DATA_DIR: /app/data
      HEADROOM_URL: http://headroom:8787
    depends_on:
      - headroom

  headroom:
    image: ghcr.io/chopratejas/headroom:latest
    ports:
      - "8787:8787"
```

在仪表盘打开 **Endpoint → Token Saver → Headroom**，确认 URL 为 `http://headroom:8787`，重新检测状态后再启用。

若 Headroom 跑在 Docker 宿主机而不是边车里：

- macOS / Windows：使用 `http://host.docker.internal:8787`
- Linux：添加 `--add-host=host.docker.internal:host-gateway`，或在 Compose 中配置 `extra_hosts`

## 升级到最新版

```bash
docker pull decolua/9router:latest
docker rm -f 9router
# 再执行上面的快速启动命令
```

---

## 开发者：本地构建镜像

```bash
cd app && docker build -t 9router .

docker run --rm -p 20128:20128 \
  -v "$HOME/.9router:/app/data" \
  -e DATA_DIR=/app/data \
  9router
```

## 发布流程

推送 `v*` git tag 后，GitHub Actions 会构建多架构镜像并推送到：

- `ghcr.io/decolua/9router:v{version}` 与 `:latest`
- `decolua/9router:v{version}` 与 `:latest`

```bash
# 推荐使用 scripts/release.js
node scripts/release.js "Release title" "Notes"

# 或手动打标签
git tag v0.4.x && git push origin v0.4.x
```

工作流文件：`app/.github/workflows/docker-publish.yml`
