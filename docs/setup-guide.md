````md
# 🐳 Setup Guide — Full-Stack bye bye virus 

Dokumen ini merupakan panduan lengkap untuk menjalankan project menggunakan **Docker & Docker Compose**, sehingga seluruh aplikasi (backend, frontend, dan database) dapat berjalan otomatis tanpa perlu install manual Node.js, Python, atau PostgreSQL.

---

## 1. Clone Repository

```bash
git clone https://github.com/stranger_things/Bye_virus.git
cd bye_virus
````

---

## 2. Persiapan

**Pastikan sudah menginstall:**

* Docker Desktop

**Cek instalasi:**

```bash
docker --version
docker compose version
```

---

## 3. Konfigurasi Environment

Masuk ke folder backend:

```bash
cd backend
```

Buat file `.env.docker`:

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/bye_virus
SECRET_KEY=isi-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALLOWED_ORIGINS=http://localhost:3000
```

**Generate SECRET_KEY:**

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Catatan:**

* Gunakan `db` sebagai host database (bukan localhost)
* Karena koneksi terjadi antar container dalam Docker network

---

## 4. Kembali ke Root Project

```bash
cd ..
```

---

## 5. Menjalankan Semua Service

```bash
docker compose up -d --build
```

Perintah ini akan:

* Build backend & frontend
* Menjalankan PostgreSQL
* Membuat network & volume
* Menjalankan semua container

---

## 6. Cek Status Container

```bash
docker compose ps
```

---

## 7. Akses Aplikasi

**Frontend:**

```
http://localhost:3000
```

**Backend API:**

```
http://localhost:8000
```

**API Documentation:**

```
http://localhost:8000/docs
```

---

## 8. Alur Menjalankan Aplikasi

1. Jalankan Docker Compose
2. Tunggu semua container berjalan
3. Buka frontend di browser
4. Frontend akan terhubung ke backend
5. Backend terhubung ke database

---

## 9. Struktur Project

```
project/
├── backend/
│   ├── Dockerfile
│   └── .env.docker
├── frontend/
│   └── Dockerfile
├── docker-compose.yml
```

---

## 10. Perintah Penting Docker Compose

```bash
docker compose up -d            # Jalankan semua container
docker compose up -d --build   # Build ulang + jalankan
docker compose down             # Stop semua container
docker compose down -v          # Stop + hapus volume (data DB hilang)
docker compose logs -f          # Lihat log
docker compose ps               # Cek status container
```

---

## 11. Troubleshooting

**Container tidak berjalan:**

```bash
docker compose logs -f
```

**Database tidak terkoneksi:**

* Pastikan `DATABASE_URL` menggunakan:

```
db:5432
```

**Port bentrok:**

* Ubah port di `docker-compose.yml`

**Build error (TLS timeout):**

```bash
docker pull node:20-alpine
```

* Cek koneksi internet atau ganti jaringan

**Container conflict:**

```bash
docker rm -f db backend frontend
```

---

## 12. Catatan Penting

* Jangan commit file `.env.docker`
* Gunakan `.gitignore`
* Gunakan `db` sebagai host database
* Data database disimpan di volume (`pgdata`)

---

## 13. Kesimpulan

Dengan Docker, seluruh aplikasi dapat dijalankan dengan satu perintah tanpa perlu install manual dependency. Docker Compose mempermudah pengelolaan frontend, backend, dan database dalam satu sistem yang terintegrasi.

```
