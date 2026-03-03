#!/usr/bin/env bash
set -euo pipefail

url1="https://github.com/Delpat-Tech/webloom.git"
url2="https://github.com/Ashackq/dp_website.git"
commit_prefix="Sync changes from parent repo"

original_origin="$(git remote get-url origin)"

restore_origin() {
  git remote set-url origin "$original_origin" >/dev/null 2>&1 || true
}
trap restore_origin EXIT

echo "Pulling from DEV repo..."
git remote set-url origin "$url1"
git pull origin main

echo "Pulling from DEPLOY repo..."
git remote set-url origin "$url2"
git pull origin main

echo "Running build..."
npm run build

echo "Determining next sync commit number..."
last_commit_msg="$(git log -1 --pretty=%B)"
commit_number=1

if [[ "$last_commit_msg" =~ ${commit_prefix}[[:space:]]+([0-9]+) ]]; then
  commit_number=$((BASH_REMATCH[1] + 1))
fi

commit_message="$commit_prefix $commit_number"

echo "Committing and pushing to DEPLOY repo..."
git add .

if git diff --cached --quiet; then
  echo "No staged changes to commit. Skipping commit and push."
  echo
  echo "Done. Build passed and origin restored to original remote."
  exit 0
fi

git commit -m "$commit_message"
git push origin main

echo
echo "Done. Build passed and changes pushed with commit: $commit_message"
