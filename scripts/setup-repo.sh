#!/bin/sh
# Apply repo merge settings, branch protection, and CODEOWNERS.
# Prerequisites: gh CLI authenticated with admin rights on the repo.
# Run AFTER the first CI workflow run completes (so the status check name is registered).
set -eu

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
DEFAULT_BRANCH=$(gh repo view --json defaultBranchRef -q .defaultBranchRef.name)
OWNER=$(gh repo view --json owner -q .owner.login)

echo ""
echo "=== Repo setup: $REPO ==="
echo ""

# Merge strategy: squash + rebase only, auto-delete head branches
gh repo edit "$REPO" \
  --delete-branch-on-merge \
  --enable-squash-merge \
  --enable-rebase-merge \
  --enable-merge-commit=false

echo "✓ Merge strategy: squash + rebase only, auto-delete branches on merge"

# Branch protection
# "contexts" must match the CI job name (default: 'verify' from .github/workflows/ci.yml).
gh api \
  --method PUT \
  "/repos/$REPO/branches/$DEFAULT_BRANCH/protection" \
  --input - <<'PROTECTION_EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["verify"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": true
}
PROTECTION_EOF

echo "✓ Branch protection set on $DEFAULT_BRANCH"

# Refresh CODEOWNERS for the current owner
mkdir -p .github
printf '# All files — repo owner review required on every PR.\n* @%s\n' "$OWNER" \
  > .github/CODEOWNERS

echo "✓ .github/CODEOWNERS regenerated for @$OWNER"
echo ""
echo "Now active on $DEFAULT_BRANCH:"
echo "  - CI job 'verify' must pass before merge"
echo "  - 1 PR review required (stale reviews dismissed on new commits)"
echo "  - No force pushes · No deletions · Linear history"
echo "  - Applies to admins"
