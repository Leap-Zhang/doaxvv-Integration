# DOAXVV 攻略站

《死或生 沙滩排球：维纳斯假期》（DOAXVV）的中/英/日三语攻略 wiki。静态站点，基于 **Astro + Tailwind CSS**，数据取自 doax.cc 并**全部本地化**，方便离线浏览与后续部署。

## 技术栈
- Astro 5（静态输出）
- Tailwind CSS v4（`@tailwindcss/vite`）
- 前端检索（自建索引 `/search`）
- 数据：doax.cc 的 girl / ssr / skill JSON（已本地化于 `src/data/`、`public/data/`）

## 目录结构
```
src/
  layouts/Base.astro          全局布局 + 语言切换
  components/                 指南/来源块组件
  data/                       本地化数据（角色/泳装/技能/词库）
  pages/
    index.astro               首页
    girls/                    女孩图鉴（列表 + 详情）
    swimsuits/                泳装图鉴（3191 件）
    skills/                   技能图鉴（401 个）
    guide/                    系统指南（5 页）
    community.astro            社区攻略
    search/                   全站检索
public/
  img/bromide/girls/          角色立绘（33 张，源自 doax.cc 图鉴包）
  data/                       运行时数据（供客户端拉取）
tools/doax/                   数据抓取/生成脚本（可复现）
bromide_dl/                   图鉴包源（约 12GB，.gitignore 排除）
```

## 本地开发
```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # 产物在 dist/
pnpm preview    # 预览构建产物
```

> **不想装 Node 也想先看看效果**：双击打开 `dist/index.html` 可看到首页（多数静态区域正常）。但泳装/技能/搜索/收藏等“运行时拉数据”的页面需要本地服务才能完整渲染：若装了 Python，可在 `dist` 目录跑 `python -m http.server 4321` 再访问 `http://localhost:4321`；更省事是装 Node 后用 `pnpm preview`。

## 视觉回归（Playwright）
自动给每个页面截图并与“基准”比对，抓外观回归。配置：`playwright.config.ts`，测试：`tests/visual.spec.ts`。

- 首次：`pnpm exec playwright install chromium`（下载测试用 Chromium，一次性）
- 跑一次存基准：`pnpm test:visual`
- 日常：`pnpm build` → `pnpm test:visual`（全绿=没改坏；红叉=看 `test-results/` 里的 `diff.png`）
- 确认本次外观变化为新基准：`pnpm test:visual:update`
- 覆盖：14 个路由 × 明/暗 全页 + 泳装/女孩/技能 3 个弹窗态（共 31 用例）

> `tests/__screenshots__/`＝基准（提交）；`test-results/`＝临时产物（已 `.gitignore` 排除）。

## 多语言
- 界面与数据支持 **中文 / English / 日本語**，顶栏切换或 `?lang=en|ja` 直达。
- 词库取自 doax.cc 的多语数据（`girl-names`、`doax-ssr`、`doax-skills`），UI 文案在 `src/data/i18n.js`。

## 数据来源与更新
- 数据以 **doax.cc** 为准，已本地化到 `src/data/*.json` 与 `public/data/*.json`。
- 更新：`node tools/doax/gen_from_api.cjs`（从 `tools/doax/raw/*.json` 重新生成数据模块）。

## 部署（GitHub Pages）
已内置 `.github/workflows/deploy.yml`。推送到 `main` 后自动构建并发布。
- **注意**：Astro 输出为静态站，`public` 下的资源与内部链接使用绝对路径。更新 `astro.config.mjs` 的 `BASE_URL`（详见工作流中 `BASE_URL=/仓库名/`）。本地预览默认 `base=/`，部署时自动带上仓库子路径。

> 非官方站点。内容整理自官方帮助文档与社区公开资料，图片与攻略版权归原作者，仅供自用参考。
