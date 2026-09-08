# =========================================================
# DOAXVV 攻略站 · 上传到目标服务器（阿里云 香港）— 增量同步版
# 用法：在项目根目录运行  powershell -File deploy\upload.ps1
# 前置：已 pnpm build（生成 dist/），并已配好 SSH（免密或密码）
#
# 说明：优先用 rsync 增量同步（只传变化文件，不删除服务器上已有的
#       img/suits、img/portraits 大图库）；无 rsync 时回退 scp（也不删图库）。
#       本机 dist 若含图库会一并上传；若被剔除则保留服务器已有图库。
# =========================================================

$server  = "root@8.218.203.156"      # 服务器
$dest    = "/var/www/looklook/doaxvv"  # 子路径站点目录（与 Nginx 一致）

if (-not (Test-Path "dist")) { Write-Host "[!] 先运行 pnpm build"; exit 1 }

Write-Host "[1/2] 确保服务器目录存在..."
ssh $server "mkdir -p $dest"
if (-not $?) { Write-Host "[!] 连接失败"; exit 1 }

# 探测服务器是否安装 rsync
$hasRsync = (ssh $server "command -v rsync" 2>$null) -match 'rsync'
if ($hasRsync) {
    Write-Host "[2/2] 使用 rsync 增量同步（保留服务器图库）..."
    # 不 --delete：避免误删服务器已有的大图库；只增量覆盖变化文件
    rsync -az --info=stats1 -e ssh dist/ "${server}:${dest}/"
} else {
    Write-Host "[2/2] 服务器无 rsync，回退 scp（保留服务器图库）..."
    # 不 rm 服务器图库；仅覆盖同名站点文件
    scp -q -r dist/* "${server}:${dest}/"
}

Write-Host "完成。访问 https://leapne.com/looklook/doaxvv/"
