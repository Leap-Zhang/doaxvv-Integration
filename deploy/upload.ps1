# =========================================================
# DOAXVV 攻略站 · 上传到目标服务器（境外/香港 VPS 或国内）— 增量版
# 用法：改好下面两项 → 在项目根目录运行  powershell -File deploy\upload.ps1
# 前置：先 pnpm build（生成 dist/），并已配好 SSH 免密登录
#
# 增量同步:优先使用 rsync（只传变化文件，图库已存在则跳过），大幅提速；
# 服务器无 rsync 时自动回退到 scp 全量覆盖。
# =========================================================

$server  = "root@8.218.203.156"      # ← 改成你的（境内/境外/香港均可）
$dest    = "/var/www/looklook/doaxvv"   # 与 nginx.conf 的 /looklook/doaxvv/ 子路径一致（root=/var/www）

# 确保 dist 存在
if (-not (Test-Path "dist")) { Write-Host "[!] 先构建：BASE_URL=/looklook/doaxvv/ pnpm build"; exit 1 }

Write-Host "[0/3] 确保服务器目录存在..."
ssh $server "mkdir -p $dest" || exit 1

# 探测服务器是否安装 rsync
$hasRsync = ssh $server "command -v rsync" 2>$null
if ($hasRsync) {
  Write-Host "[1/3] 使用 rsync 增量同步（仅传变化文件）..."
  rsync -az --info=stats1 -e ssh dist/ "${server}:${dest}/"
} else {
  Write-Host "[1/3] 服务器无 rsync，回退 scp 全量上传..."
  ssh $server "rm -rf ${dest}/*"
  scp -q -r dist/* "${server}:${dest}/"
}

Write-Host "[2/3] 设置目录权限..."
ssh $server "chmod -R a+rX ${dest}" 2>$null

Write-Host "[3/3] 完成。访问 https://你的域名 查看。"