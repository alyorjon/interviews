# 🧰 GIT Interview Questions & Answers
# 🧰 GIT Intervyu Savol va Javoblari

> **EN:** Practical Git interview questions with examples.  
> **UZ:** Amaliy misollar bilan Git intervyu savollari.

---

## 1. What is GIT? | GIT nima?

**EN:** GIT is a distributed version control system (DVCS) designed to handle projects of any size with speed and efficiency.

**UZ:** GIT — bu taqsimlangan versiyani boshqarish tizimi. Kichik va katta loyihalarni tezlik va samaradorlik bilan boshqarish uchun mo'ljallangan.

```bash
# Check Git version | Git versiyasini tekshirish
git --version
# git version 2.42.0
```

---

## 2. What is Distributed Control System? | Taqsimlangan boshqaruv tizimi nima?

**EN:** You work on your local machine and transfer code to a centralized repository (GitHub) later. You don't need a constant internet connection to work.

**UZ:** Siz o'z local mashinangizda ishlaysiz, keyin kodni markaziy repoga (GitHub) yuborasiz. Ishlash uchun doim internet kerak emas.

```
[Local Machine | Local Mashina]
        |
      push/pull
        |
[GitHub (Centralized | Markaziy)]
```

---

## 3. What is GIT version control? | GIT versiyani boshqarish nima?

**EN:** Git tracks the history of your files. Each commit is a snapshot of your files at a specific point in time. You can revert to any snapshot.

**UZ:** Git fayllar tarixini kuzatib boradi. Har bir commit — fayllarning o'sha vaqtdagi "surati" (snapshot). Istalgan vaqtga qaytish mumkin.

```bash
git log --oneline
# a1b2c3d Add login feature     <- snapshot 3
# f4e5d6c Fix database bug      <- snapshot 2
# 9c8b7a6 Initial commit        <- snapshot 1

# Revert to a snapshot | Snapshotga qaytish
git checkout 9c8b7a6
```

---

## 4. What is difference between SVN and Git? | SVN va Git farqi nima?

**EN:** SVN is centralized — you must be connected to the server. Git is distributed — you work locally and sync when ready.

**UZ:** SVN markazlashgan — serverga doim ulangan bo'lishingiz kerak. Git taqsimlangan — local ishlaysiz, tayyor bo'lganda sinxronlaysiz.

| SVN | GIT |
|-----|-----|
| Centralized (Markazlashgan) | Distributed (Taqsimlangan) |
| Internet required always (Doim internet kerak) | Works offline (Oflayn ishlaydi) |
| Direct server connection (Server bilan to'g'ridan-to'g'ri) | 3 stages: workspace → staging → local repo |

```bash
# GIT 3 bosqichi | GIT 3 stages
# [Workspace] --git add--> [Staging] --git commit--> [Local Repo] --git push--> [GitHub]
```

---

## 5. What is a repository in GIT? | GIT'da repository nima?

**EN:** A Git repository contains the complete history of all files in a project.

**UZ:** Git repository — loyihaning barcha fayllari va ularning to'liq o'zgarish tarixini o'z ichiga oluvchi joy.

```bash
ls -la my-project/
# .git/        <- tarix shu yerda | history is here
# app.py
# README.md
```

---

## 6. How can you create a local repository in Git? | Local repository qanday yaratiladi?

**EN:** Use `git init` to create a new local repository.

**UZ:** Yangi local repository yaratish uchun `git init` buyrug'i ishlatiladi.

```bash
mkdir my-app
cd my-app
git init
# Initialized empty Git repository in /my-app/.git/
```

---

## 7. What is 'bare repository' in GIT? | GIT'da 'bare repository' nima?

**EN:** A bare repository contains only version control information — no working files, no `.git` subdirectory. Used on servers.

**UZ:** Bare repository faqat versiya ma'lumotlarini saqlaydi — working fayllar yo'q, `.git` papkasi yo'q. Serverda ishlatiladi.

```bash
git init --bare my-project.git
# Server tomonda ishlatiladi | Used on server side
# Odatda GitHub/GitLab shu tarzda saqlaydi | GitHub/GitLab stores this way
```

---

## 8. How to configure GitHub repository locally? | GitHub repositoryni local sozlash qanday?

**EN:** Set your global username and email before making commits.

**UZ:** Commit qilishdan oldin global ism va emailni sozlang.

```bash
git config --global user.name "Alyorjon"
git config --global user.email "alyorjon@example.com"

# Check settings | Sozlamalarni tekshirish
git config --list
```

---

## 9. How to Create Alias to git commands? | Git buyruqlariga Alias qanday yaratiladi?

**EN:** Aliases let you create shortcuts for long Git commands.

**UZ:** Alias — uzun Git buyruqlariga qisqa nom berish imkoniyati.

```bash
# Create alias | Alias yaratish
git config --global alias.lo "log --oneline"

# Use it | Ishlatish
git lo
# a1b2c3d Add login feature
# f4e5d6c Fix bug

# Remove alias | Aliasni o'chirish
git config --global --unset alias.lo

# Remove username | Username o'chirish
git config --global --unset user.name
```

---

## 10. What is the git clone? | git clone nima?

**EN:** Download an existing repository from GitHub (or any remote) to your local machine.

**UZ:** GitHub'dagi mavjud reponi local mashinaga yuklab olish.

```bash
git clone https://github.com/username/my-project.git

# Clone to specific folder | Aniq papkaga clone qilish
git clone https://github.com/username/my-project.git ./my-folder
```

---

## 11. What is 'git add'? | 'git add' nima?

**EN:** Move files from the working area to the staging (index) area.

**UZ:** Fayllarni working area'dan staging (index) areaga o'tkazish.

```bash
# Single file | Bitta fayl
git add index.py

# Multiple files | Bir nechta fayl
git add index.py models.py

# All files | Barcha fayllar
git add .
```

---

## 12. What is Staging Area? | Staging Area nima?

**EN:** The staging area is a "holding area" between working files and commits. You review and format changes here before committing.

**UZ:** Staging area — working fayllar va commitlar orasidagi "kutish zonasi". Commit qilishdan oldin o'zgarishlarni ko'rib chiqish va tartibga solish joyi.

```bash
git status
# Changes to be committed:       <- Staging areada | In staging area
#   new file:   app.py
#
# Changes not staged for commit: <- Working areada | In working area
#   modified:   config.py
```

---

## 13. What is the use of 'git log'? | 'git log' nima uchun ishlatiladi?

**EN:** View the commit history. Filter by author, date, message, and more.

**UZ:** Commitlar tarixini ko'rish. Muallif, sana, xabar bo'yicha filtrlash mumkin.

```bash
git log                           # Full log | To'liq log
git log -5                        # Last 5 commits | Oxirgi 5 ta
git log --oneline                 # One line per commit | Har commit bir qatorda
git log --since=2024-01-01        # After date | Sanadan keyin
git log --until=2024-12-31        # Before date | Sanagacha
git log --author="Alyorjon"       # By author | Muallif bo'yicha
git log --grep="login"            # Search in message | Xabarda qidirish
git log --oneline --author="Alyorjon"
```

---

## 14. How can we add and commit at the same time? | Qanday qilib bir vaqtda add va commit qilish mumkin?

**EN:** Use `git commit -a -m` to stage all tracked files and commit in one step.

**UZ:** `git commit -a -m` buyrug'i track qilingan barcha fayllarni bir vaqtda staging va commit qiladi.

```bash
git commit -a -m "Update login logic"

# ⚠️ EN: New (untracked) files still need git add first!
# ⚠️ UZ: Yangi (untracked) fayllar uchun avval git add kerak!
```

---

## 15. How to edit an incorrect commit message? | Noto'g'ri commit xabarini qanday o'zgartirish mumkin?

**EN:** Use `git commit --amend` to change the most recent commit message.

**UZ:** `git commit --amend` buyrug'i faqat oxirgi commit xabarini o'zgartiradi.

```bash
git commit --amend -m "Correct commit message here"

# ⚠️ EN: Only works on the last commit. Don't amend pushed commits!
# ⚠️ UZ: Faqat oxirgi commitga ishlaydi. Push qilingan commitni amend qilmang!
```

---

## 16. How to get back a commit to staging area? | Commitni staging areaga qanday qaytarish mumkin?

**EN:** Use `git reset --soft` to undo a commit while keeping changes in the staging area.

**UZ:** `git reset --soft` — commitni bekor qiladi, o'zgarishlar staging areada qoladi.

```bash
git log --oneline
# a1b2c3d Latest commit   <- buni bekor qilamiz | undo this
# f4e5d6c Previous commit <- shunga qaytamiz | go back to this

git reset --soft f4e5d6c
# a1b2c3d ning o'zgarishlari staging areada | changes are in staging
```

---

## 17. How to get back a file from staging area to working area? | Faylni staging areadan working areaga qanday qaytarish mumkin?

**EN:** Unstage a file without losing its changes.

**UZ:** O'zgarishlarni yo'qotmasdan faylni staging areadan chiqarish.

```bash
git add config.py          # Staged | Staging areaga qo'shildi
git reset HEAD config.py   # Unstaged | Working areaga qaytdi

# Modern way | Zamonaviy usul
git restore --staged config.py
```

---

## 18. How to get back a commit to work area? | Commitni work areaga qanday qaytarish mumkin?

**EN:** Use `git reset --mixed` to undo commits and put changes back in the working area (not staged).

**UZ:** `git reset --mixed` — commitni bekor qiladi, o'zgarishlar working areaga tushadi (staged emas).

```bash
git reset --mixed f4e5d6c
# O'zgarishlar working areada, stage qilinmagan | Changes in working area, not staged
```

---

## 19. What is git reset? | git reset nima?

**EN:** Reset the current HEAD to a specific state.

**UZ:** HEAD holatini ma'lum commitga qaytarish.

| Flag | EN | UZ |
|------|----|----|
| `--soft` | Changes go to staging | O'zgarishlar staging'ga |
| `--mixed` | Changes go to working area | O'zgarishlar working area'ga |
| `--hard` | Changes are deleted ⚠️ | O'zgarishlar o'chadi ⚠️ |

```bash
git reset --hard HEAD~1   # EN: Deletes last commit completely! | UZ: Oxirgi commitni butunlay o'chiradi!
```

---

## 20. What is 'head' in git? | Git'da 'head' nima?

**EN:** HEAD is a pointer to the current commit or branch. Default HEAD points to `main` (or `master`).

**UZ:** HEAD — hozirgi commit yoki branchga ishora. Default HEAD `main` (yoki `master`) branchiga ko'rsatadi.

```bash
cat .git/HEAD
# ref: refs/heads/main

git log --oneline
# a1b2c3d (HEAD -> main) Latest commit
```

---

## 21. What is .gitignore file? | .gitignore fayli nima?

**EN:** `.gitignore` lists files and folders that Git should not track.

**UZ:** `.gitignore` — Git kuzatmasligi kerak bo'lgan fayllar va papkalar ro'yxati.

```bash
# .gitignore fayli tarkibi | .gitignore file content
__pycache__/
*.pyc
.env           # Secret keys | Maxfiy kalitlar
venv/          # Virtual environment
.idea/         # IDE files | IDE fayllari
*.log          # Log files | Log fayllar

# Add to git | Git'ga qo'shish
git add .gitignore
git commit -m "Add .gitignore"
```

---

## 22. How to see the difference between 2 commits? | 2 commit orasidagi farqni qanday ko'rish mumkin?

**EN:** Use `git diff` with two commit IDs to see what changed between them.

**UZ:** Ikki commit ID bilan `git diff` ishlatib, ular orasidagi farqni ko'rish mumkin.

```bash
git log --oneline
# a1b2c3d Add payment feature
# f4e5d6c Add login feature

git diff f4e5d6c..a1b2c3d
# + qo'shilgan qatorlar | added lines (green)
# - o'chirilgan qatorlar | removed lines (red)
```

---

## 23. How to recover a deleted file? | O'chirilgan faylni qanday qaytarish mumkin?

**EN:** If a file was tracked (staged or committed), you can restore it.

**UZ:** Agar fayl track qilingan bo'lsa (staged yoki committed), uni qaytarib olish mumkin.

```bash
# EN: File was deleted accidentally | UZ: Fayl tasodifan o'chirildi
rm important_file.py

git checkout -- important_file.py

# Modern way | Zamonaviy usul
git restore important_file.py
```

---

## 24. How to create a branch? | Branch qanday yaratiladi?

**EN:** Use `git branch` to create a new branch.

**UZ:** Yangi branch yaratish uchun `git branch` buyrug'i ishlatiladi.

```bash
git branch feature/login

git branch
# * main              <- hozirgi branch | current branch
#   feature/login     <- yangi branch | new branch
```

---

## 25. How to checkout to branch? | Branchga qanday o'tish mumkin?

**EN:** Switch to an existing branch with `git checkout` or the modern `git switch`.

**UZ:** Mavjud branchga o'tish uchun `git checkout` yoki zamonaviy `git switch` ishlatiladi.

```bash
git checkout feature/login

# Modern way | Zamonaviy usul
git switch feature/login
```

---

## 26. How to create branch while checkout? | Branch yaratib, bir vaqtda o'tish qanday?

**EN:** Create and switch to a new branch in one command.

**UZ:** Bir buyruq bilan branch yaratib, unga o'tish.

```bash
git checkout -b feature/register

# Modern way | Zamonaviy usul
git switch -c feature/register
```

---

## 27. How do you rename the local branch? | Local branchni qanday rename qilish mumkin?

**EN:** Use `git branch -m` to rename a branch.

**UZ:** Branch nomini o'zgartirish uchun `git branch -m` ishlatiladi.

```bash
git branch -m old-branch-name new-branch-name

# EN: Rename current branch | UZ: Hozirgi branchni rename qilish
git branch -m new-branch-name
```

---

## 28. How to see the branch list? | Branch ro'yxatini qanday ko'rish mumkin?

**EN:** List all local branches.

**UZ:** Barcha local branchlarni ko'rish.

```bash
git branch
# * main              <- active branch | faol branch
#   feature/login
#   hotfix/bug-42
```

---

## 29. How to see the remote branch list? | Remote branch ro'yxatini qanday ko'rish mumkin?

**EN:** List all remote branches.

**UZ:** Barcha remote branchlarni ko'rish.

```bash
git branch -r
# origin/main
# origin/feature/login

# Detailed view | Batafsil ko'rinish
git remote show origin
```

---

## 30. How to see the local and remote branch list? | Local va remote branchlarni birga qanday ko'rish mumkin?

**EN:** Use `-a` flag to see all branches (local + remote).

**UZ:** Barcha branchlarni (local + remote) ko'rish uchun `-a` flag ishlatiladi.

```bash
git branch -a
# * main
#   feature/login
#   remotes/origin/main
#   remotes/origin/feature/login
```

---

## 31. How to delete a branch? | Branchni qanday o'chirish mumkin?

**EN:** `-d` deletes safely (only if merged), `-D` forces deletion.

**UZ:** `-d` xavfsiz o'chiradi (faqat merge qilingan bo'lsa), `-D` majburiy o'chiradi.

```bash
# Safe delete | Xavfsiz o'chirish (merge bo'lgan bo'lsa)
git branch -d feature/login

# Force delete | Majburiy o'chirish
git branch -D feature/login
```

---

## 32. How to delete a Remote Branch? | Remote Branchni qanday o'chirish mumkin?

**EN:** Delete a branch from the remote repository.

**UZ:** Remote repositorydan branchni o'chirish.

```bash
git push origin -d feature/login

# Alternative | Muqobil usul
git push origin --delete feature/login
```

---

## 33. How to see the difference between 2 branches? | 2 branch orasidagi farqni qanday ko'rish mumkin?

**EN:** Compare what changed between two branches.

**UZ:** Ikki branch orasidagi o'zgarishlarni solishtirish.

```bash
git diff main..feature/login
# EN: Shows what feature/login has that main doesn't
# UZ: feature/login'da bor, main'da yo'q narsalarni ko'rsatadi
```

---

## 34. What is git push? | git push nima?

**EN:** Send your local commits to the remote repository.

**UZ:** Local commitlarni remote (GitHub) repoga yuborish.

```bash
git push origin main

# EN: Push with tracking | UZ: Tracking bilan push
git push -u origin main
# Keyingi safar oddiy "git push" ishlaydi | Next time plain "git push" works
```

---

## 35. How do you push the files to master branch in remote repo? | Fayllarni remote repo'ning master branchiga qanday push qilish mumkin?

**EN:** Make sure you're on the main/master branch, then push.

**UZ:** main/master branchida turib push qiling.

```bash
git checkout main
git push

# yoki aniq ko'rsatish | or explicitly
git push origin main
```

---

## 36. How do you push files from local to particular branch? | Local'dan ma'lum branchga fayllarni qanday push qilish mumkin?

**EN:** Specify the branch name when pushing.

**UZ:** Push qilganda branch nomini ko'rsating.

```bash
git push origin feature/login

# Set upstream for future pushes | Keyingi push'lar uchun upstream o'rnatish
git push --set-upstream origin feature/login
# Keyin | Then: git push (enough)
```

---

## 37. How to push new branch to remote? | Yangi branchni remote'ga qanday push qilish mumkin?

**EN:** Create a branch locally and push it to remote for the first time.

**UZ:** Local'da branch yaratib, birinchi marta remote'ga yuborish.

```bash
git checkout -b feature/payment
# ... ishlar qilinadi | ... do some work ...
git add .
git commit -m "Add payment module"
git push origin feature/payment
```

---

## 38. What is git pull? | git pull nima?

**EN:** Download and merge changes from a remote branch into your local branch. Equivalent to `fetch + merge`.

**UZ:** Remote branchdagi o'zgarishlarni yuklab, local branchga birlashtirish. `fetch + merge` ga teng.

```bash
git pull
# = git fetch + git merge

# EN: If you have local changes, stash first
# UZ: Local o'zgarishlar bo'lsa, avval stash qiling
git stash save "my work"
git pull
git stash pop
```

---

## 39. How do you pull a file from particular remote branch? | Ma'lum remote branchdan qanday pull qilish mumkin?

**EN:** Specify the remote and branch name.

**UZ:** Remote va branch nomini ko'rsating.

```bash
git pull origin feature/login
```

---

## 40. How do you download a remote branch to local without merge? | Remote branchni merge qilmasdan local'ga qanday yuklab olish mumkin?

**EN:** Use `git fetch` to download without merging, then checkout to that branch.

**UZ:** Merge qilmasdan yuklab olish uchun `git fetch`, keyin branchga o'tish.

```bash
git fetch origin feature/login
git checkout feature/login
```

---

## 41. What is git Fetch? | git Fetch nima?

**EN:** Downloads new data from remote but doesn't merge it into your local branch. Just provides a view of remote changes.

**UZ:** Remote'dan yangi ma'lumotlarni yuklab oladi, lekin local branchga birlashtirmaydi. Faqat ko'rish imkonini beradi.

```bash
git fetch origin
# EN: Remote changes downloaded but not applied
# UZ: Remote o'zgarishlar yuklandi, lekin qo'llanilmadi

git fetch origin feature/login
git checkout feature/login  # O'tish | Switch to it
```

---

## 42. What is difference between git clone & git pull? | git clone va git pull farqi nima?

**EN:** Clone is for first-time download; pull is for updating an existing local repo.

**UZ:** Clone — birinchi marta yuklab olish; pull — mavjud local reponi yangilash.

| | git clone | git pull |
|-|-----------|----------|
| EN | First time, no local repo | Repo exists, get updates |
| UZ | Birinchi marta, local repo yo'q | Repo mavjud, yangilanish olish |

```bash
# First time | Birinchi marta
git clone https://github.com/username/project.git

# Next time | Keyingi safar
cd project
git pull
```

---

## 43. What is git merge? | git merge nima?

**EN:** Combine two branches into one.

**UZ:** Ikki branchni birlashtirish.

```bash
git checkout main           # EN: Switch to target branch | UZ: Target branchga o'tish
git merge feature/login     # EN: Bring feature into main | UZ: Feature'ni main'ga olib keling

# EN: Check result | UZ: Natijani ko'rish
git log --oneline
# a1b2c3d Merge branch 'feature/login'
```

---

## 44. What is git conflict? | git conflict nima?

**EN:** When two people edit the same lines in the same file on different branches, a merge conflict occurs.

**UZ:** Ikkita kishi turli branchlarda bir faylning bir qatorini o'zgartirsa, merge conflict yuzaga keladi.

```bash
git merge feature/login
# CONFLICT (content): Merge conflict in app.py
```

```python
# app.py — conflict ko'rinishi | conflict view
<<<<<<< HEAD (main branch)
def login():
    return "main version"
=======
def login():
    return "feature version"
>>>>>>> feature/login
```

---

## 45. How do you resolve merge conflict? | Merge conflictni qanday hal qilish mumkin?

**EN:** Edit the conflicting file manually, then stage and commit.

**UZ:** Conflict bo'lgan faylni qo'lda tahrirlang, keyin add va commit qiling.

```bash
# 1. EN: Open file and fix it | UZ: Faylni oching va to'g'rilang
# 2. EN: Remove <<<<, ====, >>>> markers | UZ: <<<<, ====, >>>> belgilarini o'chiring
# 3. EN: Keep the correct code | UZ: To'g'ri kodni qoldiring

git add app.py
git commit -m "Resolve merge conflict in app.py"
```

---

## 46. How do you skip from merge conflict? | Merge conflictdan qanday chiqish mumkin?

**EN:** Abort the merge to return to the state before it started.

**UZ:** Merge'ni bekor qilib, oldingi holatga qaytish.

```bash
git merge --abort
# EN: Everything returns to before merge | UZ: Hamma narsa merge oldidagi holatga qaytadi
```

---

## 47. What is the function of 'git rm'? | 'git rm' vazifasi nima?

**EN:** Remove a file from the working area and staging area (and disk). Unlike plain `rm`, it can be reverted with Git.

**UZ:** Faylni working area, staging area va diskdan o'chirish. Oddiy `rm` dan farqli, Git orqali qaytarib olish mumkin.

```bash
git rm old_file.py
git commit -m "Remove old_file.py"

# EN: Remove from tracking only (keep file on disk)
# UZ: Faqat tracking'dan olib tashlash (fayl diskda qoladi)
git rm --cached secret.env
echo "secret.env" >> .gitignore
```

---

## 48. How will you know if a branch has been already merged? | Branch merge qilinganmi yoki yo'qligini qanday bilish mumkin?

**EN:** Use `--merged` and `--no-merged` flags.

**UZ:** `--merged` va `--no-merged` flaglarini ishlatish.

```bash
git branch --merged
# * main
#   feature/login   <- EN: already merged | UZ: allaqachon merge qilingan

git branch --no-merged
#   feature/payment <- EN: not yet merged | UZ: hali merge qilinmagan
```

---

## 49. What is branching? | Branching nima?

**EN:** Branching allows you to work on different versions of a project independently. You can switch between branches without affecting others.

**UZ:** Branching — loyihaning turli versiyalarida mustaqil ishlash imkoniyati. Boshqalarga ta'sir etmasdan branchlar orasida almashish mumkin.

```
main         ---A---B---C-----------D (production)
                         \         /
feature/login             E---F---G (new feature | yangi feature)
```

```bash
git checkout -b feature/login  # Yangi branch | New branch
# ... ishlash | work ...
git checkout main
git merge feature/login        # Birlashtirish | Merge
```

---

## 50. What is the criteria to merge two branches? | Ikki branchni merge qilish mezoni nima?

**EN:** Merge when a feature/module is complete, tested, and reviewed.

**UZ:** Feature/modul to'liq tayyor, test o'tgan va code review bo'lganda merge qilinadi.

```bash
# EN: Typical workflow | UZ: Odatiy ish oqimi
# 1. feature/login -> development (testing)
# 2. development -> staging (QA)
# 3. staging -> main (production)

git checkout development
git merge feature/login
```

---

## 51. Describe branching strategy you have used? | Qanday branching strategiyasini ishlatgansiz?

**EN / UZ:**

### Feature Branching
```bash
# EN: Each feature gets its own branch
# UZ: Har bir feature o'z branchiga ega
git checkout -b feature/user-auth
# ... ishlash | work ...
git merge feature/user-auth  # test o'tgach | after testing
```

### Task Branching
```bash
# EN: Branch name includes task/ticket ID
# UZ: Branch nomida task/ticket ID bo'ladi
git checkout -b TASK-123-fix-login-bug
# Branch nomidan task ko'rinadi | Task visible in branch name
```

### Release Branching
```bash
# EN: Freeze features, only bugfixes allowed
# UZ: Featurelar muzlatiladi, faqat bugfix ruxsat beriladi
git checkout -b release/v1.0.0
# ... bugfix, docs ...
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git checkout develop
git merge release/v1.0.0  # develop ham yangilanadi | develop updated too
```

---

## 52. What is git stash? | git stash nima?

**EN:** Temporarily save uncommitted changes without committing them.

**UZ:** Commit qilmasdan uncommitted o'zgarishlarni vaqtincha saqlash.

```bash
git stash save "login feature - WIP"   # EN: Save | UZ: Saqlash
git stash list                          # EN: View all | UZ: Hammasini ko'rish
# stash@{0}: On main: login feature - WIP

git stash apply stash@{0}   # EN: Copy to branch (stash stays) | UZ: Nusxa (stash qoladi)
git stash pop stash@{0}     # EN: Move to branch (stash removed) | UZ: Ko'chirish (stash o'chadi)
git stash drop stash@{0}    # EN: Delete specific | UZ: Aniq birini o'chirish
git stash clear              # EN: Delete all | UZ: Hammasini o'chirish
```

---

## 53. When we use git Stash? | git Stash qachon ishlatiladi?

**EN:** Use stash when you need to switch context without committing your current work.

**UZ:** Hozirgi ishni commit qilmasdan context almashtirish kerak bo'lganda stash ishlatiladi.

```bash
# Case 1 | Holat 1: Branch almashtirishda | When switching branches
git stash save "WIP changes"
git checkout hotfix/urgent-bug
# ... fix ...
git checkout feature/login
git stash pop

# Case 2 | Holat 2: Pull qilishdan oldin | Before pulling
git stash save "my local changes"
git pull
git stash pop

# Case 3 | Holat 3: Merge paytida | During merge
git stash save "files not for merge"
git merge feature/login
git stash pop
```

---

## 54. What is another option for merging in git? | Git'da merging uchun boshqa variant nima?

**EN:** `git rebase` is an alternative to merging that creates a cleaner, linear history.

**UZ:** `git rebase` — merge'ga alternativ, toza chiziqli tarix hosil qiladi.

```bash
git checkout feature/login
git rebase main
# EN: Replays feature commits on top of main
# UZ: Feature commitlarini main ustiga qayta yozadi
```

---

## 55. What is difference between git merge and git rebase? | git merge va git rebase farqi nima?

**EN:** Merge preserves history with a merge commit. Rebase rewrites history for a clean linear log.

**UZ:** Merge tarixni merge commit bilan saqlaydi. Rebase tarixni toza chiziqli qilib qayta yozadi.

| | git merge | git rebase |
|-|-----------|------------|
| EN | Adds merge commit | Rewrites commit history |
| UZ | Merge commit qo'shadi | Commit tarixini qayta yozadi |
| EN | Preserves full history | Creates linear history |
| UZ | To'liq tarixni saqlaydi | Chiziqli tarix hosil qiladi |

```bash
# Merge result | Merge natijasi:
# A---B---C---M (M = merge commit)
#          \ /
#           D---E

# Rebase result | Rebase natijasi:
# A---B---C---D'---E' (clean line | toza chiziq)
```

---

## 56. How do you undo the last commit? | Oxirgi commitni qanday bekor qilish mumkin?

**EN:** Use `git revert` to safely undo a commit by creating a new reverse commit.

**UZ:** `git revert` — yangi teskari commit yaratib, xavfsiz tarzda commitni bekor qiladi.

```bash
git log --oneline
# a1b2c3d Bad commit   <- EN: undo this | UZ: buni bekor qilamiz
# f4e5d6c Good commit

git revert a1b2c3d
# EN: Creates a new commit that undoes a1b2c3d
# UZ: a1b2c3d ni bekor qiluvchi yangi commit yaratadi

# ✅ EN: Safe — doesn't delete history | UZ: Xavfsiz — tarixni o'chirmaydi
```

---

## 57. How to Change the URL for a remote Git repository? | Remote Git repository URL'ini qanday o'zgartirish mumkin?

**EN:** Update the remote URL using `git remote set-url`.

**UZ:** `git remote set-url` buyrug'i bilan remote URL'ni yangilash.

```bash
git remote -v
# origin  https://github.com/old/repo.git

git remote set-url origin https://github.com/new/repo.git

git remote -v
# origin  https://github.com/new/repo.git
```

---

## 58. What is pull request? | Pull request nima?

**EN:** A request to merge changes from one branch into another, reviewed on GitHub/GitLab before merging.

**UZ:** Bir branchdagi o'zgarishlarni boshqasiga qo'shish so'rovi. GitHub/GitLab'da merge qilishdan oldin ko'rib chiqiladi.

```bash
# 1. EN: Create branch and push | UZ: Branch yaratib push qiling
git checkout -b feature/payment
git push origin feature/payment

# 2. EN: Go to GitHub → New Pull Request
# 2. UZ: GitHub'ga o'ting → New Pull Request

# 3. EN: Select: feature/payment → main
# 3. UZ: Tanlang: feature/payment → main

# 4. EN: Write description → Create PR → Code Review → Merge
# 4. UZ: Tavsif yozing → PR yarating → Code Review → Merge
```

---

## 59. Why GIT better than Subversion (SVN)? | Nima uchun GIT SVN'dan yaxshi?

**EN:** Git is faster, supports offline work, has better branching, and every developer has a full backup of the repository.

**UZ:** Git tezroq, oflayn ishlaydi, branching oson va har bir developer to'liq zaxira nusxaga ega.

| Feature | SVN | GIT |
|---------|-----|-----|
| EN: Offline work | ❌ No | ✅ Yes |
| UZ: Oflayn ishlash | ❌ Yo'q | ✅ Ha |
| EN: Speed | 🐢 Slow | ⚡ Fast |
| UZ: Tezlik | 🐢 Sekin | ⚡ Tez |
| EN: Branching | Complex | Simple |
| UZ: Branching | Murakkab | Oddiy |
| EN: Full backup | ❌ Server only | ✅ Every developer |
| UZ: To'liq zaxira | ❌ Faqat server | ✅ Har bir developer |

---

## 60. How to Lock a branch? Why we need to lock a branch? | Branchni qanday bloklash mumkin? Nima uchun kerak?

**EN:** Branch protection rules prevent accidental direct pushes to important branches like `main`.

**UZ:** Branch protection qoidalari `main` kabi muhim branchlarga tasodifiy to'g'ridan-to'g'ri push qilishni oldini oladi.

```
GitHub UI:
Repository → Settings → Branches → Add branch protection rule

EN: Recommended settings | UZ: Tavsiya etilgan sozlamalar:
✅ Require pull request reviews before merging
✅ Require status checks to pass before merging
✅ Include administrators
✅ Restrict who can push to matching branches
```

---

## 61. How to delete Repository in GitHub? | GitHub'da Repository'ni qanday o'chirish mumkin?

**EN:** Delete through repository settings. This action is permanent and irreversible.

**UZ:** Repository sozlamalari orqali o'chirish. Bu amal qaytarib bo'lmaydi.

```
Repository → Settings → Scroll to bottom (Pastga aylantiring)
→ Danger Zone → Delete this repository
→ Type repository name (Repo nomini yozing)
→ "I understand the consequences, delete the repository"

⚠️ EN: Cannot be undone! | UZ: Qaytarib bo'lmaydi!
```

---

## 62. How to give an access to a specific person to repository? | Repository'ga ma'lum odamga qanday kirish huquqi berish mumkin?

**EN:** Add collaborators through repository settings. They'll receive an email invitation.

**UZ:** Repository sozlamalari orqali collaborator qo'shing. Ular email taklif oladi.

```
Repository → Settings → Collaborators → Add people
→ Enter username or email (Username yoki email kiriting)
→ Add collaborator
→ EN: User accepts invitation via email | UZ: Foydalanuvchi emaildagi taklifni qabul qiladi
```

```bash
# EN: After accepting, collaborator can:
# UZ: Qabul qilgach, collaborator qila oladi:
git clone https://github.com/your-username/repo.git
git push origin feature/their-work
git pull
```

---

## 📌 Quick Reference | Tez Qo'llanma

```bash
# ═══ SETUP | SOZLASH ═══
git init                            # New repo | Yangi repo
git clone <url>                     # Download repo | Repo yuklab olish
git config --global user.name ""    # Set name | Ism o'rnatish
git config --global user.email ""   # Set email | Email o'rnatish

# ═══ DAILY WORKFLOW | KUNLIK ISH OQIMI ═══
git status                          # Check status | Holat tekshirish
git add <file>                      # Stage file | Staging
git add .                           # Stage all | Hammasini stage qilish
git commit -m "message"             # Commit | Commit
git push origin main                # Upload | Yuklash
git pull                            # Download + merge | Yuklab birlashtirish

# ═══ BRANCHING ═══
git branch <name>                   # Create | Yaratish
git checkout <name>                 # Switch | O'tish
git checkout -b <name>             # Create + Switch | Yaratib o'tish
git merge <branch>                  # Merge | Birlashtirish
git branch -d <name>               # Delete | O'chirish
git push origin -d <name>          # Delete remote | Remote'dan o'chirish

# ═══ HISTORY | TARIX ═══
git log --oneline                   # Short log | Qisqa log
git diff <id1>..<id2>              # Compare commits | Commitlarni solishtirish
git reset --soft <id>              # Undo to staging | Staging'ga qaytarish
git reset --mixed <id>             # Undo to working | Working'ga qaytarish
git reset --hard <id>              # ⚠️ Delete changes | O'zgarishlarni o'chirish
git revert <id>                    # Safe undo | Xavfsiz bekor qilish

# ═══ STASH ═══
git stash save "message"           # Save temp | Vaqtincha saqlash
git stash list                     # View stashes | Ko'rish
git stash pop                      # Restore + delete | Qaytarish + o'chirish
git stash apply                    # Restore only | Faqat qaytarish

# ═══ REMOTE ═══
git remote -v                      # Show remotes | Remote'larni ko'rish
git remote set-url origin <url>    # Change URL | URL o'zgartirish
git fetch origin                   # Download only | Faqat yuklab olish
git branch -a                      # All branches | Barcha branchlar
```

---

*Prepared by | Tayyorlagan: Alyorjon*  
*Source | Manba: GIT Interview Q&A*