# =========================================================
# DOAXVV 攻略站 · 泳装大图库分批上传（免密 SSH，断点续传）
# 前置：已配置到 $server 的免密登录；先构建含图库的 dist。
# 用法：powershell -File deploy\upload-suits.ps1
# 断点：服务器以 .suits_batch/<i>.done 标记批完成，已完成的批自动跳过，
#       可反复运行继续；带宽 20-30KB/s 时 758MB 约需 8-10 小时。
# =========================================================
$server  = "root@8.218.203.156"
$dest    = "/var/www/looklook/doaxvv"
$distRoot = Join-Path (Get-Location) "dist"
$src     = Join-Path $distRoot "img\suits"
$BATCH   = 250
$TMP     = Join-Path $env:TEMP "doaxvv_suits_batches"

if (-not (Test-Path $src)) { Write-Host "[!] 缺少 $src，先运行 BASE_URL=... pnpm build"; exit 1 }
New-Item -ItemType Directory -Force -Path $TMP | Out-Null

$files = @(Get-ChildItem -File $src -Filter *.webp | Sort-Object Name)
$total = $files.Count
Write-Host "泳装图共 $total 张，分 $([math]::Ceiling($total/$BATCH)) 批，每批 $BATCH 张。"

ssh -o BatchMode=yes $server "mkdir -p $dest/.suits_batch $dest/img/suits"

$done = 0
for ($i = 0; $i -lt $total; $i += $BATCH) {
    $batchIdx = [int]($i / $BATCH) + 1
    $chunk = @($files | Select-Object -Skip $i -First $BATCH)
    $tar = Join-Path $TMP ("suits_{0}.tar.gz" -f $batchIdx)
    $listFile = Join-Path $TMP ("suits_{0}.list" -f $batchIdx)

    $isDone = ssh -o BatchMode=yes $server "test -f $dest/.suits_batch/$batchIdx.done && echo YES || echo NO"
    if ($isDone -match 'YES') { $done += $chunk.Count; Write-Host "[跳过] 批 $batchIdx 已完成（累计 $done/$total）"; continue }

    if (-not (Test-Path $tar)) {
        $names = @($chunk | ForEach-Object { "img/suits/"+$_.Name })
        Set-Content -LiteralPath $listFile -Value $names
        Push-Location $distRoot
        tar -czf $tar -T $listFile
        Pop-Location
    }
    $sz = [math]::Round((Get-Item $tar).Length/1MB,1)
    Write-Host ("[上传] 批 {0}  ({1}张 / {2}MB)..." -f $batchIdx, $chunk.Count, $sz)

    # 上传（批内最多重试5次，抗偶发断网）
    $uploaded = $false
    for ($t = 1; $t -le 5; $t++) {
        scp -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=3 $tar "${server}:/tmp/suits_${batchIdx}.tar.gz"
        if ($LASTEXITCODE -eq 0) { $uploaded = $true; break }
        Write-Host ("[重试{0}] 批 {1} 上传失败，{2}s 后重试..." -f $t, $batchIdx, ($t * 20))
        Start-Sleep -Seconds ($t * 20)
    }
    if (-not $uploaded) { Write-Host ("[!] 批 {0} 上传多次失败，保留本地包，下次重试" -f $batchIdx); continue }

    # 解包（批内最多重试5次）
    $extracted = $false
    for ($t = 1; $t -le 5; $t++) {
        ssh -o BatchMode=yes $server "tar -xzf /tmp/suits_${batchIdx}.tar.gz -C $dest && touch $dest/.suits_batch/${batchIdx}.done && rm -f /tmp/suits_${batchIdx}.tar.gz"
        if ($LASTEXITCODE -eq 0) { $extracted = $true; break }
        Write-Host ("[重试{0}] 批 {1} 解包失败，{2}s 后重试..." -f $t, $batchIdx, ($t * 20))
        Start-Sleep -Seconds ($t * 20)
    }
    if (-not $extracted) { Write-Host ("[!] 批 {0} 解包多次失败" -f $batchIdx); continue }

    Remove-Item $tar -Force -ErrorAction SilentlyContinue
    Remove-Item $listFile -Force -ErrorAction SilentlyContinue
    $done += $chunk.Count
    Write-Host ("[完成] 批 {0}  累计 {1}/{2}" -f $batchIdx, $done, $total)
}
Write-Host "结束。服务器 img/suits 文件数："
ssh -o BatchMode=yes $server "ls $dest/img/suits/*.webp 2>/dev/null | wc -l"