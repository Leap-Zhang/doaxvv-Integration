# DOAXVV 攻略站 · 部署手册（两阶段）

> 纯静态 Astro 站点。**先上 GitHub Pages 立即访问，再迁到自有域名 + 境外/香港 VPS（A 方案）。**

## 路线总览
| 阶段 | 方案 | 说明 | 上线速度 |
|---|---|---|---|
| 阶段一 | GitHub Pages | 免费、无需服务器/备案，地址 `https://<你的用户名>.github.io/<仓库名>/` | 分钟级 |
| 阶段二 | 自有境外/香港 VPS + 域名（A） | 类似 doax.cc：境外服务器**无需 ICP**，可绑自定义域名 | 约 1 天 |

> 选 A 而非国内备案：`doax.cc` 的服务器就是**境外/香港**，因此**免备案**；国内服务器反而要 1–3 周备案。若确要国内服务器，见文末「附：国内备案」。

## 阶段一 · GitHub Pages（现在先做）

### 1) 建仓库 + 推送
- 在 GitHub 新建一个**空仓库**（Public 更省事），如 `doaxvv-wiki`，**不要**勾选 Add README。
- 项目根目录执行（仓库里的 `public/img/bromide/` 已放开，女孩/星级立绘会一并推送）：
```
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git add -A
git commit -m "feat: DOAXVV 攻略站（GitHub Pages 部署）"
git push -u origin master
```
- 仓库自带 `.github/workflows/deploy.yml`，推送后 Actions 会自动构建 50 页并发布。

### 2) 开启 GitHub Pages
- 仓库 → **Settings → Pages → Source = GitHub Actions**。
- 等 Actions 跑完，访问：`https://<你的用户名>.github.io/<仓库名>/`。

> 全站已完成**子路径（base）适配**：链接、页面、泳装/女孩/技能图鉴、背景照片、`data/*.json` 都会自动加上 `<仓库名>/` 前缀，**不裂图、不 404**（本轮已修复）。

### 3) 以后每次改版
```
pnpm build && git add -A && git commit -m "update" && git push
```
Actions 自动重新构建并发布。

## 阶段二 · 迁移到自有域名 + 境外/香港 VPS（A 方案）

> 复用你已有的 doax.cc 系域名，或另注册一个。**境外/香港服务器免 ICP。**

### 1) 买境外/香港 VPS
- 香港 / 东京 / 新加坡 轻量云（Ubuntu 64bit，1C2G 即可）。
- 放行 **22/80/443**；记录公网 IP 与 SSH 密钥。

### 2) 上传站点
```
pnpm build
powershell -File deploy\upload.ps1   # 先改 upload.ps1 顶部的 $server
```
或手动把 `dist/` 传到 `/var/www/doaxvv`。

### 3) 配置 Nginx
```
sudo cp deploy/nginx.conf /etc/nginx/sites-available/doaxvv   # 把 server_name 改成你的域名
sudo ln -s /etc/nginx/sites-available/doaxvv /etc/nginx/sites-enabled/doaxvv
sudo nginx -t && sudo systemctl reload nginx
```

### 4) 域名解析 + HTTPS
- 域名控制台加 **A 记录**：`@` / `www`（或子域名 `wiki`）→ VPS 公网 IP。
- 境外服务器**不用备案**，解析后即可访问。
- 用 `certbot` 或云证书申请 HTTPS。

### 5) 从 GitHub 切到 VPS
- 只需把域名的 A/CNAME 记录**改指向 VPS**，可无缝迁移；GitHub Pages 那份留作备用或删除。

## 附：国内服务器（备案路线）
- 若确要用国内服务器：需 **ICP 备案（1–3 周）**（实名 + 购国内服务器 + 提交备案），其余上传/Nginx/HTTPS/解析步骤同上，但**备案通过前域名无法解析到国内服务器**。
- **版权提醒**：站内为《DOAXVV》攻略与光荣特库摩版权图片，建议**资讯/学习向、不商用**，以降低投诉/监管风险。

## 本仓库已配置
- `.github/workflows/deploy.yml`：GitHub Pages 自动构建发布（触发 `main`/`master` 与手动）。
- `public/img/bromide/`：女孩/星级立绘（已从 `.gitignore` 放开，随 Git 部署）。
- 全站 base 感知：已修复「子路径部署下链接/图片/背景/data JSON 404」问题。