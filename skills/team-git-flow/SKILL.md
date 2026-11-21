---
name: team-git-flow
description: Guides and automates safe team Git workflows for HackCC hackathons. Prevents merge conflicts, enforces branch isolation off main, guides conflict resolution, and prevents committing API keys or .env files.
---

# HackCC Team Git Collaboration Skill

This skill provides step-by-step instructions and automated commands for collaborating on Git repositories during hackathons without corrupting code or overwriting teammates' work.

---

## 1. Golden Rules for HackCC Teams

1. **Never commit directly to `main`:** All teammates work on feature branches (e.g., `feature/login`, `feature/api-integration`).
2. **Never commit `.env` files or API keys:** All secrets stay local on your computer.
3. **Pull frequently, push in small increments:** Small Pull Requests (PRs) prevent giant merge conflicts.

---

## 2. Standard Workflows

### Workflow A: Start Working on a New Feature
Run these commands whenever starting a new task:
```bash
# 1. Switch to main and get latest code
git checkout main
git pull origin main

# 2. Create and switch to your feature branch
git checkout -b feature/<feature-name>
```

### Workflow B: Sync Teammate Updates into Your Branch
When a teammate merges their PR into `main`, sync your branch without losing your work:
```bash
# 1. Stash any uncommitted work safely
git stash

# 2. Pull latest main
git pull origin main

# 3. Restore your uncommitted work
git stash pop
```

### Workflow C: Commit and Push Your Feature
When your feature compiles and works locally:
```bash
# 1. Check status
git status

# 2. Stage and commit
git add .
git commit -m "feat: describe your change concisely"

# 3. Push branch to GitHub
git push -u origin feature/<feature-name>
```
Then visit GitHub and click **Compare & pull request**.

---

## 3. Emergency Playbooks

### Merge Conflict Emergency
If Git reports a conflict during a merge or rebase:
1. Don't panic! Open the conflicted files in VS Code.
2. Look for the conflict markers:
   - `<<<<<<< HEAD` (your changes)
   - `=======` (divider)
   - `>>>>>>> main` (teammate's changes)
3. Choose **Accept Incoming Change**, **Accept Current Change**, or **Accept Both Changes**.
4. Save the file, run `git add <file>`, and then `git commit -m "fix: resolve merge conflict"`.
5. *Emergency Exit:* To abort and go back to safety, run `git merge --abort`.

### Accidental Secret or `.env` Commit
If you accidentally added `.env` to git staging or a commit before pushing:
```bash
git rm --cached .env
git commit -m "chore: untrack .env file"
```
Ensure `.env` is listed in `.gitignore`.
