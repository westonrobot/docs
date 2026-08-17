#!/usr/bin/env python3
"""PreToolUse (Write|Edit|NotebookEdit) reminder hook.

Nudges Claude, before making another edit, to check whether the target
repo already has uncommitted changes sitting in the working tree from
prior work in this session. Claude never runs git add/commit/push itself
in this repo -- the human does. Claude's job is only to say the work is
ready, propose a commit message, and say when it's a good point to push.
Never blocks (permissionDecision: allow).
"""
import json
import os
import subprocess
import sys


def git(args, cwd):
    try:
        result = subprocess.run(
            ["git", "-C", cwd] + args,
            capture_output=True, text=True, timeout=10,
        )
    except Exception:
        return None
    if result.returncode != 0:
        return None
    return result.stdout.strip()


def main():
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return

    file_path = (payload.get("tool_input") or {}).get("file_path")
    if not file_path:
        return

    directory = os.path.dirname(file_path) or "."
    if git(["rev-parse", "--is-inside-work-tree"], directory) != "true":
        return

    repo = git(["rev-parse", "--show-toplevel"], directory)
    if not repo:
        return

    status = git(["status", "--porcelain"], repo)
    if not status:
        return

    count = len([line for line in status.splitlines() if line.strip()])

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow",
            "additionalContext": (
                f"Reminder: {repo} already has {count} uncommitted change(s) "
                "in the working tree from prior work. Do not run git add/"
                "commit/push yourself here -- tell the user those changes "
                "are ready, propose the commit message(s), and let them "
                "decide when to add, commit, and push."
            ),
        }
    }))


if __name__ == "__main__":
    main()
