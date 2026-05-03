#!/bin/sh
# One-time installer that points git at .githooks/.
set -eu

cd "$(git rev-parse --show-toplevel)"

git config core.hooksPath .githooks
chmod +x .githooks/pre-commit .githooks/commit-msg

echo "✓ git config core.hooksPath -> .githooks"
echo "✓ pre-commit and commit-msg are executable"
