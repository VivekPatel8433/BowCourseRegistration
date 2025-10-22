# Run-StudentPortal.ps1
# Automates cleaning, installing dependencies, and launching the Student Dashboard

Write-Host "Starting Student Dashboard Setup..." -ForegroundColor Cyan

# Go to project folder
Set-Location "C:\Users\imeiq\OneDrive\Documents\BowCourseRegistration\temp-app"

# Step 1: Clean up previous build files
Write-Host "Cleaning old build files..." -ForegroundColor Yellow
if (Test-Path ".\node_modules") { Remove-Item -Recurse -Force ".\node_modules" }
if (Test-Path ".\build") { Remove-Item -Recurse -Force ".\build" }

# Step 2: Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Step 3: Launch the app
Write-Host "Launching Student Dashboard..." -ForegroundColor Green
Start-Process "http://localhost:3000"
npm start