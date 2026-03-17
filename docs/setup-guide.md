# 🛠️ Setup Guide — Full-Stack Cloud App

Dokumen ini merupakan panduan lengkap untuk menjalankan project dari awal (clone repository) hingga aplikasi dapat berjalan dengan baik (backend & frontend). Panduan ini disusun berdasarkan pengembangan Modul 1–4, namun telah dirapikan agar dapat diikuti oleh pengguna baru.

---

### 1. Clone Repository

```bash
git clone https://github.com/stranger_things/Bye_virus.git
cd Bye_virus
```

---

### 2. Persiapan Awal

**Pastikan sudah menginstall:**

* Node.js
* Python 3.10+
* PostgreSQL
* Git

**Cek versi:**

```bash
node -v
python --version
psql --version
```

---

### 3. Setup Backend

#### 3.1 Masuk ke folder backend

```bash
cd backend
```

#### 3.2 Buat Virtual Environment

```bash
python -m venv venv
```

**Aktifkan:**

* ***Windows:***

```bash
venv\Scripts\activate
```

* ***Mac/Linux:***

```bash
source venv/bin/activate
```

---

#### 3.3 Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Setup Database

**Masuk ke PostgreSQL:**

```bash
psql -U postgres
```

**Buat database:**

```sql
CREATE DATABASE bye_virus;
```

---

### 5. Konfigurasi Environment (.env)

**Buat file `.env` di folder backend:**

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/nama_database
SECRET_KEY=isi-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALLOWED_ORIGINS=http://localhost:5173
```

**Generate SECRET_KEY:**

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

### 6. Menjalankan Backend

```bash
uvicorn main:app --reload
```

**Akses:**

```
http://localhost:8000
http://localhost:8000/docs
```

---

### 7. Setup Frontend

#### 7.1 Masuk ke folder frontend

```bash
cd ../frontend
```

#### 7.2 Install Dependencies

```bash
npm install
```

#### 7.3 Konfigurasi .env

**Buat file `.env`:**

```
VITE_API_URL=http://localhost:8000
```

---

### 8. Menjalankan Frontend

```bash
npm run dev
```

**Akses**:

```
http://localhost:5173
```

---

### 9. Alur Menjalankan Aplikasi

1. Jalankan backend
2. Jalankan frontend
3. Buka browser ke [http://localhost:5173](http://localhost:5173)

---

### 10. Fitur Aplikasi

* Registrasi user
* Login (JWT Authentication)
* CRUD data
* Proteksi endpoint

---

### 11. Struktur Project

```
project/
├── backend/
├── frontend/
└── docs/
```

---

### 12. Troubleshooting

**CORS Error**

* Pastikan ALLOWED_ORIGINS sesuai

**Database tidak terkoneksi**

* Cek PostgreSQL aktif
* Cek DATABASE_URL

**401 Unauthorized**

* Pastikan token dikirim di header

---

### 13. Catatan

* Jangan commit file `.env`
* Gunakan `.env.example`
* Pastikan semua dependency terinstall

---

### Kesimpulan

Dengan mengikuti langkah-langkah di atas, pengguna dapat menjalankan aplikasi dari nol hingga berjalan sempurna tanpa perlu memahami proses pengembangan sebelumnya.
