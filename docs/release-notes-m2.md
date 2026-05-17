# 🚀 Release Notes — Milestone 2

Dokumen ini berisi catatan rilis untuk Milestone 2. Pada milestone ini, aplikasi sudah memasuki tahap CI/CD dan deployment ke environment production.

---


## 1. Fitur yang Sudah Ada

Pada Milestone 2, aplikasi sudah memiliki beberapa fitur utama yang mendukung pengelolaan data pengguna, data anak, jadwal imunisasi, fasilitas kesehatan, dan artikel edukasi.

Beberapa fitur yang sudah tersedia pada aplikasi:

| No | Modul | Fitur | Keterangan |
|---|---|---|---|
| 1 | Autentikasi | Register | Membuat akun baru |
| 2 | Autentikasi | Login | Masuk ke aplikasi menggunakan akun yang terdaftar |
| 3 | Autentikasi | Logout | Keluar dari aplikasi |
| 4 | Data Anak | List Anak | Menampilkan daftar data anak |
| 5 | Data Anak | Tambah Anak | Menambahkan data anak baru |
| 6 | Data Anak | Edit Anak | Mengubah data anak |
| 7 | Data Anak | Hapus Data Anak | Menghapus data anak |
| 8 | Data Anak | Detail Anak | Menampilkan informasi detail anak |
| 9 | ImuniTrack | List Jadwal Imunisasi | Menampilkan daftar jadwal imunisasi |
| 10 | ImuniTrack | Tambah Jadwal | Menambahkan jadwal imunisasi |
| 11 | ImuniTrack | Update Status Jadwal | Memperbarui status jadwal imunisasi |
| 12 | ImuniTrack | Detail Jadwal | Menampilkan detail jadwal imunisasi |
| 13 | Faskes Map | Daftar Faskes | Menampilkan daftar fasilitas kesehatan |
| 14 | Faskes Map | Tambah Faskes | Menambahkan data fasilitas kesehatan |
| 15 | Faskes Map | Detail Faskes | Menampilkan detail fasilitas kesehatan |
| 16 | Dashboard | Artikel Edukasi | Menampilkan artikel edukasi terkait kesehatan atau imunisasi |
| 17 | Kembang Diary | Tambah Data Pertumbuhan | Menambahkan data berat dan tinggi badan anak |

---

## 2. URL Production

| Service | URL |
|---|---|
| Frontend | `https://cc-kelompok-strangerthings.akhzafachrozy.my.id/` |
| Backend API |  |
| API Docs / Swagger |  |


---

## 3. Tech Stack

| Komponen | Teknologi |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI |
| Database | PostgreSQL |
| Containerization | Docker & Docker Compose |
| CI/CD | GitHub Actions |
| Deployment | Railway |
| Testing Backend | pytest |
| Testing Frontend | Vitest |

---

## 4. CI/CD Summary

Pada Milestone 2, pipeline CI/CD digunakan untuk membantu proses validasi dan deployment aplikasi.

Pipeline mencakup:

1. Test backend menggunakan pytest.
2. Test frontend menggunakan Vitest.
3. Build Docker image.
4. Deploy aplikasi ke Railway.
5. Validasi production melalui smoke test.

---

## 5. Known Issues

Beberapa kendala yang masih ditemukan atau pernah terjadi selama pengerjaan:

| No | Issue | Dampak |
|---|---|---|
| 1 | Register production belum berjalan normal | Pengujian login dan CRUD belum dapat dilakukan secara penuh |
| 2 | Endpoint `/health` production belum berhasil | Backend production perlu dicek kembali |
| 3 | Conflict pada `test_health.py` | Menghambat proses merge antar branch |
| 4 | Database error saat mencoba seeder | Seeder perlu disesuaikan dengan database environment |
| 5 | Merge conflict sebelumnya belum selesai | Branch tidak bisa otomatis merge |

---

## 6. Production Testing Summary

Hasil production testing menunjukkan bahwa frontend production sudah dapat diakses. Namun, beberapa fitur backend dan fitur utama masih perlu diperiksa kembali.

Status pengujian lengkap dapat dilihat pada dokumen:
[docs/git-workflow.md](docs/git-workflow.md)