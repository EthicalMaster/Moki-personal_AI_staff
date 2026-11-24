# Team Git quick start (PowerShell)
The lead initializes the repository once. Teammates accept the GitHub invitation, then each runs the following in their own development directory:

```powershell
git clone https://github.com/EthicalMaster/Moki-personal_AI_staff.git MOKI
cd MOKI
git config user.name "Your Name"
git config user.email "YOUR_GITHUB_VERIFIED_OR_NOREPLY_EMAIL"
git switch -c feat/plan-preview
```

Replace the name and email with your own values. Use feat/plan-preview for frontend, feat/run-api for backend, feat/change-extraction for agents, or feat/run-orchestration for Taher. After editing and saving your files, from the repo root:

```powershell
git status
git add -p
git status
```

Git add -p only stages changes to tracked files. Stage each new file explicitly with git add followed by its path, or stage your entire work area using one of the following commands:

```powershell
# Choose the command that covers your own edits
git add -- frontend
# or
git add -- backend/app/api backend/app/storage
# or
git add -- backend/app/agents
# or
git add -- backend/app/orchestration
```

Then run:

```powershell
git diff --cached
git commit -m "Add first workflow component"
git push -u origin HEAD
```

Open the repository in GitHub, choose Compare & pull request, set base to main, describe how you checked the change, and request one teammate's review. For changes requested during review, edit on the same branch, stage and commit again, then git push. After merge, start the next task with:

```powershell
git switch main
git pull --ff-only
git switch -c feat/next-task-name
```

Use a fresh descriptive branch name each time. If GitHub requests authentication, sign in with the GitHub account that accepted the invite. If a push is rejected, keep the local commit and share the error with Taher before retrying.
