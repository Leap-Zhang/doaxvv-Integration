# DOAXVV 攻略站 · 一键发布（子路径 /looklook/doaxvv/）
# 用法：项目根目录运行  powershell -File deploy\publish.ps1
# 作用：用 BASE_URL=/looklook/doaxvv/ 构建 → 剔除大图(由服务器抓取) → 上传服务器 → reload
# 前置：已配好 SSH（会用 root 密码或密钥）

$ErrorActionPreference = 'Stop'
$env:BASE_URL = '/looklook/doaxvv/'
$env:SITE_URL = 'https://leapne.com/looklook/doaxvv/'

Write-Host '[1/4] pnpm build (子路径)...'
pnpm build
if ($LASTEXITCODE -ne 0) { throw 'build 失败' }

Write-Host '[2/4] 确认图库目录存在（若本地已构建含图库则保留，随增量上传）...'

Write-Host '[3/4] 上传到服务器（走 deploy\upload.ps1）...'
& (Join-Path $PSScriptRoot 'upload.ps1')

Write-Host '[4/4] 完成。访问 https://leapne.com/looklook/doaxvv/ （若 Nginx 需 reload 可手动 systemctl reload nginx）'