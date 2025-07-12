#!/usr/bin/env sh

branch_name=$(git rev-parse --abbrev-ref HEAD)

if ! echo "$branch_name" | grep -E '^TASK-[0-9]+-[a-zA-Z0-9-]+$' > /dev/null; then
  echo "Error: Branch name '$branch_name' does not match the required format 'TASK-number-text' (e.g., TASK-123-fix-bug)."
  exit 1
fi

echo "Branch name '$branch_name' is valid."
exit 0