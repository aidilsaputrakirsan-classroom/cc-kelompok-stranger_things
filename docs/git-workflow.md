#  🔀 Git Workflow Guide

## 1. Branch Naming
Setiap anggota wajib membuat branch baru dari `main` sebelum mengerjakan tugas. Branch digunakan agar perubahan tidak langsung masuk ke branch utama.

**Format branch yang digunakan:**

| Tipe Branch | Kapan Digunakan | Contoh |
|---|---|---|
| `feature/` | Untuk membuat fitur baru | `feature/user-profile` |
| `fix/` | Untuk memperbaiki bug atau error | `fix/login-token-expired` |
| `docs/` | Untuk mengubah atau menambah dokumentasi | `docs/api-docs-update` |
| `refactor/` | Untuk merapikan kode tanpa mengubah cara kerja fitur | `refactor/split-crud-service` |
| `chore/` | Untuk perubahan pendukung seperti konfigurasi atau dependency | `chore/update-requirements` |

## 2. Commit Convention
Commit message menggunakan format Conventional Commits agar riwayat perubahan lebih mudah dibaca.

**Format:**

`type: deskripsi singkat`

**Jenis commit yang digunakan:**

| Tipe Commit | Kapan Digunakan | Contoh |
|---|---|---|
| `feat` | Menambahkan fitur baru | `feat: add user profile page` |
| `fix` | Memperbaiki bug atau error | `fix: resolve JWT token expiry issue` |
| `docs` | Menambah atau memperbarui dokumentasi | `docs: update API endpoint list in README` |
| `refactor` | Merapikan struktur kode tanpa mengubah fungsi utama | `refactor: extract auth logic to separate module` |
| `chore` | Untuk perubahan pendukung seperti konfigurasi, maintenance, atau dependency  | `chore: update python dependencies` |
| `test` | Menambah atau memperbarui testing | `test: add unit tests for CRUD operations` |
| `style` | Memperbaiki tampilan penulisan kode, seperti spasi, indentasi, atau format | `style: fix indentation in docker-compose.yml` |

## 3. Pull Request Process
Pull Request (PR) digunakan agar setiap perubahan tidak langsung masuk ke branch `main`. Dengan PR, perubahan bisa dicek dulu oleh anggota lain sebelum digabungkan.

### Alur Pull Request yang digunakan tim:

#### 1. Ambil update terbaru dari branch `main`.
```bash
git checkout main
git pull origin main
```

#### 2. Buat branch baru sesuai tugas.
Contoh:
```bash
git checkout -b docs/git-workflow-guide
```

#### 3. Kerjakan perubahan di branch tersebut.
#### 4. Simpan perubahan dengan commit message yang jelas.
Contoh:
```bash
git add .
git commit -m "docs: add git workflow guide"
```

#### 5. Push branch ke GitHub.
```bash
git push origin docs/git-workflow-guide
```

#### 6. Buka repository di GitHub, lalu klik Compare & pull request.
#### 7. Isi informasi PR:
   - Title mengikuti format commit, contoh: docs: add git workflow guide
   - Description menjelaskan perubahan yang dibuat
   - Assignees diisi dengan nama pembuat PR
   - Reviewers diisi dengan minimal 1 anggota lain

#### 8. Klik Create pull request.
#### 9. Reviewer mengecek perubahan dan memberikan komentar review.
#### 10. Setelah PR disetujui, lakukan Squash and merge.
#### 11. Setelah berhasil merge, hapus branch dengan klik Delete branch.

## 4. Review Guidelines
Review dilakukan untuk memastikan perubahan yang masuk ke main sudah sesuai, aman, dan mudah dipahami.

Hal yang perlu dicek oleh reviewer:
| Hal yang Dicek | Penjelasan |
|---|---|
| Kesesuaian tugas | Pastikan perubahan sudah sesuai dengan tugas yang dikerjakan |
| File yang diubah | Pastikan file yang diubah memang sesuai dengan bagian tugas |
| Commit message | Pastikan judul PR dan commit message sudah jelas serta mengikuti format |
| Isi perubahan | Pastikan isi kode atau dokumentasi mudah dipahami |
| File sensitif | Pastikan tidak ada file rahasia seperti `.env`, password, atau token |
| Dampak ke bagian lain | Pastikan perubahan tidak merusak fitur atau konfigurasi lain |

## 5. Referensi CODEOWNERS
Repository ini menggunakan file `.github/CODEOWNERS` untuk membantu menentukan reviewer otomatis berdasarkan area file yang diubah. Selain itu, tim juga menggunakan aturan pasangan review agar setiap Pull Request dicek oleh anggota lain sebelum di-merge ke `main`.

### Pasangan Review Tim

| PR dari | Reviewer |
|---|---|
| Lead Backend | Lead Frontend |
| Lead Frontend | Lead Backend |
| Lead DevOps | Lead QA & Docs |
| Lead QA & Docs | Lead DevOps |

### Area File dan Reviewer

| Area File | Reviewer yang Sesuai |
|---|---|
| `backend/` | Lead Backend |
| `frontend/` | Lead Frontend |
| `docker-compose.yml` | Lead DevOps |
| `backend/Dockerfile` | Lead DevOps |
| `frontend/Dockerfile` | Lead DevOps |
| `Makefile` | Lead DevOps |
| `README.md` | Lead QA & Docs |
| `docs/` | Lead QA & Docs |

Dengan aturan ini, Pull Request tidak hanya diperiksa berdasarkan siapa pembuatnya, tetapi juga berdasarkan area file yang diubah. Misalnya, PR dari Lead QA & Docs akan direview oleh Lead DevOps sesuai pasangan review, sedangkan perubahan pada folder `docs/` tetap menjadi tanggung jawab Lead QA & Docs berdasarkan CODEOWNERS.