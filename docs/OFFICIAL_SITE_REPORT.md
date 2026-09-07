# DOAXVV 官方网站（game.doaxvv.com）全面分析报告

> 分析日期：2026-09-07　|　对象：`https://game.doaxvv.com`（简中站）+ `game-test.doaxvv.com`（角色档案源）
> 用途：为本攻略站提供**官方数据/素材**与**自动更新**依据。

---

## 一、站点总览
- 官方《DEAD OR ALIVE Xtreme Venus Vacation》官网（光荣特库摩）。
- **多语言**：EN / 繁體 / 简体 / 한국어（`/cn/` 为简中站）。
- **平台**：Steam® + Johren®, CERO D，基本免费 + 付费道具。
- **版权**：©KOEI TECMO GAMES CO.,LTD.
- **技术**：静态 HTML（jQuery 加载块），含 Google Analytics（G-Z8LHWSNKFP）与 GTM（GTM-539VWWD / GTM-TLCJWJ）。

## 二、站点导航结构（简中）
| 板块 | 入口 | 内容 |
|---|---|---|
| **Top** | `/cn/` | 首页：介绍、角色展示、系统规格 |
| **Latest Info** | `/cn/#news` | 新闻/公告（加载 `/cn/list/*.html`） |
| **Game Features** | `/cn/#features` | 游戏特色 |
| **Characters** | `/cn/characters.html` + `/cn/cXX.html` | 30+ 角色 |
| **Spec** | `/cn/#spec` | 系统需求/运行环境 |
| **Special** | `_*.html`（staff/license/privacy/photo_contest/swimsuit_contest/lp/redirect_steamstore） | 特别内容 |
| **Help** | `/production/html/information/help_cn.html` | 安装步骤 / 故障处理 |

## 三、Latest Info（公告/新闻 — 最可复用）
- 通过 jQuery `load` 拉取 4 个列表，均为**可直接抓取的 HTML**：
  - `/cn/list/top_news.html` —— 主公告（**扭蛋/泳装/活动/版本更新**），条目含 `href`（详情页）+ 日期 + 标题。
  - `/cn/list/top_maintenance.html` —— 系统维护日程。
  - `/cn/list/top_banner.html` —— 顶部横幅。
  - `/cn/list/top_movie.html` —— 宣传影片。
- **公告详情页**：`https://game.doaxvv.com/production/html/information/info_<slug>_cn.html?GameView=Y`。
- 示例条目（2026-08~09）：特惠V宝石包、怀旧/流行套装扭蛋、`True Colors 莫妮卡(下半场)`、伊莉丝生日扭蛋/礼包、`Ver.08.22.01 更新内容`、赌场更新等。

## 四、Characters（角色档案）
- 角色列表：`/cn/characters.html`；单角色：`/cn/cXX.html`（如 `c00`=海咲、`c01`=玛莉萝丝…）。
- **单角色页含**（官方档案）：年龄、身高、三围（B/W/H）、血型、职业、兴趣、喜欢的食物、喜欢的颜色、生日。
- 例（`c00` 海咲）：18 岁 / 156cm / B85·W54·H89 / A 型 / 学生 / 潜水·漫画·天文观测 / 芒果香草可丽饼 / 桔黄色 / 7月7日。
- **可复用点**：本项目已用 `tools/fetch_official_profile.cjs` 抓 `game-test.doaxvv.com/cn/<cid>.html`（`c00`…映射）生成 `official-girls.json`（职业/兴趣/食物/颜色）。

## 五、Spec（系统需求）
- 平台 Steam，服务中，基本免费。
- **运行环境**：Windows 11 64bit；内存 8GB 以上；硬盘 20GB 以上；GPU（最低 Core i3-8100 内显 / 60帧 GTX 960 2GB；4K 推荐 GTX 1080Ti 11GB）；30/60 帧可切换；支持 DirectX 11。
- 特效：软绵绵引擎 2.0（高质模型、衣服滑落、晒黑、潮红、高级肌肤/变形）。

## 六、资源（可复用/可链接）
- 背景图、CSS/JS、角色/活动图、宣传音效（`/wp-content/themes/doaxvv-global/sound/*.mp3`）。
- 各语言跳转、客户支持（Steam/Johren）、EULA、隐私政策。

## 七、用于本站的「可复用数据 + 自动更新」清单
| 数据 | 官方源 | 本站现状/建议 |
|---|---|---|
| 官方公告/活动/扭蛋/版本 | `top_news.html` | ✅ 已抓取→`official-news.json`，`fetch_news.cjs` + 每日 02:00 自动更新 |
| 系统维护 | `top_maintenance.html` | 建议并入“官方动态”或 `/updates` |
| 角色官方档案 | `game-test.doaxvv.com/cn/cXX.html` | ✅ 已生成 `official-girls.json`（角色页职业/兴趣/食物/颜色） |
| 系统需求/Spec | `/cn/#spec` | 可整理为“关于本作·运行配置” |
| 官网链接 | 官网/角色页/公告页 | ✅ 页脚已加 `game.doaxvv.com`；首页活动区已加官网 |

## 八、抓取与更新可行性
- 官方站为**静态 HTML**，`Invoke-WebRequest` 可直接抓取，无需 JS 渲染（公告列表为直出 HTML）。
- 公告会随版本每日常变 → 已做成 `pnpm run data:update` 一键刷新 + GitHub Actions 每日自动拉取。
- 角色档案较稳定 → 可按需/定期重抓 `cXX.html` 更新 `official-girls.json`。

## 九、注意
- 站内为 KOEI TECMO 版权图片与内容，本站保持**资讯/学习向、非商用**，注明来源。
- 官方站含第三方统计（GA/GTM）；抓取请控制频率，仅用于同步公开资料。

---
> 报告完。可据此进一步：把“系统维护”接到 `/updates`、把 Spec 整理成站内“关于”页、或完善官方角色档案采集。