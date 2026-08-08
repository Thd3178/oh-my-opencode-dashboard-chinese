# Oh My OpenCode Dashboard（中文版）

本地运行的**只读**仪表盘，用于实时查看 OpenCode / OhMyOpenCode agent 的运行进度。

> 本分支基于上游 [oh-my-opencode-dashboard](https://github.com/WilliamJudge94/oh-my-opencode-dashboard) 扩展：
> ① **中文/英文一键切换**；② **任意工作目录模式**（无需指定 `--project`）。

![Dashboard GUI](./gui.png)

## 功能目标

- 展示 `.sisyphus/boulder.json` + 计划 markdown 的进度。
- 尽力展示后台任务（从 OpenCode 持久化会话产物中推断）。
- 展示主会话活动 + 最近工具调用活动的轻量信号。
- **绝不渲染** prompt、工具参数或原始工具输出。

## 你能看到什么

- **中英文切换按钮**（顶栏）：点击 `中文` 整个界面切换为中文，点击 `EN` 恢复英文，选择自动记忆（localStorage）。
- **主会话**：agent、当前工具/模型、会话标签/ID、最后更新时间、状态、**工作目录**。
- **计划进度**：复选框进度 + 可选步骤列表（解析自计划 markdown）。
- **主会话任务行**：检测到的主会话的汇总行。
- **来源下拉框**（可选）：切换已注册的项目来源，每个来源显示其活跃主会话。
- **后台任务**：从 `delegate_task`/`task` 工具产物尽力推断，可展开查看。
- **工具调用**（仅元数据）：每个会话的工具名/状态/时间戳，安全封顶。
- **Token 用量**：总量 + 可按模型展开的明细。
- **时序活动**：最近 5 分钟工具调用数（主代理 + 后台总计）。
- **声音通知**（可选）：进度推进 / 出现提问 / 等待用户时发出提示音。
- **原始 JSON**（脱敏）：复制 UI 正在渲染的 API 负载。

## 环境要求

- Bun

## 安装（源码）

```bash
git clone https://github.com/Thd3178/oh-my-opencode-dashboard-chinese.git
cd oh-my-opencode-dashboard-chinese
bun install
```

> 如果 `bun install` 报缺包，可改用 `npm install`。

## 运行

**生产模式**（先构建页面，再启动服务器；改过代码后需要重新 build）：

```bash
bun run build
bun run start            # 无 --project：任意工作目录模式
# 或指定项目：bun run start -- --project D:\path\to\your\project
```

**开发模式**（Vite 热更新，无需手动 build）：

```bash
bun run dev
```

启动后浏览器打开 **http://127.0.0.1:51234**，点顶栏 **「中文」** 切换为中文界面。

### 全局命令（推荐）

任意目录下直接运行（已在本机配置全局启动器，指向本 fork 最新代码）：

```powershell
oh-my-opencode-dashboard            # 任意工作目录模式
oh-my-opencode-dashboard --project "D:\path\to\your\project"   # 指定项目
```

> 注意：`bunx oh-my-opencode-dashboard@latest` 拉取的是 **npm 官方原版（英文）**，不含本分支的中文切换功能。本分支的改动未发布到 npm，需从源码运行。

### 命令行参数

| 参数 | 说明 | 默认值 |
|---|---|---|
| `--project <path>` | 项目根目录，用于计划查找 + 会话过滤。**省略时跟踪所有工作目录的会话（最近更新者胜出）** | 无（任意目录模式） |
| `--host <hostname>` | 绑定地址（也可用环境变量 `OMO_DASHBOARD_HOST`） | `127.0.0.1` |
| `--port <number>` | 端口 | `51234` |

## 语言切换

- 默认英文（与上游 UI 完全一致）；点顶栏 **`中文`** 按钮切换为中文，点 **`EN`** 恢复英文。
- 选择保存在 `localStorage`（`omoDashboardLang`），刷新不丢。
- 服务端原始数据（Raw JSON 视图）始终保持英文原样，只翻译渲染层文案。
- 服务端状态词在渲染时映射（如 `busy` → 忙碌、`in progress` → 进行中）；未知值原样透传。

## 数据来源（SQLite + 旧版文件）

- 项目（可选；OhMyOpenCode 计划追踪）：
  - `.sisyphus/boulder.json`
  - `boulder.active_plan` 指向的计划文件
- OpenCode 存储（自动检测，只读）：
  - SQLite（优先）：`${XDG_DATA_HOME ?? ~/.local/share}/opencode/opencode.db`
  - WAL 附属文件：`opencode.db-wal`、`opencode.db-shm`
  - 旧版文件存储（回退）：`${XDG_DATA_HOME ?? ~/.local/share}/opencode/storage/{session,message,part}`

SQLite 在 `opencode.db` 存在、可只读打开且包含所需表（`session`、`message`、`part`）时视为可用。SQLite 读取失败（busy/损坏/打不开/查询错误）且存在旧版存储时，自动回退到文件模式。

仪表盘对 `opencode.db` 及 WAL 文件做尽力而为的文件监听，轮询仍是正确性基线。

## 如何选择会话

- 若存在 `.sisyphus/boulder.json`，优先选择其中 `session_ids[]` 里最新的、且仍存在的会话。
- 否则回退到目录与 `--project` 精确匹配（realpath 归一化）的最近更新会话。
- **不传 `--project`（任意目录模式）**：完全不过滤目录 —— 显示**所有工作目录中最近更新的会话**，任意位置启动都能看到 agent 在干什么；主会话卡片会显示该会话的**工作目录**。

## 纯净 OpenCode（无 OhMyOpenCode）

没有 `.sisyphus/` 也能使用：

- 计划进度显示为 "not started"（缺少 `boulder.json` 的正常表现）。
- 工具调用视图仅元数据（工具名/状态/时间/次数），绝不渲染 prompt、工具参数、输出或错误。
- 会话发现使用精确目录匹配（realpath 归一化，无前缀/包含匹配）。

## 隐私 / 脱敏

- 不显示 prompt。
- 不显示工具参数（`state.input`）。
- 不显示原始工具输出或错误（`state.output`、`state.error`）。
- 后台任务只提取白名单字段（如 `description`、`subagent_type`/`category`）并推导计数/时间戳。
- 来源切换使用注册标签，UI 不显示绝对项目根路径。

## 安全

- 默认绑定 `127.0.0.1`。
- 路径访问基于 realpath 白名单，防止符号链接逃逸：
  - 项目根目录
  - OpenCode 存储根目录

## 限制

- 后台任务状态是对持久化产物的尽力推断。
- 若 OpenCode 存储目录缺失或不可读，相关区域会显示空/未知状态。

## 故障排查

- 开发模式下显示 "Disconnected"：确认 API 服务器在运行，且 UI 走 Vite 代理。
- 计划进度为空：添加 `.sisyphus/boulder.json`（OhMyOpenCode），或视为纯净模式的正常表现。
- 检测不到会话：先在精确项目目录里运行一次 OpenCode。
- 检测不到会话：确保 `--project` 与会话元数据中的真实路径一致（符号链接会有影响）。
- 检测不到会话：确认 OpenCode 存储位于 `${XDG_DATA_HOME ?? ~/.local/share}/opencode/storage`（检查 `XDG_DATA_HOME`）。
- SQLite 模式看起来陈旧：OpenCode 可能通过 WAL（`opencode.db-wal`、`opencode.db-shm`）写入；轮询是基线，文件监听是尽力而为。
- SQLite 模式失败且存在旧版存储：会自动回退。只有 SQLite 时，尝试关闭 OpenCode（释放锁）后刷新仪表盘。

## 发布（维护者）

本包通过 GitHub Actions 使用 npm Trusted Publishing（OIDC）发布（无需 `NPM_TOKEN`）。本分支目前未发布到 npm。
