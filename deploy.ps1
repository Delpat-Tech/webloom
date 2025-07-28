$ErrorActionPreference = "Stop"

# Define URLs
$url1 = "https://github.com/Delpat-Tech/webloom.git"
$url2 = "https://github.com/Ashackq/dp_website.git"
$commitPrefix = "Sync changes from parent repo"

# Step 1: Pull from URL 1
Write-Host "Pulling from DEV repo..."
git remote set-url origin $url1
git pull origin main

# Step 2: Pull from DEPLOY repo
Write-Host "Pulling from DEPLOY repo..."
git remote set-url origin $url2
git pull origin main

# Step 3: Run the build command and check for type errors
Write-Host "Running build..."
try {
    npm run build
} catch {
    Write-Host "Build failed. Fix type errors before pushing." -ForegroundColor Red
    exit 1
}

# Step 4: Determine the latest commit number
$lastCommitMsg = git log -1 --pretty=%B
$commitNumber = 1  # Default to 1

if ($lastCommitMsg -match "$commitPrefix\s+(\d+)") {
    if ($matches.Count -gt 1 -and $matches[1] -match '^\d+$') {
        $commitNumber = [int]$matches[1] + 1
    }
}
$commitMessage = "$commitPrefix $commitNumber"

# Step 5: Commit and push to DEPLOY repo
Write-Host "Committing and pushing to DEPLOY repo..."
git add .
git commit -m "$commitMessage"
git push origin main

# Step 6: Restore DEV repo URL
git remote set-url origin $url1

Write-Host "`n Done. Build passed and changes pushed with commit: $commitMessage" -ForegroundColor Green
