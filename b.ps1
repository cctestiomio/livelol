$PkgPath = ".\package.json"
$WatcherPath = ".\src\components\Match\LiveAPIWatcher.tsx"
$ValApiPath = ".\src\utils\ValorantAPI.ts"

# 1. Fix Node 24 OpenSSL Error in package.json
if (Test-Path $PkgPath) {
    $Pkg = Get-Content $PkgPath | ConvertFrom-Json
    $Pkg.scripts.start = "set NODE_OPTIONS=--openssl-legacy-provider && react-scripts start"
    $Pkg | ConvertTo-Json -Depth 10 | Set-Content $PkgPath
    Write-Host "Fixed package.json for Node 24 compatibility." -ForegroundColor Green
}

# 2. Force sub-second refresh in the Watcher
if (Test-Path $WatcherPath) {
    $Watcher = Get-Content $WatcherPath -Raw
    # Change 1000ms or 5000ms to 500ms for faster updates
    $Watcher = $Watcher -replace '1000', '500' -replace '5000', '500'
    Set-Content $WatcherPath $Watcher
    Write-Host "Updated LiveAPIWatcher for sub-second refresh." -ForegroundColor Green
}

# 3. Update Valorant API to use V2 endpoints
if (Test-Path $ValApiPath) {
    $Val = Get-Content $ValApiPath -Raw
    $Val = $Val -replace '/match/live', '/v2/match?q=live_score'
    $Val = $Val -replace '/match/upcoming', '/v2/match?q=upcoming'
    Set-Content $ValApiPath $Val
    Write-Host "Updated ValorantAPI to use V2 endpoints." -ForegroundColor Green
}