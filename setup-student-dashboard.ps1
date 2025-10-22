# ============================================
# 🎓 Student Dashboard Auto Setup for React App
# ============================================

Write-Host "========================================="
Write-Host "  🚀 BowCourseRegistration Student Setup"
Write-Host "========================================="

# Step 1: Go to your main working folder
Set-Location "C:\Users\imeiq\OneDrive\Documents\BowCourseRegistration"

# Step 2: Clean up any previous temp folder
if (Test-Path ".\student-app") {
    Write-Host "🧹 Removing old student-app folder..."
    Remove-Item -Recurse -Force ".\student-app"
}

# Step 3: Clone the latest group project
Write-Host "📥 Cloning BowCourseRegistration from GitHub..."
git clone https://github.com/VivekPatel8433/BowCourseRegistration.git student-app

# Step 4: Enter the new folder
Set-Location ".\student-app"

# Step 5: Remove nested .git to avoid repo conflicts
if (Test-Path ".\.git") {
    Write-Host "🧩 Removing nested .git..."
    Remove-Item -Recurse -Force ".\.git"
}

# Step 6: Install npm dependencies
Write-Host "⚙ Installing npm packages..."
npm install

# Step 7: Launch the app on localhost:3000
Write-Host "🎓 Starting Student Dashboard..."
npm start
