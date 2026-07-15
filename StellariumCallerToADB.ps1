param(
  [switch]$NoBuild
)

$ErrorActionPreference = "Stop"
$PackageName = "jv.stellariumcaller.stellariumcaller"
$LauncherActivity = "jv.stellariumcaller.stellariumcaller/.MainActivity"
$ProjectRoot = Join-Path $PSScriptRoot "StellariumCaller"

# Locate APK after release build — try signed first, fallback to unsigned
$SignedApk = Join-Path $ProjectRoot "app\build\outputs\apk\release\app-release.apk"
$UnsignedApk = Join-Path $ProjectRoot "app\build\outputs\apk\release\app-release-unsigned.apk"

if (-not $NoBuild) {
  if (-not $env:TOKEN) {
    $env:TOKEN = [Environment]::GetEnvironmentVariable("TOKEN", "User")
  }
  if (-not $env:TOKEN) {
    $env:TOKEN = [Environment]::GetEnvironmentVariable("TOKEN", "Machine")
  }
  if (-not $env:TOKEN) {
    Write-Host "  ERROR: TOKEN environment variable is not set." -ForegroundColor Red
    Write-Host "  Set it in System Properties > Environment Variables or run:" -ForegroundColor Gray
    Write-Host "    `$env:TOKEN = `"your-secret-token`"" -ForegroundColor Gray
    exit 1
  }
  Write-Host "[1/3] Building release APK (TOKEN found, length=$($env:TOKEN.Length))..." -ForegroundColor Cyan
  Push-Location $ProjectRoot
  try {
    & ./gradlew assembleRelease --no-configuration-cache --no-daemon
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }
  } finally { Pop-Location }

  # If unsigned, sign with the Android debug keystore so it can be installed
  if ((Test-Path $UnsignedApk) -and -not (Test-Path $SignedApk)) {
    Write-Host "  Signing with debug keystore..." -ForegroundColor Yellow
    $AndroidHome = [Environment]::GetEnvironmentVariable("ANDROID_HOME", "User")
    if (-not $AndroidHome) { $AndroidHome = [Environment]::GetEnvironmentVariable("ANDROID_HOME", "Machine") }
    if (-not $AndroidHome) { $AndroidHome = "$env:LOCALAPPDATA\Android\Sdk" }
    $BuildTools = Get-ChildItem "$AndroidHome\build-tools" -Directory | Sort-Object Name -Descending | Select-Object -First 1
    $ApkSigner = "$($BuildTools.FullName)\apksigner.bat"
    $DebugKeystore = "$env:USERPROFILE\.android\debug.keystore"
    if ((Test-Path $ApkSigner) -and (Test-Path $DebugKeystore)) {
      & $ApkSigner sign --ks $DebugKeystore --ks-pass pass:android `
        --ks-key-alias androiddebugkey --key-pass pass:android `
        --out $SignedApk $UnsignedApk
      if ($LASTEXITCODE -ne 0) { throw "Signing failed" }
      Write-Host "  Signed: $SignedApk" -ForegroundColor Green
    } else {
      Write-Host "  WARNING: Debug keystore not found at $DebugKeystore" -ForegroundColor Red
      Write-Host "  The unsigned APK won't install. Install Android SDK build-tools or use a debug build." -ForegroundColor Red
      exit 1
    }
  }
}

# Pick the right APK for install
$ApkPath = if (Test-Path $SignedApk) { $SignedApk } else { $UnsignedApk }

Write-Host "[2/3] Checking ADB device..." -ForegroundColor Cyan
$devices = & adb devices
if ($devices -match "[a-f0-9]+\s+device") {
  Write-Host "  Device found." -ForegroundColor Green
} else {
  Write-Host "  No device connected. Plug in your device and enable USB debugging." -ForegroundColor Red
  exit 1
}

Write-Host "[3/3] Installing and launching..." -ForegroundColor Cyan
Write-Host "  APK: $ApkPath" -ForegroundColor Gray

Write-Host "  Uninstalling previous version..." -ForegroundColor Yellow
$null = & adb uninstall $PackageName 2>&1

& adb install -r -d $ApkPath
if ($LASTEXITCODE -ne 0) { throw "Install failed" }

& adb shell am start -n $LauncherActivity -W --activity-clear-top 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
  Write-Host "  Done! App launched." -ForegroundColor Green
}
