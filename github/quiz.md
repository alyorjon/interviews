# 🧪 GitHub Interaktiv Quiz — Self-Test MCQ
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** GIT qanday turdagi tizim? / What type of system is Git?
A) Markazlashgan versiya boshqaruv tizimi / Centralized version control system
B) Taqsimlangan versiya boshqaruv tizimi (DVCS) / Distributed version control system (DVCS)
C) Faqat fayl saqlash tizimi / Just a file storage system
D) Ma'lumotlar bazasi boshqaruv tizimi / A database management system

**2.** Yangi local repository yaratish uchun qaysi buyruq ishlatiladi? / Which command creates a new local repository?
A) `git clone`
B) `git init`
C) `git start`
D) `git new`

**3.** `git clone` nima qiladi? / What does `git clone` do?
A) Yangi bo'sh repo yaratadi / Creates a new empty repo
B) GitHub'dagi mavjud reponi local mashinaga yuklab oladi / Downloads an existing repository to your local machine
C) Fayllarni o'chiradi / Deletes files
D) Branchni birlashtiradi / Merges a branch

**4.** `git add .` nima qiladi? / What does `git add .` do?
A) Barcha fayllarni working areadan staging areaga o'tkazadi / Moves all files from the working area to the staging area
B) Barcha fayllarni commit qiladi / Commits all files
C) Barcha fayllarni o'chiradi / Deletes all files
D) Remote repo yaratadi / Creates a remote repo

**5.** Staging area nima? / What is the staging area?
A) GitHub serveridagi joy / A location on the GitHub server
B) Working fayllar va commitlar orasidagi "kutish zonasi" / A "holding area" between working files and commits
C) `.gitignore` fayli / The `.gitignore` file
D) Remote repository / The remote repository

**6.** `git commit -a -m "message"` nima qiladi? / What does `git commit -a -m "message"` do?
A) Faqat yangi (untracked) fayllarni commit qiladi / Only commits new (untracked) files
B) Track qilingan barcha fayllarni bir vaqtda staging va commit qiladi / Stages and commits all already-tracked files in one step
C) Barcha branchlarni birlashtiradi / Merges all branches
D) Remote repodan pull qiladi / Pulls from the remote repo

**7.** `.gitignore` fayli nima uchun kerak? / What is the `.gitignore` file for?
A) Commit xabarlarini saqlash uchun / Storing commit messages
B) Git kuzatmasligi kerak bo'lgan fayl va papkalar ro'yxati uchun / Listing files and folders Git should not track
C) Branch nomlarini saqlash uchun / Storing branch names
D) Remote URL'larni saqlash uchun / Storing remote URLs

**8.** Yangi branch yaratish uchun qaysi buyruq ishlatiladi? / Which command creates a new branch?
A) `git branch feature/login`
B) `git commit feature/login`
C) `git push feature/login`
D) `git add feature/login`

**9.** Branch yaratib, bir vaqtning o'zida unga o'tish uchun qaysi buyruq ishlatiladi? / Which command creates a branch and switches to it in one step?
A) `git branch -d`
B) `git checkout -b`
C) `git merge -c`
D) `git log -b`

**10.** `git push origin main` nima qiladi? / What does `git push origin main` do?
A) Remote'dan o'zgarishlarni yuklab oladi / Downloads changes from the remote
B) Local commitlarni remote repoga yuboradi / Sends local commits to the remote repository
C) Branchni o'chiradi / Deletes a branch
D) Yangi repo yaratadi / Creates a new repo

---

## 🟡 Intermediate (11–20)

**11.** Bare repository haqida qaysi tavsif to'g'ri? / Which description of a bare repository is correct?
A) Working fayllarga ega, lekin `.git` papkasi yo'q / Has working files but no `.git` folder
B) Faqat versiya ma'lumotlarini saqlaydi — working fayllar va `.git` papkasi yo'q / Only stores version control info — no working files, no `.git` subdirectory
C) Faqat GitHub veb-saytida mavjud bo'ladi / Only exists on the GitHub website
D) Har doim bo'sh, hech qanday tarixga ega emas / Always empty, has no history

**12.** `git config --global alias.lo "log --oneline"` nima qiladi? / What does this command do?
A) `log --oneline` buyrug'iga `lo` degan qisqa nom (alias) yaratadi / Creates a shortcut named `lo` for `log --oneline`
B) Yangi branch yaratadi / Creates a new branch
C) Log tarixini o'chiradi / Deletes the log history
D) Remote repo bilan sinxronlaydi / Syncs with the remote repo

**13.** `git log --author="Alyorjon"` nima qiladi? / What does `git log --author="Alyorjon"` do?
A) Faqat Alyorjon commit qilgan fayllarni o'chiradi / Deletes files committed by Alyorjon
B) Commit tarixini muallif bo'yicha filtrlaydi / Filters the commit history by author
C) Yangi foydalanuvchi yaratadi / Creates a new user
D) Branch nomini o'zgartiradi / Renames a branch

**14.** `git reset` ning `--soft`, `--mixed`, `--hard` flaglari orasidagi farq nimada? / What differentiates `--soft`, `--mixed`, `--hard` in `git reset`?
A) Ular bir xil ishlaydi / They all work identically
B) O'zgarishlar qayerga tushishi bilan farqlanadi: staging, working area, yoki butunlay o'chiriladi / They differ in where changes end up: staging, working area, or deleted entirely
C) Faqat branch nomlarini o'zgartiradi / They only rename branches
D) Faqat remote repoga ta'sir qiladi / They only affect the remote repo

**15.** Git'da HEAD nima? / What is HEAD in Git?
A) Eng qadimgi commit / The oldest commit
B) Hozirgi commit yoki branchga ishora qiluvchi ko'rsatkich / A pointer to the current commit or branch
C) `.gitignore` fayli / The `.gitignore` file
D) Remote repository nomi / The name of the remote repository

**16.** Ikki commit orasidagi farqni ko'rish uchun qaysi buyruq ishlatiladi? / Which command shows the difference between two commits?
A) `git status`
B) `git diff <id1>..<id2>`
C) `git branch -a`
D) `git stash list`

**17.** `git branch -d` va `git branch -D` orasidagi farq nima? / What's the difference between `git branch -d` and `git branch -D`?
A) Farq yo'q / No difference
B) `-d` faqat merge qilingan branchni xavfsiz o'chiradi, `-D` majburiy o'chiradi / `-d` safely deletes only if merged, `-D` forces deletion
C) `-d` remote branchni o'chiradi, `-D` local branchni / `-d` deletes remote branches, `-D` deletes local ones
D) `-D` faqat `main` branch uchun ishlaydi / `-D` only works on the `main` branch

**18.** `git merge` va `git rebase` orasidagi asosiy farq nima? / What's the key difference between `git merge` and `git rebase`?
A) Merge tarixni merge commit bilan saqlaydi, rebase esa tarixni qayta yozib chiziqli qiladi / Merge preserves history with a merge commit, rebase rewrites history for a linear log
B) Ular bir xil natija beradi / They produce identical results
C) Rebase hech qachon konflikt keltirib chiqarmaydi / Rebase never causes conflicts
D) Merge faqat remote branchlar uchun ishlaydi / Merge only works on remote branches

**19.** `git stash` qachon foydali? / When is `git stash` useful?
A) Commitni butunlay o'chirish uchun / To permanently delete a commit
B) Commit qilmasdan joriy ishni vaqtincha saqlab, branch/context almashtirish kerak bo'lganda / When you need to temporarily save uncommitted work and switch context/branches
C) Yangi repository yaratish uchun / To create a new repository
D) Remote URL'ni o'zgartirish uchun / To change the remote URL

**20.** Oxirgi commitni xavfsiz bekor qilish uchun (tarixni o'chirmasdan) qaysi buyruq ishlatiladi? / Which command safely undoes the last commit without deleting history?
A) `git reset --hard`
B) `git revert`
C) `git branch -D`
D) `git rm`

---

## 🔴 Advanced (21–30)

**21.** `git reflog` nima uchun ishlatiladi? / What is `git reflog` used for?
A) Remote branchlarni ro'yxatlash uchun / To list remote branches
B) HEAD ning har bir harakatini yozib borish va hatto `git reset --hard`dan keyin ham yo'qolgan commitlarni tiklash uchun / To record every HEAD movement and recover "lost" commits even after `git reset --hard`
C) `.gitignore` faylini avtomatik yaratish uchun / To auto-generate a `.gitignore` file
D) Pull requestlarni ko'rish uchun / To view pull requests

**22.** Interactive rebase (`git rebase -i`) nima uchun ishlatiladi? / What is interactive rebase (`git rebase -i`) used for?
A) Remote repositoryni o'chirish uchun / To delete the remote repository
B) Bir nechta mayda commitlarni toza bitta commitga birlashtirish (squash) uchun / To squash multiple small commits into a clean, single commit
C) `.gitignore` faylini tahrirlash uchun / To edit the `.gitignore` file
D) Yangi remote qo'shish uchun / To add a new remote

**23.** `git worktree` nimaga imkon beradi? / What does `git worktree` allow?
A) Bitta repodan bir vaqtning o'zida bir nechta branchlarni alohida papkalarga checkout qilib parallel ishlashga / Checking out multiple branches simultaneously into separate directories from a single repo
B) Faqat bitta branchda ishlashga / Working on only one branch at a time
C) Repositoryni butunlay o'chirishga / Deleting the repository entirely
D) Commit xabarlarini avtomatik yozishga / Automatically writing commit messages

**24.** `git bisect` nima uchun ishlatiladi? / What is `git bisect` used for?
A) Ikki branchni birlashtirish uchun / To merge two branches
B) Binar qidiruv orqali xatoni keltirib chiqargan commitni topish uchun / To pinpoint the exact commit that introduced a bug using binary search
C) Fayllarni siqish uchun / To compress files
D) Remote URL'ni tekshirish uchun / To check the remote URL

**25.** `git cherry-pick <commit-hash>` nima qiladi? / What does `git cherry-pick <commit-hash>` do?
A) Boshqa branchdagi bitta aniq commitni joriy branchga olib o'tadi / Applies a specific commit from another branch onto the current branch
B) Butun branchni o'chiradi / Deletes the entire branch
C) Barcha commitlarni squash qiladi / Squashes all commits
D) Repositoryni klonlaydi / Clones the repository

**26.** Git LFS (Large File Storage) nima uchun ishlatiladi? / What is Git LFS used for?
A) Commit xabarlarini imzolash uchun / For signing commit messages
B) Katta fayllarni (video, AI modellari) matnli ko'rsatgichga almashtirib, haqiqiy ma'lumotni alohida LFS serverda saqlash uchun / To replace large files with text pointers while storing the actual data on a separate LFS server
C) Branchlarni bloklash uchun / For locking branches
D) SQL so'rovlarini optimallashtirish uchun / For optimizing SQL queries

**27.** GitHub OIDC (OpenID Connect) autentifikatsiyasining asosiy afzalligi nima? / What's the main advantage of GitHub OIDC authentication?
A) GitHub Secrets'da uzoq muddatli statik kalitlarni saqlash o'rniga qisqa muddatli tokenlardan foydalanadi / It uses short-lived tokens instead of storing long-lived static credentials in GitHub Secrets
B) Barcha foydalanuvchilarga admin huquqi beradi / It grants admin rights to all users
C) Internetsiz ishlashga imkon beradi / It enables offline work
D) Commitlarni avtomatik squash qiladi / It automatically squashes commits

**28.** GitHub Actions'da Matrix build nima qiladi? / What does a Matrix build do in GitHub Actions?
A) Faqat bitta OS va bitta til versiyasida test qiladi / Tests on only one OS and one language version
B) Workflow joblarini bir nechta OS va til versiyalarida bir vaqtning o'zida parallel ishga tushiradi / Runs workflow jobs across multiple OS and language versions simultaneously
C) Repositoryni o'chiradi / Deletes the repository
D) Faqat production muhitida ishlaydi / Only runs in the production environment

**29.** `git filter-repo --invert-paths --path .env` buyrug'i nima uchun ishlatiladi? / What is `git filter-repo --invert-paths --path .env` used for?
A) `.env` faylini yangilash uchun / To update the `.env` file
B) Maxfiy fayl/tokenni butun Git tarixidan to'liq o'chirish uchun / To completely remove a secret file/token from the entire Git history
C) `.env` faylini staging areaga qo'shish uchun / To stage the `.env` file
D) Yangi branch yaratish uchun / To create a new branch

**30.** Trunk-Based Development va GitFlow orasidagi asosiy farq nima? / What's the key difference between Trunk-Based Development and GitFlow?
A) Ular bir xil model / They are the same model
B) Trunk-Based bitta asosiy `main` va qisqa feature branchlar bilan kuniga bir necha marta merge qiladi, GitFlow esa `develop`, `release`, `hotfix` kabi bir nechta uzoq muddatli branchlar bilan kamroq tez-tez merge qiladi / Trunk-Based merges multiple times a day using one main branch and short-lived feature branches, while GitFlow uses several long-lived branches (develop, release, hotfix) and merges less frequently
C) GitFlow faqat GitHub'da mavjud / GitFlow only exists on GitHub
D) Trunk-Based hech qachon branch yaratmaydi / Trunk-Based never creates branches

---

## ✅ Javoblar / Answer Key

| # | Javob | # | Javob | # | Javob |
|---|---|---|---|---|---|
| 1 | B | 11 | B | 21 | B |
| 2 | B | 12 | A | 22 | B |
| 3 | B | 13 | B | 23 | A |
| 4 | A | 14 | B | 24 | B |
| 5 | B | 15 | B | 25 | A |
| 6 | B | 16 | B | 26 | B |
| 7 | B | 17 | B | 27 | A |
| 8 | A | 18 | A | 28 | B |
| 9 | B | 19 | B | 29 | B |
| 10 | B | 20 | B | 30 | B |

**Natijangizni baholang / Score yourself:**
- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `github/basics.md` ni qayta ko'rib chiqing 🟢 / Review `github/basics.md`

---

*Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida*
