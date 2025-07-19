# Exit on error
$ErrorActionPreference = "Stop"

# Define URLs
$url1 = "https://github.com/Delpat-Tech/delpat.git"
$url2 = "https://github.com/Ashackq/dp_website.git"

# Step 1: Go up one directory and pull from URL 1
Write-Host "Pulling from URL 1..."
git remote set-url origin $url1
git pull origin main  # Change to 'master' if needed

# Step 2: pull from URL 2
Write-Host "Pulling from URL 2..."
git remote set-url origin $url2
git pull origin main  # Change to 'master' if needed

# Step 3: Commit and push any changes to URL 2
Write-Host "`n🚀 Staging and pushing changes to URL 2..."
git add .
git commit -m "Sync changes from parent repo"
git push origin main  # Change 'main' if needed

Write-Host "✅ Done. Both pulled from respective URLs."
