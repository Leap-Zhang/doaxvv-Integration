# DOAXVV 攻略站 · 数据接口（前后端分离 · 随用随调）

本站为**前后端分离**：**前端**只负责渲染（Astro 页面），**后端**是静态数据服务 `/api/*.json`（随 GitHub Pages 一起上传，按需拉取）。前端与任何外部工具都可直接调用该接口。

## 接口地址

- 本地预览：`http://localhost:4321/api/...`
- GitHub Pages（仓库 `Leap-Zhang/doaxvv-Integration`）：`https://Leap-Zhang.github.io/doaxvv-Integration/api/...`
  > 换用户名/仓库名时，前缀自动变为 `/你的用户名/仓库名/`（`deploy.yml` 按 repo 动态取 `base`）。

## 端点（以 `/api/meta.json` 为准，构建时由 `pnpm api` 生成）

| 端点 | 说明 |
|---|---|
| `/api/meta.json` | 接口索引：数据快照、来源、各端点条数 |
| `/api/doax-girls.json` | 全部女孩（中/英/日名、类型、Lv1/Lv100 属性、生日、CV、身高三围） |
| `/api/doax-ssr.json` | 全部 SSR 泳装（名称(中/EN/日)、类型、POW/TEC/STM/APL、技能、登场/复刻） |
| `/api/doax-skills.json` | 全部技能（名称/效果 中英日、A/F/P 类型） |
| `/api/doax-level.json` | 100 级经验表 |
| `/api/doax-help.json` | 官方帮助条目（中文） |
| `/api/girl-names.json` | 角色名映射（zh/en/ja） |
| `/api/suits/{girl}.json` | 按角色的泳装子集（34 个文件） |
| `/api/official-news.json` | 官方公告/新闻 |
| `/api/doax-ssr-steam.json`、`/api/doax-accessory.json`、`/api/doax-emphasis.json`、`/api/doax-room.json`、`/api/doax-banner.json`、`/api/doax-event.json` | 其他参考数据 |

## 随用随调（示例）

```bash
curl https://Leap-Zhang.github.io/doaxvv-Integration/api/doax-ssr.json | head      # 全部泳装
curl …/api/suits/kasumi.json                                              # 某角色泳装
curl …/api/meta.json                                                      # 接口索引
```

- 静态接口不提供服务端筛选，需要时调用方**本地过滤/分页**；均返回 `application/json`。
- 前端用 `data-base` 拼绝对路径：`document.documentElement.getAttribute('data-base') + 'api/doax-ssr.json'`，子路径部署下自动正确。

## 资源上传

- `public/img/portraits/`（女孩立绘）、`public/img/suits/`（泳装图鉴 6490 张）、`public/api/`（数据）均随 `dist` 由 `deploy.yml` 上传到 GitHub Pages。
- 本地构建：`pnpm build`（自动生成 `/api/meta.json` 后构建）。
- 数据更新：`pnpm data:update`（更新 `src/data`）→ `pnpm build` 发布；`update-data.yml` 每日自动执行。

## 版权与来源
数据整理自 doax.cc / 官方 Game Help / 社区攻略；图片与攻略版权归原作者，本站仅本地演示与自用参考。