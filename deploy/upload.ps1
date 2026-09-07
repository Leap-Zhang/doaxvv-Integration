# =========================================================
# DOAXVV 攻略站 · 上传到目标服务器（境外/香港 VPS 或国内）
# 用法：改好下面两项 → 在项目根目录运行  powershell -File deploy\upload.ps1
# 前置：先 pnpm build（生成 dist/），并已配好 SSH 免密登录
# =========================================================

$server  = "root@8.218.203.156"      # ← 改成你的（境内/境外/香港均可）
$dest    = "/var/www/doaxvv"           # 服务器上的站点目录（与 nginx.conf 一致）

# 确保 dist 存在
if (-not (Test-Path "dist")) { Write-Host "[!] 先运行 pnpm build"; exit 1 }

Write-Host "[1/2] 确保服务器目录存在..."
ssh $server "mkdir -p $dest"

Write-Host "[2/2] 上传 dist · ${server}:${dest} ..."
ssh $server "rm -rf ${dest}/*"
scp -r dist/* "${server}:${dest}/"

Write-Host "完成。访问 https://你的域名 查看。"