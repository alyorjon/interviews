# 🧰 Git va GitHub intervyu savollari / Git & GitHub Interview Questions

> **Nima bu:** Git asoslaridan (commit, branch, merge, rebase) GitHub amaliyotlarigacha (PR, Actions, xavfsizlik) — kundalik ishda va intervyuda so'raladigan savollar. Mayda buyruq variantlari (masalan, branch ro'yxatining 3 xil ko'rinishi) takrorlanmasligi uchun bitta savolga birlashtirilgan.  
> **Har bir javob tartibi:** oddiy tilda → batafsilroq (EN/UZ va buyruqlar) → intervyuda qanday aytasiz.  
> **Zamonaviy buyruqlar:** `git switch` / `git restore` (eski `checkout` o'rniga), `push --force-with-lease`, SSH bilan commit imzolash, GitHub rulesets va merge queue.

---

# 🟢 Asosiy buyruqlar va tushunchalar / Basics

---

## Q1. Git nima va taqsimlangan versiya boshqaruvi nimani anglatadi? / What is Git and what does distributed version control mean?

**Oddiy qilib aytganda:** Git — kodingizning 'vaqt mashinasi': har saqlash nuqtasi (commit) eslab qolinadi, istalgan eski holatga qaytish, kim nimani o'zgartirganini ko'rish va jamoa bilan bir vaqtda ishlash mumkin. 'Taqsimlangan' degani — har dasturchining kompyuterida butun tarix nusxasi bor, markaziy serversiz ham ishlay oladi.

**Batafsilroq:**

**EN:** GIT is a distributed version control system (DVCS) designed to handle projects of any size with speed and efficiency.

**UZ:** GIT — bu taqsimlangan versiyani boshqarish tizimi. Kichik va katta loyihalarni tezlik va samaradorlik bilan boshqarish uchun mo'ljallangan.

```bash
# Check Git version | Git versiyasini tekshirish
git --version
# git version 2.42.0
```

**Qo'shimcha — What is Distributed Control System:**

**EN:** You work on your local machine and transfer code to a centralized repository (GitHub) later. You don't need a constant internet connection to work.

**UZ:** Siz o'z local mashinangizda ishlaysiz, keyin kodni markaziy repoga (GitHub) yuborasiz. Ishlash uchun doim internet kerak emas.

```
[Local Machine | Local Mashina]
        |
      push/pull
        |
[GitHub (Centralized | Markaziy)]
```

**Qo'shimcha — What is GIT version control:**

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

**Intervyuda shunday ayting:** "Git — taqsimlangan versiya boshqaruv tizimi: har klonda to'liq tarix, shuning uchun commit, branch va log lokal va tez. Tarix kontent-hash'lar bilan aniqlanadigan obyektlar grafigi (DAG), bu yaxlitlikni kafolatlaydi. Markaziy server (GitHub) — kelishilgan hamkorlik nuqtasi, texnik zarurat emas."

---

## Q2. Git va SVN farqi nima, nega Git ustun keldi? / Git vs SVN — why did Git win?

**Oddiy qilib aytganda:** SVN — markaziy tizim: tarix bitta serverda, har amal uchun unga ulanish kerak. Git — taqsimlangan: tarix har kompyuterda, branch yaratish bir zumda va arzon. Shu sababli Git'da jamoa bilan parallel ishlash ancha oson.

**Batafsilroq:**

**EN:** SVN is centralized — you must be connected to the server. Git is distributed — you work locally and sync when ready.

**UZ:** SVN markazlashgan — serverga doim ulangan bo'lishingiz kerak. Git taqsimlangan — local ishlaysiz, tayyor bo'lganda sinxronlaysiz.

| SVN                                                        | GIT                                        |
| ---------------------------------------------------------- | ------------------------------------------ |
| Centralized (Markazlashgan)                                | Distributed (Taqsimlangan)                 |
| Internet required always (Doim internet kerak)             | Works offline (Oflayn ishlaydi)            |
| Direct server connection (Server bilan to'g'ridan-to'g'ri) | 3 stages: workspace → staging → local repo |

```bash
# GIT 3 bosqichi | GIT 3 stages
# [Workspace] --git add--> [Staging] --git commit--> [Local Repo] --git push--> [GitHub]
```

**Qo'shimcha — Why GIT better than Subversion (SVN):**

**EN:** Git is faster, supports offline work, has better branching, and every developer has a full backup of the repository.

**UZ:** Git tezroq, oflayn ishlaydi, branching oson va har bir developer to'liq zaxira nusxaga ega.

| Feature            | SVN             | GIT                  |
| ------------------ | --------------- | -------------------- |
| EN: Offline work   | ❌ No           | ✅ Yes               |
| UZ: Oflayn ishlash | ❌ Yo'q         | ✅ Ha                |
| EN: Speed          | 🐢 Slow         | ⚡ Fast              |
| UZ: Tezlik         | 🐢 Sekin        | ⚡ Tez               |
| EN: Branching      | Complex         | Simple               |
| UZ: Branching      | Murakkab        | Oddiy                |
| EN: Full backup    | ❌ Server only  | ✅ Every developer   |
| UZ: To'liq zaxira  | ❌ Faqat server | ✅ Har bir developer |

**Intervyuda shunday ayting:** "Git ustunligi: lokal tezlik, arzon branch va merge, oflayn ishlash, kriptografik yaxlitlik va GitHub/GitLab kabi ekotizim. SVN'ning afzalliklari tor holatlarda qoladi — juda katta binar fayllar va fayl darajasidagi qulflash (Git'da buning uchun LFS)."

---

## Q3. Repository nima va u qanday yaratiladi? / What is a repository and how do you create one?

**Oddiy qilib aytganda:** Repository (repo) — loyiha papkasi va uning butun o'zgarishlar tarixi (`.git` papkasi ichida). `git init` bilan yangisini yaratasiz yoki `git clone` bilan mavjudini yuklab olasiz.

**Batafsilroq:**

**EN:** A Git repository contains the complete history of all files in a project.

**UZ:** Git repository — loyihaning barcha fayllari va ularning to'liq o'zgarish tarixini o'z ichiga oluvchi joy.

```bash
ls -la my-project/
# .git/        <- tarix shu yerda | history is here
# app.py
# README.md
```

**Qo'shimcha — How can you create a local repository in Git:**

**EN:** Use `git init` to create a new local repository.

**UZ:** Yangi local repository yaratish uchun `git init` buyrug'i ishlatiladi.

```bash
mkdir my-app
cd my-app
git init
# Initialized empty Git repository in /my-app/.git/
```

**Intervyuda shunday ayting:** "`git init -b main` yangi repo yaratadi, tarix `.git` da saqlanadi. Birinchi commit'dan oldin `.gitignore` qo'shaman, `user.name`/`user.email` ni sozlayman. Mavjud loyiha uchun — `git clone`."

---

## Q4. What is 'bare repository' in GIT? | GIT'da 'bare repository' nima?

**Oddiy qilib aytganda:** Bare repository — ishchi fayllarsiz, faqat tarixdan (`.git` ichidagi narsalar) iborat repo. Unda hech kim to'g'ridan-to'g'ri kod yozmaydi — u faqat hamma push va pull qiladigan 'markaziy ombor' vazifasini bajaradi.

**Batafsilroq:**

**EN:** A bare repository contains only version control information — no working files, no `.git` subdirectory. Used on servers.

**UZ:** Bare repository faqat versiya ma'lumotlarini saqlaydi — working fayllar yo'q, `.git` papkasi yo'q. Serverda ishlatiladi.

```bash
git init --bare my-project.git
# Server tomonda ishlatiladi | Used on server side
# Odatda GitHub/GitLab shu tarzda saqlaydi | GitHub/GitLab stores this way
```

**Intervyuda shunday ayting:** "`git init --bare` — server tomonidagi repo: ishchi daraxt yo'q, shuning uchun unga push qilish xavfsiz (checkout qilingan branch bilan to'qnashuv yo'q). GitHub va GitLab ichkarida bare repo'lar saqlaydi."

---

## Q5. Lokal repository'ni GitHub bilan qanday bog'laysiz va remote URL'ni qanday o'zgartirasiz? / Connecting a local repo to GitHub and changing the remote URL

**Oddiy qilib aytganda:** Lokal repo'ni GitHub bilan bog'lash: `git remote add origin <url>` — 'origin' nomli masofaviy manzil qo'shiladi, keyin `git push -u origin main`. URL o'zgarsa (masalan, repo ko'chirilsa yoki HTTPS'dan SSH'ga o'tsangiz) — `git remote set-url origin <yangi-url>`.

**Batafsilroq:**

**EN:** Set your global username and email before making commits.

**UZ:** Commit qilishdan oldin global ism va emailni sozlang.

```bash
git config --global user.name "Alyorjon"
git config --global user.email "alyorjon@example.com"

# Check settings | Sozlamalarni tekshirish
git config --list
```

**Qo'shimcha — How to Change the URL for a remote Git repository:**

**EN:** Update the remote URL using `git remote set-url`.

**UZ:** `git remote set-url` buyrug'i bilan remote URL'ni yangilash.

```bash
git remote -v
# origin  https://github.com/old/repo.git

git remote set-url origin https://github.com/new/repo.git

git remote -v
# origin  https://github.com/new/repo.git
```

**Intervyuda shunday ayting:** "`git remote -v` bilan tekshiraman, `set-url` bilan yangilayman. Autentifikatsiya uchun SSH kalit yoki HTTPS + credential manager/token — parolni URL ichiga yozmayman. `-u` upstream'ni o'rnatadi va keyingi `push`/`pull` qisqaradi."

---

## Q6. Git alias va maxsus buyruqlar / Git aliases and custom commands

**Oddiy qilib aytganda:** Alias — uzun buyruqlarga qisqa nom berish: `git config --global alias.st status` dan keyin `git st` yetarli. Murakkab buyruqlar (masalan, chiroyli log) uchun ham qulay.

**Batafsilroq:**

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

**Qo'shimcha — Git Custom Commands va Alias yaratish:**

```bash
# Custom alias yaratish
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

**Intervyuda shunday ayting:** "Alias'lar `~/.gitconfig` da; `!` bilan boshlanganlari shell buyruq bajaradi. PATH'dagi `git-foo` skripti `git foo` buyrug'iga aylanadi — jamoa vositalari uchun qulay. Lekin jamoaga umumiy ish oqimini alias'larga yashirmayman — hamma standart buyruqlarni bilishi kerak."

---

## Q7. What is the git clone? | git clone nima?

**Oddiy qilib aytganda:** `git clone <url>` — masofaviy repo'ni butun tarixi bilan kompyuteringizga yuklab oladi va avtomatik ravishda `origin` deb bog'laydi. Bu loyiha ustida ishlashni boshlashning birinchi qadami.

**Batafsilroq:**

**EN:** Download an existing repository from GitHub (or any remote) to your local machine.

**UZ:** GitHub'dagi mavjud reponi local mashinaga yuklab olish.

```bash
git clone https://github.com/username/my-project.git

# Clone to specific folder | Aniq papkaga clone qilish
git clone https://github.com/username/my-project.git ./my-folder
```

**Intervyuda shunday ayting:** "Clone to'liq tarixni oladi; katta repolar uchun `--depth 1` (sayoz), `--filter=blob:none` (partial clone) yoki `--single-branch`. CI'da sayoz clone tez, lekin tarix kerak bo'ladigan vositalar (versiya hisoblash, `git describe`) uchun yetarli chuqurlik beraman."

---

## Q8. `git add` nima qiladi? / What does `git add` do?

**Oddiy qilib aytganda:** `git add` — o'zgarishlarni keyingi commit'ga 'tayyorlash': qaysi fayllar (yoki fayllarning qaysi qismlari) saqlanishini tanlaysiz. `git add file.py` — bitta fayl, `git add -p` — o'zgarishlarni bo'lakma-bo'lak tanlash.

**Batafsilroq:**

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

**Qo'shimcha — How can we add and commit at the same time:**

**EN:** Use `git commit -a -m` to stage all tracked files and commit in one step.

**UZ:** `git commit -a -m` buyrug'i track qilingan barcha fayllarni bir vaqtda staging va commit qiladi.

```bash
git commit -a -m "Update login logic"

# ⚠️ EN: New (untracked) files still need git add first!
# ⚠️ UZ: Yangi (untracked) fayllar uchun avval git add kerak!
```

**Intervyuda shunday ayting:** "`add` o'zgarishni staging area'ga qo'yadi; `git add -p` bilan mantiqan bog'liq qismlarni ajratib, toza, kichik commit'lar yasayman. `git commit -am` faqat kuzatilayotgan fayllarni qo'shadi — yangi fayllar tushib qolmasligiga e'tibor beraman. `git add .` dan oldin `git status`."

---

## Q9. Staging area nima va faylni undan qanday qaytarasiz? / What is the staging area and how do you unstage a file?

**Oddiy qilib aytganda:** Staging area — 'tayyorlash stoli': commit'ga kiradigan o'zgarishlar shu yerga qo'yiladi. Noto'g'ri faylni qo'shib qo'ysangiz, `git restore --staged file.py` bilan uni stoldan olasiz — o'zgarish ishchi papkada qoladi.

**Batafsilroq:**

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

**Qo'shimcha — How to get back a file from staging area to working area:**

**EN:** Unstage a file without losing its changes.

**UZ:** O'zgarishlarni yo'qotmasdan faylni staging areadan chiqarish.

```bash
git add config.py          # Staged | Staging areaga qo'shildi
git reset HEAD config.py   # Unstaged | Working areaga qaytdi

# Modern way | Zamonaviy usul
git restore --staged config.py
```

**Intervyuda shunday ayting:** "Index ishchi daraxt va commit orasidagi oraliq qatlam — commit'ni aniq shakllantirish imkonini beradi. Zamonaviy buyruqlar: `git restore --staged` (unstage), `git restore` (ishchi o'zgarishni bekor qilish) — eski `reset HEAD file` va `checkout -- file` o'rniga, ular aniqroq."

---

## Q10. What is the use of 'git log'? | 'git log' nima uchun ishlatiladi?

**Oddiy qilib aytganda:** `git log` — commit'lar tarixi: kim, qachon, nima uchun o'zgartirgan. `git log --oneline --graph` qisqa va branch'lar grafigi bilan ko'rsatadi, `git log -p file.py` esa fayl tarixini o'zgarishlari bilan.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Foydali variantlar: `--oneline --graph --all`, `-p` (patch), `-S"matn"` (qaysi commit shu matnni qo'shgan/olib tashlagan), `--author`, `--since`, `-- path`. Qator darajasida kim o'zgartirganini `git blame` (yoki `-L` bilan `log`) ko'rsatadi."

---

## Q11. How to edit an incorrect commit message? | Noto'g'ri commit xabarini qanday o'zgartirish mumkin?

**Oddiy qilib aytganda:** Oxirgi commit xabarida xato qildingizmi? `git commit --amend` bilan uni tuzatasiz. Lekin commit allaqachon umumiy branch'ga push qilingan bo'lsa, ehtiyot bo'lish kerak — tarix o'zgaradi va boshqalarda muammo chiqadi.

**Batafsilroq:**

**EN:** Use `git commit --amend` to change the most recent commit message.

**UZ:** `git commit --amend` buyrug'i faqat oxirgi commit xabarini o'zgartiradi.

```bash
git commit --amend -m "Correct commit message here"

# ⚠️ EN: Only works on the last commit. Don't amend pushed commits!
# ⚠️ UZ: Faqat oxirgi commitga ishlaydi. Push qilingan commitni amend qilmang!
```

**Intervyuda shunday ayting:** "`--amend` oxirgi commit'ni almashtiradi (yangi hash). Push qilinmagan bo'lsa — erkin; umumiy branch'da tarixni qayta yozmayman. O'z feature branch'imda amend qilgan bo'lsam — `git push --force-with-lease` (oddiy `--force` emas — u boshqaning o'zgarishini jimgina o'chirishi mumkin)."

---

## Q12. `git reset` qanday ishlaydi (soft, mixed, hard)? / How does `git reset` work (soft, mixed, hard)?

**Oddiy qilib aytganda:** `git reset` branch'ni oldingi commit'ga 'orqaga suradi'. Uch rejim: `--soft` — commit bekor, o'zgarishlar staging'da qoladi; `--mixed` (standart) — o'zgarishlar ishchi papkada qoladi; `--hard` — o'zgarishlar butunlay o'chadi (xavfli!).

**Batafsilroq:**

**EN:** Reset the current HEAD to a specific state.

**UZ:** HEAD holatini ma'lum commitga qaytarish.

| Flag      | EN                         | UZ                           |
| --------- | -------------------------- | ---------------------------- |
| `--soft`  | Changes go to staging      | O'zgarishlar staging'ga      |
| `--mixed` | Changes go to working area | O'zgarishlar working area'ga |
| `--hard`  | Changes are deleted ⚠️     | O'zgarishlar o'chadi ⚠️      |

```bash
git reset --hard HEAD~1   # EN: Deletes last commit completely! | UZ: Oxirgi commitni butunlay o'chiradi!
```

**Qo'shimcha — How to get back a commit to staging area:**

**EN:** Use `git reset --soft` to undo a commit while keeping changes in the staging area.

**UZ:** `git reset --soft` — commitni bekor qiladi, o'zgarishlar staging areada qoladi.

```bash
git log --oneline
# a1b2c3d Latest commit   <- buni bekor qilamiz | undo this
# f4e5d6c Previous commit <- shunga qaytamiz | go back to this

git reset --soft f4e5d6c
# a1b2c3d ning o'zgarishlari staging areada | changes are in staging
```

**Qo'shimcha — How to get back a commit to work area:**

**EN:** Use `git reset --mixed` to undo commits and put changes back in the working area (not staged).

**UZ:** `git reset --mixed` — commitni bekor qiladi, o'zgarishlar working areaga tushadi (staged emas).

```bash
git reset --mixed f4e5d6c
# O'zgarishlar working areada, stage qilinmagan | Changes in working area, not staged
```

**Intervyuda shunday ayting:** "`reset` HEAD va branch ko'rsatkichini ko'chiradi: soft — index va ishchi daraxtga tegmaydi, mixed — index'ni tozalaydi, hard — hammasini yo'q qiladi. Push qilingan tarix uchun `reset` emas, `revert` ishlataman. `--hard` dan oldin `git stash` yoki branch — xato bo'lsa `reflog` qutqaradi."

---

## Q13. What is 'head' in git? | Git'da 'head' nima?

**Oddiy qilib aytganda:** HEAD — 'siz hozir qayerdasiz' ko'rsatkichi: odatda joriy branch'ning oxirgi commit'iga ishora qiladi. `HEAD~1` — undan bitta oldingi commit. HEAD branch'ga emas, to'g'ridan-to'g'ri commit'ga ishora qilsa — bu 'detached HEAD' holati.

**Batafsilroq:**

**EN:** HEAD is a pointer to the current commit or branch. Default HEAD points to `main` (or `master`).

**UZ:** HEAD — hozirgi commit yoki branchga ishora. Default HEAD `main` (yoki `master`) branchiga ko'rsatadi.

```bash
cat .git/HEAD
# ref: refs/heads/main

git log --oneline
# a1b2c3d (HEAD -> main) Latest commit
```

**Intervyuda shunday ayting:** "HEAD — joriy branch'ga (u esa commit'ga) ramziy havola. Detached HEAD'da yaratilgan commit'lar hech bir branch'ga tegishli emas — saqlash uchun `git switch -c yangi-branch`. `HEAD~n` — birinchi ota bo'yicha, `HEAD^2` — merge commit'ning ikkinchi otasi."

---

## Q14. What is .gitignore file? | .gitignore fayli nima?

**Oddiy qilib aytganda:** .gitignore — Git'ga 'bu fayllarni kuzatma' degan ro'yxat: `node_modules/`, `.env`, `__pycache__/`, build natijalari, IDE sozlamalari. Sir va keraksiz fayllar tasodifan repo'ga tushmaydi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** ".gitignore faqat kuzatilmayotgan fayllarga ta'sir qiladi — allaqachon commit qilingan faylni chiqarish uchun `git rm --cached`. Shaxsiy (IDE, OS) naqshlar — global gitignore yoki `.git/info/exclude` da. Sir tasodifan commit qilinsa, uni almashtirish (rotate) shart — tarixdan o'chirish yetarli emas."

---

## Q15. Ikki commit yoki ikki branch orasidagi farqni qanday ko'rasiz? / How do you diff two commits or two branches?

**Oddiy qilib aytganda:** Farqni ko'rish: `git diff A B` — ikki commit orasidagi o'zgarishlar, `git diff main..feature` — ikki branch orasidagi, `git diff` — hali staging'ga qo'shilmagan o'zgarishlar, `git diff --staged` — commit'ga tayyorlanganlar.

**Batafsilroq:**

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

**Qo'shimcha — How to see the difference between 2 branches:**

**EN:** Compare what changed between two branches.

**UZ:** Ikki branch orasidagi o'zgarishlarni solishtirish.

```bash
git diff main..feature/login
# EN: Shows what feature/login has that main doesn't
# UZ: feature/login'da bor, main'da yo'q narsalarni ko'rsatadi
```

**Intervyuda shunday ayting:** "`main...feature` (uch nuqta) — feature branch main'dan ajralgandan beri nima qo'shganini ko'rsatadi (PR ko'rinishi); ikki nuqta — ikki uchning to'g'ridan-to'g'ri farqi. `--stat` qisqa xulosa, `--word-diff` matn uchun qulay."

---

## Q16. How to recover a deleted file? | O'chirilgan faylni qanday qaytarish mumkin?

**Oddiy qilib aytganda:** O'chirilgan faylni qaytarish: hali commit qilinmagan bo'lsa — `git restore file.py`. Commit'da o'chirilgan bo'lsa — u o'chirilgan commit'dan oldingi versiyadan: `git restore --source=<commit>~1 file.py`.

**Batafsilroq:**

**EN:** If a file was tracked (staged or committed), you can restore it.

**UZ:** Agar fayl track qilingan bo'lsa (staged yoki committed), uni qaytarib olish mumkin.

```bash
# EN: File was deleted accidentally | UZ: Fayl tasodifan o'chirildi
rm important_file.py

git checkout -- important_file.py

# Modern way | Zamonaviy usul
git restore important_file.py
```

**Intervyuda shunday ayting:** "Faylni o'chirgan commit'ni `git log --diff-filter=D -- path` bilan topaman, keyin `git restore --source=<hash>~1 -- path`. Git'da commit qilingan narsa deyarli yo'qolmaydi — branch yoki commit yo'qolgan bo'lsa `reflog` yordam beradi."

---

## Q17. Branch'ni qanday yaratasiz, unga o'tasiz va nomini o'zgartirasiz? / How do you create, switch and rename branches?

**Oddiy qilib aytganda:** Branch — asosiy koddan ajralgan alohida ish yo'li: yangi funksiyani boshqalarga xalaqit bermay yozish uchun. Yaratish va unga o'tish: `git switch -c feature/login`; mavjudiga o'tish: `git switch main`; nomini o'zgartirish: `git branch -m yangi-nom`.

**Batafsilroq:**

**EN:** Use `git branch` to create a new branch.

**UZ:** Yangi branch yaratish uchun `git branch` buyrug'i ishlatiladi.

```bash
git branch feature/login

git branch
# * main              <- hozirgi branch | current branch
#   feature/login     <- yangi branch | new branch
```

**Qo'shimcha — How to checkout to branch:**

**EN:** Switch to an existing branch with `git checkout` or the modern `git switch`.

**UZ:** Mavjud branchga o'tish uchun `git checkout` yoki zamonaviy `git switch` ishlatiladi.

```bash
git checkout feature/login

# Modern way | Zamonaviy usul
git switch feature/login
```

**Qo'shimcha — How to create branch while checkout:**

**EN:** Create and switch to a new branch in one command.

**UZ:** Bir buyruq bilan branch yaratib, unga o'tish.

```bash
git checkout -b feature/register

# Modern way | Zamonaviy usul
git switch -c feature/register
```

**Qo'shimcha — How do you rename the local branch:**

**EN:** Use `git branch -m` to rename a branch.

**UZ:** Branch nomini o'zgartirish uchun `git branch -m` ishlatiladi.

```bash
git branch -m old-branch-name new-branch-name

# EN: Rename current branch | UZ: Hozirgi branchni rename qilish
git branch -m new-branch-name
```

**Intervyuda shunday ayting:** "Zamonaviy buyruqlar: `git switch` (branch'lar) va `git restore` (fayllar) — ko'p ma'noli `checkout` o'rniga. Branch — commit'ga arzon ko'rsatkich, shuning uchun har vazifa uchun alohida qisqa umrli branch. Remote'dagi nomni o'zgartirish uchun yangisini push qilib, eskisini o'chirish kerak."

---

## Q18. Lokal va remote branch'lar ro'yxatini qanday ko'rasiz? / How do you list local and remote branches?

**Oddiy qilib aytganda:** Branch'lar ro'yxati: `git branch` — lokal branch'lar, `git branch -r` — remote branch'lar, `git branch -a` — hammasi. `git branch -vv` har branch qaysi remote branch'ni kuzatayotganini va orqada/oldinda ekanini ko'rsatadi.

**Batafsilroq:**

**EN:** List all local branches.

**UZ:** Barcha local branchlarni ko'rish.

```bash
git branch
# * main              <- active branch | faol branch
#   feature/login
#   hotfix/bug-42
```

**Qo'shimcha — How to see the remote branch list:**

**EN:** List all remote branches.

**UZ:** Barcha remote branchlarni ko'rish.

```bash
git branch -r
# origin/main
# origin/feature/login

# Detailed view | Batafsil ko'rinish
git remote show origin
```

**Qo'shimcha — How to see the local and remote branch list:**

**EN:** Use `-a` flag to see all branches (local + remote).

**UZ:** Barcha branchlarni (local + remote) ko'rish uchun `-a` flag ishlatiladi.

```bash
git branch -a
# * main
#   feature/login
#   remotes/origin/main
#   remotes/origin/feature/login
```

**Intervyuda shunday ayting:** "`git branch -vv` upstream va ahead/behind holatini ko'rsatadi; `git fetch --prune` remote'da o'chirilgan branch'larni lokal ro'yxatdan tozalaydi. Tugagan branch'larni `git branch --merged main` bilan topib o'chiraman."

---

## Q19. Lokal va remote branch'ni qanday o'chirasiz? / How do you delete local and remote branches?

**Oddiy qilib aytganda:** Lokal branch'ni o'chirish: `git branch -d feature` (faqat merge qilingan bo'lsa), majburan — `-D`. Remote'dagi branch'ni o'chirish: `git push origin --delete feature`.

**Batafsilroq:**

**EN:** `-d` deletes safely (only if merged), `-D` forces deletion.

**UZ:** `-d` xavfsiz o'chiradi (faqat merge qilingan bo'lsa), `-D` majburiy o'chiradi.

```bash
# Safe delete | Xavfsiz o'chirish (merge bo'lgan bo'lsa)
git branch -d feature/login

# Force delete | Majburiy o'chirish
git branch -D feature/login
```

**Qo'shimcha — How to delete a Remote Branch:**

**EN:** Delete a branch from the remote repository.

**UZ:** Remote repositorydan branchni o'chirish.

```bash
git push origin -d feature/login

# Alternative | Muqobil usul
git push origin --delete feature/login
```

**Intervyuda shunday ayting:** "`-d` xavfsiz — merge qilinmagan ishni o'chirishga yo'l qo'ymaydi; `-D` ni faqat ishonchim komil bo'lganda. PR merge qilingach, GitHub'da avtomatik branch o'chirishni yoqaman; boshqalarda eski remote-tracking branch'lar `fetch --prune` bilan tozalanadi."

---

## Q20. `git push` qanday ishlaydi (yangi branch, upstream)? / How does `git push` work (new branches, upstream)?

**Oddiy qilib aytganda:** `git push` — lokal commit'larni masofaviy repo'ga yuborish. Yangi branch'ni birinchi marta yuborishda `git push -u origin feature` — `-u` 'bu branch origin'dagi feature bilan bog'langan' deb eslab qoladi, keyin oddiy `git push` yetarli.

**Batafsilroq:**

**EN:** Send your local commits to the remote repository.

**UZ:** Local commitlarni remote (GitHub) repoga yuborish.

```bash
git push origin main

# EN: Push with tracking | UZ: Tracking bilan push
git push -u origin main
# Keyingi safar oddiy "git push" ishlaydi | Next time plain "git push" works
```

**Qo'shimcha — How do you push the files to master branch in remote repo:**

**EN:** Make sure you're on the main/master branch, then push.

**UZ:** main/master branchida turib push qiling.

```bash
git checkout main
git push

# yoki aniq ko'rsatish | or explicitly
git push origin main
```

**Qo'shimcha — How do you push files from local to particular branch:**

**EN:** Specify the branch name when pushing.

**UZ:** Push qilganda branch nomini ko'rsating.

```bash
git push origin feature/login

# Set upstream for future pushes | Keyingi push'lar uchun upstream o'rnatish
git push --set-upstream origin feature/login
# Keyin | Then: git push (enough)
```

**Qo'shimcha — How to push new branch to remote:**

**EN:** Create a branch locally and push it to remote for the first time.

**UZ:** Local'da branch yaratib, birinchi marta remote'ga yuborish.

```bash
git checkout -b feature/payment
# ... ishlar qilinadi | ... do some work ...
git add .
git commit -m "Add payment module"
git push origin feature/payment
```

**Intervyuda shunday ayting:** "Push fast-forward bo'lmasa rad etiladi — avval `pull --rebase` yoki `fetch` + integratsiya. Tarixni qayta yozgan bo'lsam, faqat o'z branch'imda `--force-with-lease`. `push.autoSetupRemote = true` sozlamasi `-u` ni avtomatlashtiradi."

---

## Q21. `git pull` nima qiladi? / What does `git pull` do?

**Oddiy qilib aytganda:** `git pull` = `git fetch` (yangiliklarni yuklab olish) + ularni joriy branch'ga birlashtirish (merge yoki rebase). Ma'lum branch'dan olish: `git pull origin develop`.

**Batafsilroq:**

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

**Qo'shimcha — How do you pull a file from particular remote branch:**

**EN:** Specify the remote and branch name.

**UZ:** Remote va branch nomini ko'rsating.

```bash
git pull origin feature/login
```

**Intervyuda shunday ayting:** "`pull` qulay, lekin yashirin merge commit'lar yaratishi mumkin. Men `pull.rebase = true` yoki `pull.ff = only` sozlayman — tarix chiziqli va kutilmagan merge'lar yo'q. Ehtiyotkor holatlarda `fetch` qilib, avval nima kelganini ko'raman."

---

## Q22. `git fetch` nima va u `pull` dan nimasi bilan farq qiladi? / What is `git fetch` and how does it differ from `pull`?

**Oddiy qilib aytganda:** `git fetch` — masofaviy repo'dagi yangiliklarni yuklab oladi, lekin sizning branch'ingizga **tegmaydi**: `origin/main` yangilanadi, sizning `main` ingiz esa o'zgarmaydi. Avval ko'rib, keyin birlashtirish mumkin. Remote branch'ni lokal branch sifatida olish: `git switch feature` (avtomatik kuzatuvchi branch yaratadi).

**Batafsilroq:**

**EN:** Downloads new data from remote but doesn't merge it into your local branch. Just provides a view of remote changes.

**UZ:** Remote'dan yangi ma'lumotlarni yuklab oladi, lekin local branchga birlashtirmaydi. Faqat ko'rish imkonini beradi.

```bash
git fetch origin
# EN: Remote changes downloaded but not applied
# UZ: Remote o'zgarishlar yuklandi, lekin qo'llanilmadi

git fetch origin feature/login
git checkout feature/login  # O'tish | Switch to it
```

**Qo'shimcha — How do you download a remote branch to local without merge:**

**EN:** Use `git fetch` to download without merging, then checkout to that branch.

**UZ:** Merge qilmasdan yuklab olish uchun `git fetch`, keyin branchga o'tish.

```bash
git fetch origin feature/login
git checkout feature/login
```

**Intervyuda shunday ayting:** "`fetch` xavfsiz — faqat remote-tracking branch'larni yangilaydi. Keyin `git log main..origin/main` bilan nima kelganini ko'rib, merge yoki rebase qilaman. CI va skriptlarda `pull` o'rniga `fetch` + aniq amal — kutilmagan conflict'larsiz."

---

## Q23. What is difference between git clone & git pull? | git clone va git pull farqi nima?

**Oddiy qilib aytganda:** `git clone` — repo'ni **birinchi marta** butunlay yuklab olish (bir marta qilinadi). `git pull` — allaqachon bor repo'ga keyingi yangiliklarni olib kelish (doimiy qilinadi).

**Batafsilroq:**

**EN:** Clone is for first-time download; pull is for updating an existing local repo.

**UZ:** Clone — birinchi marta yuklab olish; pull — mavjud local reponi yangilash.

|     | git clone                       | git pull                       |
| --- | ------------------------------- | ------------------------------ |
| EN  | First time, no local repo       | Repo exists, get updates       |
| UZ  | Birinchi marta, local repo yo'q | Repo mavjud, yangilanish olish |

```bash
# First time | Birinchi marta
git clone https://github.com/username/project.git

# Next time | Keyingi safar
cd project
git pull
```

**Intervyuda shunday ayting:** "Clone — yangi lokal repo va remote sozlamasini yaratadi; pull — mavjud repo'da fetch + integratsiya. Clone'dan keyin ham har kuni fetch/pull bilan yangilanib turish kerak."

---

## Q24. What is git merge? | git merge nima?

**Oddiy qilib aytganda:** `git merge feature` — boshqa branch'dagi o'zgarishlarni joriy branch'ga qo'shish. Agar joriy branch o'zgarmagan bo'lsa, Git uni shunchaki oldinga suradi (fast-forward); aks holda ikki tarixni birlashtiruvchi 'merge commit' yaratadi.

**Batafsilroq:**

**EN:** Combine two branches into one.

**UZ:** Ikki branchni birlashtirish.

```bash
git checkout main           # EN: Switch to target branch | UZ: Target branchga o'tish
git merge feature/login     # EN: Bring feature into main | UZ: Feature'ni main'ga olib keling

# EN: Check result | UZ: Natijani ko'rish
git log --oneline
# a1b2c3d Merge branch 'feature/login'
```

**Intervyuda shunday ayting:** "Fast-forward — chiziqli tarix, merge commit — branch tarixini saqlaydi. `--no-ff` feature'ni bitta mantiqiy guruh sifatida ko'rsatadi; `--squash` hammasini bitta commit'ga yig'adi. Jamoada qaysi uslub ishlatilishini kelishib, GitHub'dagi merge sozlamalarida belgilayman."

---

## Q25. Merge conflict nima va uni qanday hal qilasiz yoki bekor qilasiz? / What is a merge conflict and how do you resolve or abort it?

**Oddiy qilib aytganda:** Conflict — ikki branch faylning **bir xil joyini** turlicha o'zgartirganda paydo bo'ladi: Git qaysi biri to'g'ri ekanini bilmaydi va sizdan so'raydi. Faylda `<<<<<<<`, `=======`, `>>>>>>>` belgilari chiqadi — kerakli variantni qoldirib, belgilarni o'chirasiz, `git add` va davom etasiz. Voz kechmoqchi bo'lsangiz — `git merge --abort`.

**Batafsilroq:**

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

**Qo'shimcha — How do you resolve merge conflict:**

**EN:** Edit the conflicting file manually, then stage and commit.

**UZ:** Conflict bo'lgan faylni qo'lda tahrirlang, keyin add va commit qiling.

```bash
# 1. EN: Open file and fix it | UZ: Faylni oching va to'g'rilang
# 2. EN: Remove <<<<, ====, >>>> markers | UZ: <<<<, ====, >>>> belgilarini o'chiring
# 3. EN: Keep the correct code | UZ: To'g'ri kodni qoldiring

git add app.py
git commit -m "Resolve merge conflict in app.py"
```

**Qo'shimcha — How do you skip from merge conflict:**

**EN:** Abort the merge to return to the state before it started.

**UZ:** Merge'ni bekor qilib, oldingi holatga qaytish.

```bash
git merge --abort
# EN: Everything returns to before merge | UZ: Hamma narsa merge oldidagi holatga qaytadi
```

**Intervyuda shunday ayting:** "Conflict'ni tushunib hal qilaman: ikkala tomon o'zgarishining maqsadini tekshirib, testlarni ishga tushiraman. `merge.conflictStyle = zdiff3` umumiy ajdod versiyasini ham ko'rsatadi — qaror osonlashadi. Takroriy conflict'lar uchun `rerere`. Oldini olish — kichik, tez-tez integratsiya qilinadigan branch'lar."

---

## Q26. What is the function of 'git rm'? | 'git rm' vazifasi nima?

**Oddiy qilib aytganda:** `git rm` — faylni ham diskdan, ham Git kuzatuvidan o'chiradi (keyingi commit'da o'chirilgan bo'ladi). `git rm --cached` esa faylni diskda qoldirib, faqat Git kuzatuvidan chiqaradi — tasodifan commit qilingan `.env` uchun.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`git rm --cached` + `.gitignore` — faylni kuzatuvdan chiqarishning to'g'ri yo'li. Lekin bu tarixdan o'chirmaydi: sir bo'lsa, uni darhol almashtiraman va kerak bo'lsa `git filter-repo` bilan tarixni tozalayman."

---

## Q27. How will you know if a branch has been already merged? | Branch merge qilinganmi yoki yo'qligini qanday bilish mumkin?

**Oddiy qilib aytganda:** Branch allaqachon asosiy branch'ga qo'shilganmi? `git branch --merged main` — main'ga to'liq kirgan branch'lar ro'yxati (ularni xavfsiz o'chirish mumkin); `--no-merged` — hali kirmaganlari.

**Batafsilroq:**

**EN:** Use `--merged` and `--no-merged` flags.

**UZ:** `--merged` va `--no-merged` flaglarini ishlatish.

```bash
git branch --merged
# * main
#   feature/login   <- EN: already merged | UZ: allaqachon merge qilingan

git branch --no-merged
#   feature/payment <- EN: not yet merged | UZ: hali merge qilinmagan
```

**Intervyuda shunday ayting:** "`--merged` commit grafigi bo'yicha tekshiradi — squash yoki rebase bilan merge qilingan branch'lar 'merge qilinmagan' ko'rinadi, chunki ularning asl commit'lari main'da yo'q. Bunday holda PR holati (GitHub) ishonchliroq manba."

---

## Q28. Branching strategiyalari: GitFlow, trunk-based, feature branches / Branching strategies: GitFlow, trunk-based, feature branches

**Oddiy qilib aytganda:** Branching strategiyasi — jamoa branch'lardan qanday foydalanishi haqidagi kelishuv. **Trunk-based** — hamma qisqa umrli branch'lar orqali tez-tez asosiy branch'ga qo'shadi. **GitFlow** — `develop`, `release`, `hotfix` kabi ko'p uzoq yashovchi branch'lar. **Feature branch** — har vazifaga alohida branch va PR.

**Batafsilroq:**

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

**Qo'shimcha — What is branching:**

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

**Qo'shimcha — Monorepo Git Strategy: Trunk-Based Development vs GitFlow:**

| Modellari / Models | Trunk-Based Development                        | GitFlow                                           |
| ------------------ | ---------------------------------------------- | ------------------------------------------------- |
| Branchlar          | Bitta asosiy `main`, qisqa `feature` branchlar | `main`, `develop`, `feature`, `release`, `hotfix` |
| Merge chastotasi   | Kuniga bir necha marta                         | Haftada yoki oyda bir marta                       |
| Mos kelishi        | CI/CD, Microservices, Agile                    | An'anaviy reliz sikllari                          |

**Intervyuda shunday ayting:** "Uzluksiz deploy qiladigan jamoalar uchun trunk-based: qisqa branch'lar, tez PR, tugallanmagan ish feature flag'lar ortida. GitFlow — rejalashtirilgan relizlar va bir nechta qo'llab-quvvatlanadigan versiyalar uchun, lekin uzoq branch'lar integratsiya og'rig'ini oshiradi. Monorepo'da trunk-based + CODEOWNERS + merge queue yaxshi ishlaydi."

---

## Q29. `git stash` nima va qachon ishlatiladi? / What is `git stash` and when do you use it?

**Oddiy qilib aytganda:** `git stash` — tugallanmagan o'zgarishlarni vaqtincha 'cho'ntakka' solib qo'yish: shoshilinch boshqa branch'ga o'tish kerak bo'lganda. Keyin `git stash pop` bilan qaytarib olasiz.

**Batafsilroq:**

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

**Qo'shimcha — When we use git Stash:**

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

**Intervyuda shunday ayting:** "`git stash push -m "izoh"` — nomlangan stash, `-u` — kuzatilmagan fayllar bilan, `git stash list`/`show -p` — ko'rish. Stash'lar tez unutiladi — uzoq ish uchun WIP commit yoki alohida branch yaxshiroq; parallel ish uchun `git worktree`."

---

## Q30. `git merge` va `git rebase` farqi, merge strategiyalari / `git merge` vs `git rebase`, and merge strategies

**Oddiy qilib aytganda:** Ikkalasi ham boshqa branch'dagi o'zgarishlarni qo'shadi, lekin turlicha. **Merge** — ikki tarixni birlashtiruvchi yangi commit yaratadi, tarix o'zgarmaydi. **Rebase** — sizning commit'laringizni asosiy branch'ning oxiriga 'qayta o'ynatadi': tarix chiziqli va toza, lekin commit'lar yangi hash oladi.

**Batafsilroq:**

**EN:** Merge preserves history with a merge commit. Rebase rewrites history for a clean linear log.

**UZ:** Merge tarixni merge commit bilan saqlaydi. Rebase tarixni toza chiziqli qilib qayta yozadi.

|     | git merge               | git rebase                   |
| --- | ----------------------- | ---------------------------- |
| EN  | Adds merge commit       | Rewrites commit history      |
| UZ  | Merge commit qo'shadi   | Commit tarixini qayta yozadi |
| EN  | Preserves full history  | Creates linear history       |
| UZ  | To'liq tarixni saqlaydi | Chiziqli tarix hosil qiladi  |

```bash
# Merge result | Merge natijasi:
# A---B---C---M (M = merge commit)
#          \ /
#           D---E

# Rebase result | Rebase natijasi:
# A---B---C---D'---E' (clean line | toza chiziq)
```

**Qo'shimcha — What is another option for merging in git:**

**EN:** `git rebase` is an alternative to merging that creates a cleaner, linear history.

**UZ:** `git rebase` — merge'ga alternativ, toza chiziqli tarix hosil qiladi.

```bash
git checkout feature/login
git rebase main
# EN: Replays feature commits on top of main
# UZ: Feature commitlarini main ustiga qayta yozadi
```

**Intervyuda shunday ayting:** "Rebase — o'z lokal/feature branch'imni yangilash va tarixni tozalash uchun; umumiy (boshqalar ishlatayotgan) branch'larni rebase qilmayman. Merge — umumiy branch'larga integratsiya uchun, tarixni saqlaydi. Merge strategiyalari: standart `ort`, `-X ours/theirs` — conflict'da bir tomonni afzal ko'rish, `-s ours` — boshqa tarixni qabul qilib, o'zgarishlarini tashlash."

---

## Q31. How do you undo the last commit? | Oxirgi commitni qanday bekor qilish mumkin?

**Oddiy qilib aytganda:** Oxirgi commit'ni bekor qilishning ikki yo'li: hali push qilinmagan bo'lsa — `git reset --soft HEAD~1` (commit yo'qoladi, o'zgarishlar qoladi). Allaqachon umumiy branch'da bo'lsa — `git revert HEAD` (uni bekor qiluvchi **yangi** commit yaratadi, tarix buzilmaydi).

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Qoida: push qilinmagan — `reset` yoki `commit --amend`; push qilingan umumiy tarix — `revert`. Revert tarixni qayta yozmaydi, shuning uchun boshqalar uchun xavfsiz. Merge commit'ni revert qilishda `-m 1` bilan qaysi ota asosiy ekanini ko'rsataman."

---

## Q32. Pull request nima va uni merge qilish mezonlari qanday? / What is a pull request and what are the criteria to merge it?

**Oddiy qilib aytganda:** Pull request (PR) — 'mening branch'imdagi o'zgarishlarni asosiy branch'ga qo'shinglar' degan so'rov. Jamoa kodni ko'rib chiqadi, izoh qoldiradi, avtomatik testlar ishga tushadi va hammasi yaxshi bo'lsa — merge qilinadi.

**Batafsilroq:**

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

**Qo'shimcha — What is the criteria to merge two branches:**

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

**Intervyuda shunday ayting:** "Merge mezonlari: CI yashil (testlar, lint, xavfsizlik skanerlari), kerakli reviewer'lar tasdig'i (CODEOWNERS), conflict yo'q va branch yangilangan. Yaxshi PR — kichik, bitta maqsadli, tavsifida 'nima va nega' va sinash yo'li bilan. Bularni branch protection/rulesets bilan majburiy qilaman."

---

## Q33. GitHub repository'ga kirish huquqlarini qanday boshqarasiz? / How do you manage access to a GitHub repository?

**Oddiy qilib aytganda:** GitHub repo'ga odam qo'shish: Settings → Collaborators (shaxsiy repo) yoki tashkilotda Teams orqali. Har kimga kerakli daraja beriladi: Read, Triage, Write, Maintain, Admin. Repo'ni o'chirish ham Settings'da, lekin bu qaytarib bo'lmaydigan amal.

**Batafsilroq:**

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

**Qo'shimcha — How to delete Repository in GitHub:**

**EN:** Delete through repository settings. This action is permanent and irreversible.

**UZ:** Repository sozlamalari orqali o'chirish. Bu amal qaytarib bo'lmaydi.

```
Repository → Settings → Scroll to bottom (Pastga aylantiring)
→ Danger Zone → Delete this repository
→ Type repository name (Repo nomini yozing)
→ "I understand the consequences, delete the repository"

⚠️ EN: Cannot be undone! | UZ: Qaytarib bo'lmaydi!
```

**Intervyuda shunday ayting:** "Tashkilotlarda kirishni shaxslar emas, jamoalar orqali, eng kam huquq tamoyili bilan beraman; 2FA majburiy, SSO bilan bog'langan. Repo'ni o'chirishdan ko'ra arxivlash xavfsizroq — tarix va issue'lar saqlanadi. Kirish huquqlarini muntazam audit qilaman."

---

# 🔴 Ilg'or mavzular / Advanced

---

## Q34. Katta repository'lar bilan tez ishlash: sparse-checkout, partial clone, Scalar / Working fast with large repos: sparse-checkout, partial clone, Scalar

**Oddiy qilib aytganda:** Juda katta repo'ni to'liq yuklab olish uzoq va joy talab qiladi. Partial clone (`--filter=blob:none`) fayl mazmunini faqat kerak bo'lganda yuklaydi, sparse-checkout esa ishchi papkada faqat kerakli papkalarni ko'rsatadi. Scalar — shu sozlamalarni katta repolar uchun avtomatik yoqadigan vosita.

**Batafsilroq:**

**EN:** Sparse-checkout allows checking out only specific directories in a huge monorepo. `scalar` is a Git tool designed for ultra-large repositories (like Windows or Office codebase).

**UZB:** Sparse-checkout juda katta monorepo loyihalarda faqat kerakli papkalarni yuklab olish imkonini beradi. `scalar` esa gigant repozitoriyalar bilan ishlashni tezlashtiruvchi rasmiy Git vositasidir.

```bash
# Sparse-checkout ni yoqish | Enable sparse checkout
git sparse-checkout init --cone
git sparse-checkout set src/components docs
```

**Qo'shimcha — Git Partial Clone (`--filter=blob:none`) bilan Tezkor Clone qilish:**

```bash
# Faqat commit tarixini yuklash, fayllarni kerak bo'lganda olib kelish
git clone --filter=blob:none https://github.com/org/huge-repo.git
```

**Intervyuda shunday ayting:** "Monorepo'da `git clone --filter=blob:none --sparse` + `git sparse-checkout set apps/api packages/shared` — faqat kerakli qism. Scalar esa partial clone, sparse-checkout, fonda `git maintenance` va fsmonitor'ni birga yoqadi. CI'da ham partial yoki shallow clone vaqtni tejaydi."

---

## Q35. SSH va GPG kalitlari bilan Commitlarni Raqamli Imzolash / Signing Commits with SSH and GPG Keys

**Oddiy qilib aytganda:** Commit'ni imzolash — 'bu commit'ni aynan men yaratdim' degan kriptografik isbot. Git'da muallif nomini istalgan kishi yozib qo'yishi mumkin, imzo esa buni tekshirishga imkon beradi — GitHub'da imzolangan commit'lar yonida 'Verified' belgisi chiqadi.

**Batafsilroq:**

**EN:** Signed commits verify that the commit truly originated from the claimed author and was not spoofed. Modern Git supports signing with SSH keys directly (without GPG setup).

**UZB:** Imzolangan commitlar muallif haqiqatan ham siz ekanligingizni tasdiqlaydi. Zamonaviy Git oddiy SSH kaliti yordamida commitlarni imzolashni qo'llab-quvvatlaydi.

```bash
# SSH kaliti bilan imzolashni sozlash | Configure SSH commit signing
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true

# Commit yaratishda imzolanishini ko'rish
git commit -S -m "Verified secure commit"
```

**Intervyuda shunday ayting:** "Eng oddiy yo'l — SSH kaliti bilan imzolash (`gpg.format = ssh`, `commit.gpgsign = true`) — alohida GPG infratuzilmasi shart emas. Muhim branch'larda rulesets orqali imzolangan commit'larni majburiy qilaman. Kalitlar himoyalangan bo'lishi (masalan, apparat kalit) kerak."

---

## Q36. GitHub Actions Matrix Build va Parallel Testlar / GitHub Actions Matrix Build & Parallel Testing

**Oddiy qilib aytganda:** Matrix build — bitta workflow'ni turli sozlamalar kombinatsiyasida parallel ishga tushirish: masalan, Python 3.12, 3.13, 3.14 va Linux/macOS — jami 6 ta job avtomatik. Testlar turli muhitlarda tekshiriladi va parallel ishlagani uchun tez tugaydi.

**Batafsilroq:**

**EN:** Matrix builds execute workflow jobs across multiple operating systems, Python/Node versions, and database variants simultaneously.

**UZB:** Matrix qurilishi bitta workflow ichida testlarni bir nechta operatsion tizimlar, til versiyalari va ma'lumotlar bazalarida bir vaqtda parallel ishga tushiradi.

```yaml
name: Python Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        python-version: ["3.11", "3.12", "3.13"]
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - run: pip install -r requirements.txt && pytest
```

**Intervyuda shunday ayting:** "`strategy.matrix` bilan kombinatsiyalar, `include`/`exclude` bilan aniqlashtirish, `fail-fast: false` — bitta xato boshqalarni to'xtatmasin, `max-parallel` — resurslarni cheklash. Katta test to'plamlarini shard'larga bo'lib, matrix orqali parallel ishga tushiraman."

---

## Q37. GitHub Actions Reusable Workflows va Composite Actions

**Oddiy qilib aytganda:** Reusable workflow — bir marta yozilgan to'liq workflow'ni boshqa repolar yoki workflow'lardan chaqirish (`workflow_call`). Composite action — bir nechta qadamni bitta 'action'ga birlashtirish. Ikkalasi ham ko'p repolarda bir xil CI kodini takrorlamaslik uchun.

**Batafsilroq:**

**EN:** Reusable workflows reduce DRY code across multiple repositories by calling centralized workflow definitions.

**UZB:** Reusable workflows va Composite actions bir nechta repozitoylar uchun umumiy bo'lgan CI/CD qadamlarini takrorlamasdan bir joydan boshqarish imkonini beradi.

```yaml
# Calling a reusable workflow
jobs:
  call-security-scan:
    uses: my-org/shared-workflows/.github/workflows/security.yml@v1
    with:
      environment: production
    secrets: inherit
```

**Intervyuda shunday ayting:** "Reusable workflow — to'liq job'lar va ularning runner'lari (masalan, tashkilot bo'yicha standart build/deploy); composite action — job ichidagi qadamlar to'plami. Ularni teg yoki SHA bilan versiyalayman, input va secret'larni aniq e'lon qilaman (`secrets: inherit` ni ehtiyotkorlik bilan)."

---

## Q38. GitHub Actions'da OIDC va xavfsizlik / OIDC and security hardening in GitHub Actions

**Oddiy qilib aytganda:** OIDC — CI'dan bulutga (AWS, GCP, Azure) doimiy parol yoki kalit saqlamasdan kirish. GitHub har ishga tushish uchun qisqa muddatli 'shaxsni tasdiqlovchi' token beradi, bulut uni tekshirib, vaqtinchalik ruxsat beradi — o'g'irlanadigan uzoq muddatli sir yo'q.

**Batafsilroq:**

**EN:** OIDC eliminates the need to store long-lived cloud credentials (AWS Access Keys) in GitHub Secrets by using short-lived tokens.

**UZB:** OIDC bulutli xizmatlarga (AWS, GCP, Azure) ulanishda static maxfiy kalitlarni saqlash o'rniga vaqtinchalik xavfsiz tokenlardan foydalanadi.

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - name: Configure AWS Credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
      aws-region: us-east-1
```

**Intervyuda shunday ayting:** "OIDC: `permissions: id-token: write`, bulutda trust policy repo, branch yoki environment bo'yicha cheklanadi. Actions xavfsizligi: `GITHUB_TOKEN` uchun minimal `permissions`, uchinchi tomon action'larini commit SHA bilan qotirish, `pull_request_target` dan ehtiyotkorlik, sirlarni log'ga chiqarmaslik (maskalash avtomatik, lekin to'liq kafolat emas)."

---

## Q39. GitHub CodeQL va Automated Security SAST Scanning

**Oddiy qilib aytganda:** CodeQL — GitHub'ning kodni avtomatik tekshiruvchi xavfsizlik skaneri: SQL injection, XSS, xavfli deserializatsiya kabi zaifliklarni PR bosqichidayoq topadi va natijani 'Security' bo'limida ko'rsatadi.

**Batafsilroq:**

**EN:** CodeQL automatically analyzes code for vulnerabilities (SQL injection, XSS, insecure data deserialization) on every Pull Request.

**UZB:** CodeQL har bir Pull Request yuborilganda koddagi xavfsizlik zaifliklarini avtomatik ravishda statik tahlil qiladi.

**Intervyuda shunday ayting:** "CodeQL — SAST: kodni ma'lumotlar bazasiga aylantirib, zaiflik naqshlarini so'rov bilan qidiradi. Default setup ko'p tillar uchun bir tugmada yoqiladi. Natijalarni triage qilib, yolg'on signallarni sababi bilan yopaman va kritik topilmalarda PR'ni bloklayman."

---

## Q40. GitHub Dependabot va Automated Dependency Updates

**Oddiy qilib aytganda:** Dependabot — kutubxonalaringizni kuzatib, yangi versiya yoki xavfsizlik tuzatmasi chiqsa, o'zi yangilash PR'ini ochadi. Eski, zaif kutubxonalar e'tibordan chetda qolmaydi.

**Batafsilroq:**

**EN:** Dependabot scans `requirements.txt`, `package.json`, or `Go.mod` for vulnerable packages and automatically submits Pull Requests with security patches.

**UZB:** Dependabot loyihangizdagi eskirgan va xavfli kutubxona paketlarini aniqlab, ularni yangilovchi avtomatik Pull Request yuboradi.

**Intervyuda shunday ayting:** "Dependabot alerts (zaifliklar) va version updates (`dependabot.yml`) — guruhlash va jadval bilan PR shovqinini kamaytiraman. Yangilash PR'lari to'liq CI'dan o'tadi; patch darajasidagi xavfsiz yangilanishlarni avtomatik merge qilish mumkin. Muqobil — Renovate."

---

## Q41. Git Reflog va Yo'qolgan Commit yoki Branch'larni Tiklash / Git Reflog and Recovery

**Oddiy qilib aytganda:** Reflog — Git'ning 'qora qutisi': HEAD va branch'lar qayerda bo'lganining lokal tarixi. `reset --hard` bilan commit'ni yo'qotdingizmi yoki branch'ni o'chirdingizmi — `git reflog` da eski hash'ni topib, qaytarib olasiz.

**Batafsilroq:**

**EN:** `git reflog` records every HEAD movement (commits, rebase, resets, checkout), allowing recovery of "lost" commits even after `git reset --hard`.

**UZB:** `git reflog` HEAD ning har bir harakatini yozib boradi. Hatoki `git reset --hard` qilingan taqdirda ham yo'qolgan commitlarni tiklashga yordam beradi.

```bash
# Reflog ni ko'rish | View reflog
git reflog

# Yo'qolgan commit holatiga qaytarish | Recover to lost commit
git reset --hard HEAD@{2}
```

**Intervyuda shunday ayting:** "Reflog lokal va vaqtinchalik (odatda 90 kun), klonlanmaydi. Tiklash: `git reflog` → kerakli hash → `git branch rescue <hash>` yoki `git reset --hard <hash>`. Shuning uchun lokal xatolar deyarli doim tuzatiladi — lekin push qilinmagan va reflog'dan o'chib ketgan ish yo'qolishi mumkin."

---

## Q42. Git Interactive Rebase (`git rebase -i`) bilan Commitlarni Birlashtirish (Squash)

**Oddiy qilib aytganda:** Interactive rebase (`git rebase -i HEAD~5`) — oxirgi commit'larni tartibga keltirish: bir nechtasini bittaga birlashtirish (squash), xabarlarni o'zgartirish, tartibini almashtirish yoki keraksizini olib tashlash. PR'dan oldin tarixni tozalash uchun.

**Batafsilroq:**

**EN:** Interactive rebase allows squashing multiple small commits into a clean, single commit before merging into `main`.

**UZB:** Interaktiv rebase bir nechta mayda commitlarni toza bitta commitga birlashtirish (squash) imkonini beradi.

```bash
# Oxirgi 4 ta commitni tahrirlash | Edit last 4 commits
git rebase -i HEAD~4

# Ochilgan faylda kerakli commitlarni 'pick', 'squash' (s) deb belgilang
```

**Intervyuda shunday ayting:** "PR'dan oldin `rebase -i` bilan 'fix typo' kabi commit'larni birlashtiraman — har commit mantiqiy va o'zi ishlaydigan bo'lsin. `git commit --fixup` + `rebase -i --autosquash` jarayonni avtomatlashtiradi. Faqat hali boshqalar ishlatmayotgan branch'da."

---

## Q43. Git Worktree nima va u parallel feature ustida ishlashda qanday yordam beradi? / What is Git Worktree?

**Oddiy qilib aytganda:** Worktree — bitta repo'dan bir nechta ishchi papka: `git worktree add ../hotfix main` — asosiy ishingizni to'xtatmasdan (stash qilmasdan), boshqa papkada shoshilinch tuzatish ustida ishlaysiz. Tarix bitta, papkalar alohida.

**Batafsilroq:**

**EN:** `git worktree` allows checking out multiple branches simultaneously into separate directories from a single local repo without `git stash` or re-cloning.

**UZB:** `git worktree` bitta repozitoydan bir vaqtning o'zida bir nechta branchlarni alohida papkalarga checkout qilib parallel ishlashga imkon beradi.

```bash
# Yangi worktree papkasi yaratish | Create worktree folder
git worktree add ../hotfix-branch hotfix/login-bug

# Ish tugagach o'chirish | Remove worktree
git worktree remove ../hotfix-branch
```

**Intervyuda shunday ayting:** "Worktree'lar bitta `.git` ni bo'lishadi — klondan tez va joy tejaydi; bir branch bir vaqtda faqat bitta worktree'da checkout bo'la oladi. Uzoq testlar yoki review'ni parallel qilish uchun qulay. Tugagach — `git worktree remove`."

---

## Q44. Git submodule va subtree farqi / Git submodules vs subtree

**Oddiy qilib aytganda:** Submodule — boshqa repo'ni o'z repo'ngiz ichiga **havola** sifatida ulash (aniq commit'ga qotirilgan). Subtree — boshqa repo'ning kodini o'z repo'ngizga **nusxalab** qo'shish. Submodule ixcham, lekin boshqarish murakkab; subtree oddiy ishlatiladi, lekin tarix aralashadi.

**Batafsilroq:**

**EN:** Submodules keep external git repos as pointers to specific commit hashes. Subtrees embed outer repository files directly into the host repo structure.

**UZB:** Submodule tashqi repozitoriyani commit ko'rsatkichi sifatida tutadi. Subtree esa tashqi repozitoriya kodingizni loyihangiz ichiga to'liq integratsiya qiladi.

**Intervyuda shunday ayting:** "Submodule aniq commit'ga qotiriladi va alohida yangilanadi — foydalanuvchilar `--recurse-submodules` ni unutsa, bo'sh papka oladi; URL'larni nisbiy qilish fork'lar bilan ishlashni osonlashtiradi. Subtree klonlovchilar uchun shaffof. Ko'p hollarda paket menejeri (npm, PyPI) yoki monorepo ikkalasidan ham yaxshiroq."

---

## Q45. Git Hooks va pre-commit framework

**Oddiy qilib aytganda:** Git hook — ma'lum hodisada avtomatik ishlaydigan skript: masalan, commit'dan oldin (`pre-commit`) linter va formatlashni ishga tushirish. `pre-commit` framework'i esa bunday tekshiruvlarni jamoa bilan bir xil sozlash va boshqarishni osonlashtiradi.

**Batafsilroq:**

**EN:** `pre-commit` framework runs automated linters (Flake8, Black, ESLint) and security checks before any code commit is allowed locally.

**UZB:** `pre-commit` framework kodingiz commit bo mezdan oldin avtomatik ravishda formatlash, linter va testlardan o'tishini majburiy qiladi.

```bash
# pre-commit o'rnatish | Install pre-commit
pip install pre-commit
pre-commit install
```

**Intervyuda shunday ayting:** "Lokal hook'lar tezkor fikr-mulohaza uchun, lekin ular chetlab o'tilishi mumkin (`--no-verify`) — shuning uchun xuddi shu tekshiruvlar CI'da majburiy. Hook'lar tez bo'lishi kerak (faqat o'zgargan fayllar); sirlarni aniqlash (gitleaks) pre-commit'da juda foydali."

---

## Q46. GitHub Environments, Protection Rules, va Deployment Concurrency

**Oddiy qilib aytganda:** GitHub Environments — `staging`, `production` kabi muhitlar uchun alohida sozlamalar: faqat shu muhitga tegishli sirlar, deploy'dan oldin kimdir tasdiqlashi, faqat ma'lum branch'lardan deploy qilish va bir vaqtda faqat bitta deploy.

**Batafsilroq:**

**EN:** GitHub Environments enforce deployment approval gates, secret scoping, and concurrency limits for staging and production pipelines.

**UZB:** GitHub Environments ishlab chiqarishga chiqarishdan oldin senior muhandislar tasdig'ini (Manual Approval) talab qilish imkonini beradi.

**Intervyuda shunday ayting:** "Production environment'da: required reviewers, wait timer, branch/teg cheklovlari va environment secret'lari (OIDC trust'da environment nomi bilan). `concurrency` bilan bir vaqtdagi deploy'larni navbatga qo'yaman yoki eskisini bekor qilaman."

---

## Q47. Git Bisect bilan Xatolik Keltirib Chiqargan Commitni Aniqlash / Finding Buggy Commit with Git Bisect

**Oddiy qilib aytganda:** Bisect — xato qaysi commit'da paydo bo'lganini ikkiga bo'lib qidirish: 'bu commit'da ishlaydi, bunisida buzilgan' deysiz, Git o'rtadagi commit'ni tekshirishni so'raydi. 1000 ta commit orasidan xatoni ~10 qadamda topasiz.

**Batafsilroq:**

**EN:** `git bisect` uses binary search to pinpoint the exact commit that introduced a bug into the codebase.

**UZB:** `git bisect` binar qidiruv algoritmi orqali koddagi xatoni keltirib chiqargan commitni tezda topib beradi.

```bash
git bisect start
git bisect bad                 # Joriy holat xatoli
git bisect good v1.0.0         # Ishlagan eski versiya
# Git avtomatik ortadagi commitga otadi, test qilib 'good' yoki 'bad' deb belgilang
```

**Intervyuda shunday ayting:** "`git bisect start`, `bad`, `good <hash>`, keyin har qadamda test. `git bisect run ./test.sh` jarayonni to'liq avtomatlashtiradi — skript 0 (yaxshi) yoki 1 (yomon) qaytaradi. Har commit ishlaydigan bo'lsa bisect samarali — bu kichik, toza commit'larning yana bir foydasi."

---

## Q48. Git Cherry-Pick va Konfliktlarni Hal Qilish / Git Cherry-Pick and Conflict Resolution

**Oddiy qilib aytganda:** Cherry-pick — boshqa branch'dagi **bitta aniq** commit'ni joriy branch'ga nusxalash: masalan, `main` dagi xato tuzatmasini `release` branch'iga olish, qolgan o'zgarishlarsiz.

**Batafsilroq:**

**EN:** `git cherry-pick <commit-hash>` applies the changes introduced by an existing commit onto your current working branch.

**UZB:** `git cherry-pick` boshqa branchdagi aniq bitta commitni joriy branchga olib o'tish uchun ishlatiladi.

**Intervyuda shunday ayting:** "`git cherry-pick -x <hash>` — `-x` asl commit havolasini xabarga qo'shadi (kuzatish uchun). Conflict bo'lsa — hal qilib `--continue`. Ko'p cherry-pick — branch'lar juda uzoqlashganining belgisi; hotfix'larni avval main'ga, keyin release'larga olib o'taman."

---

## Q49. Git LFS (Large File Storage) ishlash mexanizmi / Git LFS Architecture

**Oddiy qilib aytganda:** Git LFS — katta fayllar (video, rasm, modellar) uchun: repo'da faylning o'zi emas, kichik 'ko'rsatkich' fayli saqlanadi, haqiqiy fayl esa alohida serverda. Repo kichik va tez qoladi.

**Batafsilroq:**

**EN:** Git LFS replaces large files (videos, ML models, datasets) with text pointers inside Git, storing actual binary data on remote LFS servers.

**UZB:** Git LFS katta fayllarni (videolar, AI modellari) matnli ko'rsatgichga almashtirib, katta fayllarni alohida LFS serverida saqlaydi.

**Intervyuda shunday ayting:** "LFS repo tarixida katta binarlarni ko'rsatkichlarga almashtiradi va checkout'da kerakli versiyani yuklaydi. `.gitattributes` da naqshlarni belgilayman; saqlash va trafik kvotalarini hisobga olaman. Mavjud tarixni ko'chirish uchun `git lfs migrate`; LFS fayllar uchun qulflash ham bor."

---

## Q50. Branch protection, rulesets va merge queue / Branch protection, rulesets and merge queue

**Oddiy qilib aytganda:** Branch protection — muhim branch'lar (masalan, `main`) uchun qoidalar: to'g'ridan-to'g'ri push taqiqlangan, faqat PR orqali, testlar o'tishi va review tasdig'i shart. Rulesets — bu qoidalarning yangi, moslashuvchanroq versiyasi (bir nechta repo va branch'ga birdan). Merge queue — PR'larni navbatga qo'yib, har birini eng so'nggi `main` bilan birga tekshiradi.

**Batafsilroq:**

**EN:** Protection rules require status checks to pass, code review approvals, and linear commit history. Merge Queue tests merged PRs in batches to prevent broken main builds.

**UZB:** Protection rules PR'larni kamida 1-2 muhandis ko'rib chiqqach va CI testlar muvaffaqiyatli o'tgachgina main branchga qo'shishni ta'minlaydi.

**Qo'shimcha — How to Lock a branch? Why we need to lock a branch:**

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

**Intervyuda shunday ayting:** "Rulesets — eski branch protection'dan kuchliroq: tashkilot darajasida, qatlamlanadi, bypass ro'yxatlari bilan, teglar uchun ham. Majburiy: status check'lar, review, imzolangan commit'lar, chiziqli tarix. Merge queue ko'p PR'li repoda 'yakka o'zi yashil, birga qizil' muammosini hal qiladi."

---

## Q51. GitHub Actions'da kesh, artifact'lar va runner'lar / Caching, artifacts and runners in GitHub Actions

**Oddiy qilib aytganda:** Actions'da `actions/cache` — build'lar orasida bog'liqliklarni (npm, pip paketlari) saqlash: har safar internetdan qayta yuklamaslik. Artifact — bir job natijasini (build fayllari, test hisobotlari) boshqa job'ga yoki yuklab olish uchun saqlash. Runner — job'ni bajaradigan mashina: GitHub'niki yoki o'zingizniki (self-hosted).

**Batafsilroq:**

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
    restore-keys: |
      ${{ runner.os }}-pip-
```

**Intervyuda shunday ayting:** "Kesh kaliti lock-fayl hash'iga bog'liq (`hashFiles('**/package-lock.json')`), `restore-keys` bilan qisman moslik; `setup-node`/`setup-python` o'rnatilgan keshni ham beradi. Artifact'lar — job'lararo natija va hisobotlar (muddati bilan). Self-hosted runner'lar — maxsus apparat yoki ichki tarmoq uchun, lekin ommaviy repolarda xavfli; vaqtinchalik (ephemeral) runner'lar afzal."

---

# ⚫ Ekspert mavzular / Expert

---

## Q52. Git obyektlari: blob, tree, commit, tag va SHA-256 / Git objects: blobs, trees, commits, tags and SHA-256

**Oddiy qilib aytganda:** Git ichkarida hamma narsani 4 xil obyekt sifatida saqlaydi: **blob** — fayl mazmuni, **tree** — papka (fayl nomlari va blob'larga havolalar), **commit** — tree'ga havola + muallif + xabar + ota commit, **tag** — commit'ga nom. Har obyekt mazmunining hash'i bilan aniqlanadi.

**Batafsilroq:**

**EN:** Git is a content-addressable filesystem. Blobs store file data, Trees store directory structures, Commits point to top-level trees and parents.

**UZB:** Git — ma'lumotlar manziliga asoslangan fayl tizimi. Blob'lar fayl mazmunini, Tree'lar kataloglarni, Commit'lar esa loyiha holatini saqlaydi.

**Intervyuda shunday ayting:** "Git — kontentga manzillangan saqlash: obyekt ID'si mazmun hash'i, shuning uchun bir xil fayl bir marta saqlanadi va tarixni sezilmasdan o'zgartirib bo'lmaydi. Tarixiy standart SHA-1; SHA-256 repolar qo'llab-quvvatlanadi va Git 3.0 da standart bo'lishi rejalashtirilgan. Ichkarini `git cat-file -p <hash>` bilan ko'rish mumkin."

---

## Q53. Packfile'lar, `git gc` va `git maintenance` / Packfiles, `git gc` and `git maintenance`

**Oddiy qilib aytganda:** Git obyektlarini dastlab alohida fayllar sifatida saqlaydi, keyin vaqti-vaqti bilan ularni 'packfile'larga siqib jamlaydi: o'xshash fayllar faqat farqi (delta) sifatida saqlanadi — joy keskin tejaladi. `git gc` va `git maintenance` bu tozalash va siqishni bajaradi.

**Batafsilroq:**

**EN:** `git gc` packs individual loose objects into packfiles using delta compression to save repository disk space.

**UZB:** `git gc` ko'plab alohida obyektlarni ixcham packfile'larga va delta siqish algoritmlariga aylantirib, repo hajmini kamaytiradi.

**Intervyuda shunday ayting:** "Packfile'lar delta siqish bilan saqlash va tarmoq uzatishni tejaydi; `gc` bo'sh obyektlarni tozalaydi va pack'laydi. Katta repolarda `git maintenance start` — fonda prefetch, commit-graph va inkremental repack; bu `git status`/`log` ni sezilarli tezlashtiradi."

---

## Q54. Git Filter-Repo bilan Maxfiy Parollarni Git Tarixidan Butunlay O'chirish

**Oddiy qilib aytganda:** Tarixga tasodifan parol yoki API kalit commit qilinsa, uni oddiy o'chirish yetarli emas — eski commit'larda qoladi. `git filter-repo` butun tarixni qayta yozib, faylni yoki matnni hamma commit'lardan olib tashlaydi.

**Batafsilroq:**

```bash
# Maxfiy token yoki faylni barcha tarix bo'yicha to'liq tozalash
pip install git-filter-repo
git filter-repo --invert-paths --path .env
```

**Intervyuda shunday ayting:** "Birinchi qadam — sirni darhol almashtirish (rotate): tarixni tozalash uni sir bo'lmagan holatga qaytarmaydi, chunki klonlar va keshlar bor. Keyin `git filter-repo --replace-text` yoki `--path ... --invert-paths`, force-push va hamma qayta klonlaydi; GitHub'da keshlangan ko'rinishlarni tozalash uchun support'ga murojaat. Oldini olish — pre-commit'da secret skaner va push protection."

---

## Q55. GitHub CLI (`gh`) bilan Terminal orqali PR va Issuelar bilan ishlash

**Oddiy qilib aytganda:** GitHub CLI (`gh`) — brauzerga kirmasdan terminaldan PR yaratish, review qilish, issue ochish, Actions natijalarini ko'rish va GitHub API'ni chaqirish: `gh pr create`, `gh pr checkout 123`, `gh run watch`.

**Batafsilroq:**

```bash
# Terminaldan PR yaratish va merge qilish | Create and merge PR from CLI
gh pr create --title "Fix login bug" --body "Resolves issue #42"
gh pr merge --auto --squash
```

**Intervyuda shunday ayting:** "`gh` ish oqimini tezlashtiradi va skriptlashtiradi: `gh pr create --fill`, `gh pr checks`, `gh run view --log-failed`, `gh api` (REST/GraphQL). CI'da `GITHUB_TOKEN` bilan avtomatlashtirish uchun ham qulay."

---

## Q56. Git Rerere (Reuse Recorded Resolution) bilan Takroriy Konfliktlarni Avtomatik Yechish

**Oddiy qilib aytganda:** Rerere — 'yozib olingan yechimni qayta ishlatish': bir xil conflict'ni bir marta qo'lda hal qilsangiz, Git yechimni eslab qoladi va keyingi safar (masalan, uzoq branch'ni qayta-qayta rebase qilganda) o'zi qo'llaydi.

**Batafsilroq:**

```bash
# Rerere ni yoqish | Enable rerere
git config --global rerere.enabled true
```

**Intervyuda shunday ayting:** "`git config rerere.enabled true` — takroriy rebase/merge'larda vaqtni tejaydi. Avtomatik qo'llangan yechimni baribir ko'rib chiqaman va testlarni ishga tushiraman — eslab qolingan yechim yangi kontekstda noto'g'ri bo'lishi mumkin."

---

# 📎 Ilova / Appendix

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

_Prepared by | Tayyorlagan: Alyorjon_  
_Source | Manba: GIT Interview Q&A_

---
