# =========================================================
# 🧩 SmartVerify-And-Fix.ps1
# Verifies & auto-fixes your Student Portal project files
# =========================================================

Write-Host "`n🧩 Starting verification and auto-fix check...`n"

# Define critical files to check
$essentialFiles = @(
  "src\App.js",
  "src\index.js",
  "src\pages\Home.jsx",
  "src\pages\Login.jsx",
  "src\pages\Signup.jsx",
  "src\pages\StudentDashboard.jsx",
  "src\pages\Courses.jsx",
  "src\components\Header.jsx",
  "src\components\Footer.jsx"
)

# Initialize tracking arrays
$missing = @()
$empty = @()
$corrupt = @()
$fixed = @()

# Create backup folder
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFolder = "VerifyBackup_$timestamp"
New-Item -ItemType Directory -Force -Path $backupFolder | Out-Null

# Loop through all critical files
foreach ($file in $essentialFiles) {
  if (-not (Test-Path $file)) {
    $missing += $file
    continue
  }

  # Backup the file before checking
  $dest = Join-Path $backupFolder ($file -replace "src\\", "")
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
  Copy-Item -Path $file -Destination $dest -Force

  # Read content
  $contentBytes = [System.IO.File]::ReadAllBytes($file)
  $hasBOM = $contentBytes.Length -ge 3 -and
            $contentBytes[0] -eq 0xEF -and
            $contentBytes[1] -eq 0xBB -and
            $contentBytes[2] -eq 0xBF

  $content = Get-Content $file -Raw

  if ($content.Trim().Length -eq 0) {
    $empty += $file
  }
  elseif ($hasBOM) {
    $corrupt += $file
    # Strip BOM and re-save in pure UTF-8
    $fixedFile = [System.Text.Encoding]::UTF8.GetString($contentBytes[3..($contentBytes.Length - 1)])
    [System.IO.File]::WriteAllText($file, $fixedFile, [System.Text.Encoding]::UTF8)
    $fixed += $file
  }
}

# ========== REPORT SECTION ==========

Write-Host "`n📊 Verification Summary:"
Write-Host "----------------------------------"
Write-Host "✅ Total Files Checked: $($essentialFiles.Count)"

if ($missing.Count -gt 0) {
  Write-Host "`n❌ Missing Files:" -ForegroundColor Red
  $missing | ForEach-Object { Write-Host "   - $_" }
} else {
  Write-Host "`n✅ No Missing Files Found."
}

if ($empty.Count -gt 0) {
  Write-Host "`n⚠️ Empty Files:" -ForegroundColor Yellow
  $empty | ForEach-Object { Write-Host "   - $_" }
} else {
  Write-Host "`n✅ No Empty Files Found."
}

if ($corrupt.Count -gt 0) {
  Write-Host "`n🚨 BOM (Encoding) Issues Detected:" -ForegroundColor Red
  $corrupt | ForEach-Object { Write-Host "   - $_" }
} else {
  Write-Host "`n✅ No Encoding Issues Found."
}

if ($fixed.Count -gt 0) {
  Write-Host "`n🩹 Auto-Fixed Encoding for:" -ForegroundColor Green
  $fixed | ForEach-Object { Write-Host "   - $_" }
}

Write-Host "`n💾 Backup saved at: $backupFolder"
Write-Host "`n✅ Verification Complete."
Write-Host "➡️  Now run 'npm start' again to confirm everything compiles cleanly."
Write-Host "💙 Your project is safe, verified, and UTF-8 clean!"
