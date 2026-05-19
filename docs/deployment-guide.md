# 🚀 Deployment Guide

## Railway Setup
1. Login ke Railway menggunakan akun GitHub.
2. Buat project baru di Railway.
3. Tambah PostgreSQL database service.
4. Deploy backend dengan root directory `/backend`.
5. Deploy frontend dengan root directory `/frontend`.

---

## Environment Variables
Environment variables digunakan agar aplikasi dapat berjalan di environment production tanpa menyimpan konfigurasi langsung di dalam kode.

### Backend (Railway)
| Variable | Contoh Value |
|----------|-------------|
| DATABASE_URL | ${{Postgres.DATABASE_URL}} |
| SECRET_KEY | (random hex 64 chars) |
| CORS_ORIGINS | https://frontend-url.railway.app |
| ENVIRONMENT | production |

### Frontend (Railway)
| Variable | Contoh Value |
|----------|-------------|
| VITE_API_URL | https://backend-url.railway.app |

### GitHub Secrets
| Secret | Keterangan |
|--------|-----------|
| RAILWAY_TOKEN | Token dari railway.app/account/tokens |

---

## Troubleshooting

| Masalah | Kemungkinan Penyebab | Solusi |
|--------|----------------------|--------|
| File `test_health.py` sering mengalami conflict | Pada branch `main` masih terdapat test yang sengaja dibuat gagal, seperti `test_intentional_failure`, sedangkan pada branch lain test tersebut sudah diperbaiki atau dihapus | Samakan isi file `test_health.py` dengan versi terbaru di `main`, hapus test yang sengaja gagal jika sudah tidak digunakan, lalu selesaikan conflict sebelum melakukan merge |
| Database error setelah mencoba seeder | Seeder mencoba mengisi data ke database, tetapi struktur tabel, koneksi database, atau data awal tidak sesuai dengan konfigurasi environment | Cek kembali `DATABASE_URL`, pastikan tabel sudah terbentuk, jalankan seeder hanya pada environment yang sesuai, dan hindari menjalankan seeder pada production tanpa validasi |
| Merge conflict terus muncul | Conflict sebelumnya belum benar-benar diselesaikan, atau masih ada file yang belum di-`add` dan belum di-`commit` setelah proses merge | Jalankan `git status`, buka file yang conflict, hapus tanda `<<<<<<<`, `=======`, dan `>>>>>>>`, lalu jalankan `git add .` dan `git commit` untuk menyelesaikan merge |

### Catatan

Beberapa error yang pernah terjadi selama proses deployment dan pengelolaan branch menunjukkan pentingnya menyelesaikan conflict sampai benar-benar bersih sebelum melakukan pull, merge, atau push. Setiap kali terjadi conflict, tim perlu menjalankan `git status` untuk memastikan tidak ada file yang masih berstatus unmerged.