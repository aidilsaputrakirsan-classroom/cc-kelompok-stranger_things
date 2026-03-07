# ☁️ Cloud App - [Bye bye virus]

Bye bye Virus adalah aplikasi yang dirancang untuk memantau dan mengelola imunisasi serta tumbuh kembang anak. Aplikasi ini menyediakan solusi komperehensif yang bertujuan untuk memastikan bahwa setiap anak menerima perlindungan kesehatan yang memadai dan mencapai potensi perkembangannya secara maksimal. 

Masalah yang sering dihadapi orang tua terutama yang baru memiliki anak dan sedang bekerja, biasanya sering terlewat jadwal imunisasi dikarenakan tidak adanya informasi atau pengingat secara berkala. Aplikasi ini hadir untuk memudahkan para orang tua (ibu rumah tangga maupun yang sedang bekerja) dalam merencanakan dan menjadwalkan imunisasi anak mereka.

## 👥 Tim

| Nama | NIM | Peran |
|------|-----|-------|
| Ahmad Daffa Alfattah  | 10231008 | Lead Backend |
| Nazwa Amelia Zahra  | 10231068 | Lead Frontend |
| Cintya Widhi Astuti  | 10231026 | Lead DevOps |
| Verina Rahma Dinah  | 10231090 | Lead QA & Docs |

## 🛠️ Tech Stack

| Teknologi | Fungsi | Keterangan |
|-----------|--------| ---------- |
| FastAPI   | Backend REST API | Membangun layanan backend berbasis REST API yang menangani logika aplikasi, pengolahan data, dan komunikasi dengan database |
| React     | Frontend SPA | Membangun antarmuka pengguna berbasis Single Page Application yang interaktif, responsif, dan mampu berkomunikasi dengan backend melalui API |
| PostgreSQL | Database | Menyimpan data aplikasi secara terstruktur |
| Docker    | Containerization | Mengemas aplikasi dan seluruh dependensinya ke dalam container sehingga aplikasi bisa berjalan konsisten di lingkungan manapun |
| GitHub Actions | CI/CD | Mengotomatiskan proses pengujian, build, dan deployment aplikasi |
| Railway/Render | Cloud Deployment | Melakukan deployment aplikasi ke cloud agar backend dan frontend dapat berjalan dan diakses secara online |

## 🏗️ Architecture

```
Frontend (React)
        ↓ HTTP Request
Backend (FastAPI - Python)
        ↓ SQL Query
Database (PostgreSQL)
```

*(Diagram ini akan berkembang setiap minggu)*

## 🚀 Getting Started

### Prasyarat
#### 1. Python 3.10+
Python digunakan untuk menjalankan backend yang dibangun menggunakan FastAPI. Versi minimal 3.10+ diperlukan karena kompatibel dengan dependensi modern FastAPI.
Digunakan untuk:
  - Menjalankan server API dengan `uvicorn`
  - Mengelola dependensi menggunakan `pip`
  - Menjalankan logika backend aplikasi

Tanpa Python, backend tidak dapat dijalankan.

#### 2. Node.js 18+
Node.js digunakan untuk menjalankan frontend berbasis React. Versi minimal 18+ direkomendasikan karena mendukung fitur JavaScript modern dan kompatibel dengan Vite.
Digunakan untuk:
  - Menginstall dependencies dengan `npm install`
  - Menjalankan development server dengan `npm run dev`
  - Mengelola package frontend

Tanpa Node.js, frontend tidak dapat dijalankan.

#### 3. Git
Git digunakan sebagai sistem version control dalam pengembangan proyek. Berfungsi untuk:
  - Meng-clone repository
  - Mengelola perubahan kode
  - Mendukung kolaborasi tim
  - Integrasi dengan GitHub dan CI/CD

Walaupun aplikasi tetap bisa dijalankan tanpa Git (jika file sudah tersedia), Git sangat penting dalam proses pengembangan dan deployment.

### Backend     
Backend pada aplikasi Perisai Anak / Bye Bye Virus akan dibangun menggunakan FastAPI, yaitu framework Python modern yang dirancang untuk membangun REST API .

Berikut adalah Rencana logika backend yang digunakan

1. Sistem Autentikasi (JWT + bcrypt + Role-Based Access)

    Bye Bye Virus menggunakan:

- JWT (JSON Web Token)

- Password hashing dengan bcrypt

- Role-based access (parent / health_worker)

2. Data Schema
 
    Untuk mengatasi masalah orang tua yang sering terlewat jadwal imunisasi, berikut adalah rencana skema data yang akan dikelola oleh :

- Users Table: Menyimpan data akun orang tua.

- Children Table: Menyimpan profil anak (nama, tanggal lahir, jenis kelamin).

- Vaccine Schedule Table: Master data jadwal imunisasi berdasarkan umur anak (misal: BCG pada usia 1 bulan).

- Immunization Logs: Catatan status imunisasi anak

3. Backend Logic Flow
   
    Alur kerja backend dirancang untuk memastikan data terjaga integritas:

- Request Handling: FastAPI menerima request dari React Frontend melalui HTTP.

- Validation:  melakukan validasi tipe data sebelum masuk ke logika utama.

- Automation: Backend akan menghitung dynamic schedule (jadwal dinamis) berdasarkan usia anak saat ini menggunakan pustaka

Setelah menentukan rencana logika back end berikut adalah modul serta fitur yang akan dibuat ;


## 1️⃣ Modul Autentikasi

| No | Fitur             | Endpoint           | Method | Keterangan                                                |
| -- | ----------------- | ------------------ | ------ | --------------------------------------------------------- |
| 1  | Registrasi Akun   | `/register`        | POST   | Mendaftarkan akun orang tua                               |
| 2  | Login             | `/login`           | POST   | Autentikasi dan mendapatkan JWT token                     |
| 3  | Get Current User  | `/me`              | GET    | Mengambil data user yang sedang login                     |
| 4  | Role-Based Access | Protected Endpoint | -      | Membatasi akses berdasarkan role (parent / health_worker) |

---

## 2️⃣ Modul Data Anak

| No | Fitur              | Method | Deskripsi                                 |
|----|--------------------|--------|--------------------------------------------|
| 1  | Tambah Data Anak   | POST   | Menambahkan data anak baru                |
| 2  | Lihat Semua Anak   | GET    | Menampilkan daftar anak dalam 1 akun      |
| 3  | Detail Anak        | GET    | Menampilkan detail data anak              |
| 4  | Update Data Anak   | POST    | Memperbarui data anak                     |
| 5  | Hapus Data Anak    | DELETE | Menghapus data anak                       |

---

## 3️⃣ Modul ImuniTrack (Imunisasi)

| No | Fitur                   | Method | Deskripsi                       |
|----|--------------------------|--------|----------------------------------|
| 1  | Tambah Jadwal Imunisasi | POST   | Menambahkan jadwal imunisasi    |
| 2  | Lihat Jadwal            | GET    | Menampilkan jadwal imunisasi    |
| 3  | Detail Jadwal           | GET    | Melihat detail imunisasi        |
| 4  | Update Status           | POST    | Mengubah status menjadi selesai |
| 5  | Hapus Jadwal            | DELETE | Menghapus jadwal imunisasi      |

---

## 4️⃣ Modul Kembang Diary 

| No | Fitur                   | Method | Deskripsi                            |
|----|--------------------------|--------|---------------------------------------|
| 1  | Tambah Data Pertumbuhan | POST   | Menambahkan data berat/tinggi badan  |
| 2  | Lihat Riwayat           | GET    | Menampilkan riwayat pertumbuhan anak |
| 3  | Update Data             | POST    | Memperbarui data pertumbuhan         |
| 4  | Hapus Data              | DELETE | Menghapus data pertumbuhan           |

---

## 5️⃣ Modul Smart Reminder

| No | Fitur                    | Method | Deskripsi                                   |
|----|---------------------------|--------|----------------------------------------------|
| 1  | Notifikasi H-1           | -      | Mengirim pengingat sebelum jadwal imunisasi |
| 2  | Aktivasi Reminder        | POST    | Mengaktifkan atau menonaktifkan notifikasi  |
| 3  | Lihat Riwayat Notifikasi | GET    | Menampilkan riwayat reminder                |

---

## 6️⃣ Modul Faskes Map

| No | Fitur               | Method | Deskripsi                                  |
|----|----------------------|--------|---------------------------------------------|
| 1  | Lihat Daftar Faskes | GET    | Menampilkan daftar fasilitas kesehatan     |
| 2  | Detail Faskes       | GET    | Menampilkan detail lokasi dan jadwal       |
| 3  | Tambah Faskes       | POST   | (Admin/Health Worker) Menambahkan data faskes |



### Frontend

✅ App.jsx 

        import { useState, useEffect } from "react";

        function App() {
        const [data, setData] = useState(null);
        const [team, setTeam] = useState(null);
        const [loading, setLoading] = useState(true);
        const [showApi, setShowApi] = useState(true);

        useEffect(() => {
            fetch("http://localhost:8000/")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });

            fetch("http://localhost:8000/team")
            .then(res => res.json())
            .then(json => setTeam(json))
            .catch(err => console.error("Error:", err));
        }, []);

        return (
            <div className="app-container">
            <header>
                <h1>☁️ Cloud App</h1>
                <h2>Mata Kuliah Komputasi Awan - SI ITK</h2>
            </header>

            {loading ? (
                <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading...</p>
                </div>
            ) : data ? (
                <div className="card">
                <h3 onClick={() => setShowApi(!showApi)} className="clickable">
                    API Response {showApi ? "▲" : "▼"}
                </h3>
                {showApi && (
                    <div className="card-content">
                    <p><strong>Message:</strong> {data.message}</p>
                    <p><strong>Status:</strong> {data.status}</p>
                    <p><strong>Version:</strong> {data.version}</p>
                    </div>
                )}
                </div>
            ) : (
                <p className="error">❌ Error connecting to backend</p>
            )}

            {team && (
                <div className="card">
                <h3>Tim: {team.team}</h3>
                <ul>
                    {team.members.map((m, i) => (
                    <li key={i} className="team-member">
                        <strong>{m.name}</strong> ({m.nim}) - <em>{m.role}</em>
                    </li>
                    ))}
                </ul>
                </div>
            )}

            <footer>
                <p>© 2026 Cloud App - SI ITK</p>
            </footer>
            </div>
        );
        }
        
        export default App;

➤ Penjelasan : kode tersebut merupakan komponen utama react yang mengambil data dari backend menggunakan fetch saat pertama kali dijalankan. Data yang diambil meliputi informasi API dan data tim, lalu ditampilkan secara dinamis menggunakan state dan conditional rendering. Jika data masih dimuat akan muncul loading, jika berhadil akan ditampilkan dalam bentuk card, dan jika gagal akan muncul pesan error.

✅ App.css

        #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        }

        .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
        }
        .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
        }
        .logo.react:hover {
        filter: drop-shadow(0 0 2em #61dafbaa);
        }

        @keyframes logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
        }

        @media (prefers-reduced-motion: no-preference) {
        a:nth-of-type(2) .logo {
            animation: logo-spin infinite 20s linear;
        }
        }

        .card {
        padding: 2em;
        }

        .read-the-docs {
        color: #888;
        }

➤ Penjelasan : bagian #root mengatur lebar maksimum halaman, posisi di tengah, padding, dan teks rata tengah. Class logo mengatur ukuran logo serta efek transisi, dan saat di hover akan muncul efek bayangan cahaya (drop-shadow). Animasi @keyframes logo-spin digunakan untuk membuat logo berputar, yang aktif jika preferensi perangkat tidak membatasi animasi. Class .card mengatur jarak dalam element card, sedangkan .read-the-docs memberi warna teks abu abu.

✅ index.css

        body {
        font-family: Arial, sans-serif;
        background-color: #121212; 
        color: #e0e0e0; 
        margin: 0;
        padding: 0;
        overflow: hidden; 
        }

        .app-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem 2rem; 
        text-align: left;
        min-height: 100vh; 
        display: flex;
        flex-direction: column;
        justify-content: space-between; 
        }

        header h1 {
        font-size: 2.5rem;
        margin: 0; 
        }

        header h2 {
        font-weight: 400;
        color: #cccccc;
        margin: 0.2rem 0 1rem 0; 
        }

        /* Card */
        .card {
        background-color: #1e1e1e;
        padding: 1rem 1.5rem;
        margin: 0.5rem 0;
        border-radius: 12px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
        transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.8);
        }

        .clickable {
        cursor: pointer;
        user-select: none;
        color: #64b5f6;
        }

        .card-content {
        margin-top: 0.5rem;
        }

        .loading-container {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        }

        .spinner {
        border: 6px solid #2c2c2c;
        border-top: 6px solid #64b5f6;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin-bottom: 0.5rem;
        }

        @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        }

        ul {
        list-style: none;
        padding: 0;
        }

        .team-member {
        padding: 0.4rem 0.5rem;
        border-radius: 8px;
        transition: background 0.2s, transform 0.2s;
        }

        .team-member:hover {
        background-color: #2c2c2c;
        transform: scale(1.02);
        }

        .error {
        color: #ef5350;
        font-weight: bold;
        }

        footer {
        font-size: 0.9rem;
        color: #888;
        text-align: left;
        margin-top: 0.2rem;
        }

        strong {
        color: #ffb74d;
        }

        em {
        color: #64b5f6;
        }

➤ Penjelasan : Kode CSS tersebut mengatur tampilan aplikasi dengan tema dark mode, mulai dari warna latar, teks, hingga layout utama menggunakan flexbox. Terdapat styling untuk card dengan efek hover, animasi spinner untuk loading, serta efek interaktif pada daftar anggota tim. Selain itu, warna khusus diberikan pada teks penting, error, dan footer agar tampilan menarik.

✅ main.jsx

        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import './index.css'
        import App from './App.jsx'

        createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
        )

➤ Penjelasan : Kode ini adalah titik masuk react yang merender komponen App.jsx ke elemen HTML dengan id root. CSS global index.css diterapkan disini dan <StrictMode> digunakan untuk membantu mendeteksi potensi masalah pada aplikasi selama pengembangan.

Untuk menjalankan sistem frontend ketik perintah berikut :
```bash
cd frontend
npm install
npm run dev
```

- cd frontend digunakan untuk masuk ke folder frontend
- npm install digunakan untuk menginstall semua depedencies
- npm run dev digunakan untuk menjalankan aplikasi dalam mode development 

setelah berhasil, aplikasi dapat diakses melalui :
http://localhost:5173

Berikut ini merupakan tampilan yang sudah berhasil dijalankan 

<img src="../frontend/image/WhatsApp Image 2026-02-25 at 09.02.06.jpeg" alt="Halaman Login Admin" />

Berikut adalah tambahan bagian **Rencana Pengembangan Frontend** yang bisa langsung kamu masukkan ke laporan MD setelah bagian Backend.

---

# FRONTEND Bye Bye Virus

Frontend aplikasi **Bye Bye Virus**  bertugas sebagai antarmuka pengguna (UI/UX) yang berinteraksi langsung dengan backend melalui REST API.


---



Halaman Front End tiap modul ;

## 1️⃣ Modul Autentikasi

| No | Halaman  | Fungsi                  |
| -- | -------- | ----------------------- |
| 1  | Login    | Form login + simpan JWT |
| 2  | Register | Form pendaftaran akun   |
| 3  | Logout   | Hapus token & redirect  |



---

## 2️⃣ Dashboard

| No | Fitur           | Deskripsi                 |
| -- | --------------- | ------------------------- |
| 1  | Ringkasan Anak  | Menampilkan jumlah anak   |
| 2  | Jadwal Terdekat | Menampilkan imunisasi H-1 |
| 3  | Reminder Aktif  | Status notifikasi         |
| 4  | Artikel Edukasi | Artikel terbaru           |

---

## 3️⃣ Modul Data Anak

| No | Fitur       | Deskripsi               |
| -- | ----------- | ----------------------- |
| 1  | List Anak   | Menampilkan semua anak  |
| 2  | Tambah Anak | Form input data anak    |
| 3  | Edit Anak   | Update data             |
| 4  | Detail Anak | Menampilkan profil anak |

---

## 4️⃣ Modul ImuniTrack

| No | Fitur         | Deskripsi         |
| -- | ------------- | ----------------- |
| 1  | List Jadwal   | Daftar imunisasi  |
| 2  | Tambah Jadwal | Form penjadwalan  |
| 3  | Update Status | Tandai selesai    |
| 4  | Detail Jadwal | Informasi lengkap |

---

## 5️⃣ Modul Kembang Diary

| No | Fitur              | Deskripsi            |
| -- | ------------------ | -------------------- |
| 1  | Input Data         | Berat & tinggi badan |
| 2  | Grafik Pertumbuhan | Visualisasi chart    |
| 3  | Riwayat Data       | Daftar perkembangan  |



## 6️⃣ Modul Faskes Map

| No | Fitur           | Deskripsi                       |
| -- | --------------- | ------------------------------- |
| 1  | Daftar Faskes   | List fasilitas kesehatan        |
| 2  | Detail Faskes   | Jadwal & alamat                 |
| 3  | Peta Interaktif | Integrasi Google Maps / Leaflet |

---



# 🔐 Manajemen State

Frontend :

* React Context API (untuk Auth)
* LocalStorage (menyimpan JWT)
* Protected Route (mencegah akses tanpa login)

---

# 🔄 Alur Integrasi Frontend ke Backend

```
User Action (Form Submit)
        ↓
Axios / Fetch API
        ↓
FastAPI Backend
        ↓
Response JSON
        ↓
Update State React
        ↓
UI Re-render
```

#

## 📅 Roadmap

| Minggu | Target | Status |
|--------|--------|--------|
| 1 | Setup & Hello World | ✅ |
| 2 | REST API + Database | ✅ |
| 3 | React Frontend | ⬜ |
| 4 | Full-Stack Integration | ⬜ |
| 5-7 | Docker & Compose | ⬜ |
| 8 | UTS Demo | ⬜ |
| 9-11 | CI/CD Pipeline | ⬜ |
| 12-14 | Microservices | ⬜ |
| 15-16 | Final & UAS | ⬜ |

#

## 🛠️ Membangun REST API
### 1. Membuat Setup PostgreSQL & Database
Melakukan persiapan basis data PostgreSQL sebagai penyimpanan utama aplikasi. Proses diawali dengan masuk ke PostgreSQL melalui terminal menggunakan perintah `psql -U postgres`, kemudian dibuat database baru bernama cloudapp.

Selanjutnya, dibuat file `.env` pada direktori backend/ untuk menyimpan konfigurasi sensitif berupa `DATABASE_URL` sebagai string koneksi ke database. File ini tidak disertakan dalam commit karena berisi informasi penting seperti username dan password. Sebagai alternatif, disediakan file `.env.example` yang berisi template konfigurasi tanpa data rahasia dan dapat di-commit sebagai acuan bagi seluruh anggota tim. Pada tahap ini juga dipastikan bahwa `.env `telah tercantum dalam `.gitignore` sehingga tidak ikut terunggah ke repository.

Tahap berikutnya adalah instalasi dependensi yang diperlukan untuk mengintegrasikan FastAPI dengan PostgreSQL. Pada tahap ini, file `backend/requirements.txt` diperbarui dengan menambahkan beberapa pustaka utama, yaitu SQLAlchemy sebagai ORM untuk pengelolaan database, psycopg2-binary sebagai driver PostgreSQL, serta python-dotenv untuk memuat variabel konfigurasi dari file `.env.` Setelah pembaruan selesai, seluruh dependensi diinstal menggunakan perintah `pip install -r requirements`.txt agar lingkungan pengembangan siap digunakan.

### 2. Membuat `database.py`
```py
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables dari .env
load_dotenv()

# Ambil DATABASE_URL dari environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL tidak ditemukan di .env!")

# Buat engine (koneksi ke database)
engine = create_engine(DATABASE_URL)

# Buat session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class untuk models
Base = declarative_base()


# Dependency: dapatkan database session
def get_db():
    """
    Dependency injection untuk FastAPI.
    Membuka session saat request masuk, menutup saat selesai.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```
➤ Penjelasan : Kode ini digunakan sebagai modul konfigurasi database pada aplikasi REST API. Modul ini memuat variabel lingkungan dari file `.env` untuk memperoleh `DATABASE_URL` sebagai parameter koneksi, kemudian membangun engine SQLAlchemy sebagai penghubung ke basis data. Selanjutnya, SessionLocal digunakan untuk menghasilkan sesi database yang digunakan dalam proses operasi CRUD. Selain itu, fungsi `get_db()` sebagai mekanisme dependency injection pada FastAPI agar setiap permintaan (request) memperoleh sesi database secara terkontrol dan sesi tersebut ditutup otomatis setelah proses selesai.

### 3. Membuat `models.py`
```py
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from database import Base


class Item(Base):
    """
    Model untuk tabel 'items' di database.
    Setiap atribut = satu kolom di tabel.
    """
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Item(id={self.id}, name='{self.name}', price={self.price})>"
```
➤ Penjelasan : Kode ini digunakan untuk mendefinisikan struktur tabel pada database menggunakan SQLAlchemy ORM. Pada file ini dibuat kelas `Item` yang merepresentasikan tabel `items`, di mana setiap atribut pada kelas menjadi kolom pada tabel, yaitu `id` sebagai primary key dengan nilai otomatis (auto-increment), `name` sebagai nama item yang wajib diisi dengan batas maksimal 100 karakter, `description` sebagai deskripsi opsional, `price` sebagai harga yang wajib diisi, serta `quantity` sebagai jumlah stok dengan nilai default 0. Selain itu, terdapat kolom `created_at` yang terisi otomatis saat data dibuat dan `updated_at` yang diperbarui otomatis saat data mengalami perubahan.

### 4. Membuat `schemas.py`
Schema perlu dipisahkan dari model karena fungsi keduanya berbeda: model (SQLAlchemy) dipakai untuk merepresentasikan struktur tabel dan operasi ke database, sedangkan schema (Pydantic) dipakai untuk mengatur validasi dan format data yang boleh masuk/keluar melalui API.

```py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# === BASE SCHEMA ===
class ItemBase(BaseModel):
    """Base schema — field yang dipakai untuk create & update."""
    name: str = Field(..., min_length=1, max_length=100, examples=["Laptop"])
    description: Optional[str] = Field(None, examples=["Laptop untuk cloud computing"])
    price: float = Field(..., gt=0, examples=[15000000])
    quantity: int = Field(0, ge=0, examples=[10])


# === CREATE SCHEMA (untuk POST request) ===
class ItemCreate(ItemBase):
    """Schema untuk membuat item baru. Mewarisi semua field dari ItemBase."""
    pass


# === UPDATE SCHEMA (untuk PUT request) ===
class ItemUpdate(BaseModel):
    """
    Schema untuk update item. Semua field optional 
    karena user mungkin hanya ingin update sebagian field.
    """
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)


# === RESPONSE SCHEMA (untuk output) ===
class ItemResponse(ItemBase):
    """Schema untuk response. Termasuk id dan timestamp dari database."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # Agar bisa convert dari SQLAlchemy model


# === LIST RESPONSE (dengan metadata) ===
class ItemListResponse(BaseModel):
    """Schema untuk response list items dengan total count."""
    total: int
    items: list[ItemResponse]
```
➤ Penjelasan : Kode ini digunakan untuk membuat schema Pydantic sebagai acuan format data pada REST API. Schema ini membantu memastikan data yang masuk dari client sudah valid dan data yang keluar dari server memiliki struktur yang konsisten. ItemCreate digunakan untuk input saat menambah data, ItemUpdate untuk memperbarui data (field bersifat opsional agar bisa update sebagian), sedangkan ItemResponse untuk format output yang menyertakan id dan timestamp dari database. Selain itu, ItemListResponse dipakai untuk menampilkan daftar item beserta total data.

Field Validation: 
- `Field(..., min_length=1)` : field wajib diisi dengan panjang minimal 1 karakter 
- `Field(..., gt=0)` : field wajib diisi dan harus lebih besar dari 0
- `Field(0, ge=0)` : default adalah 0 dan tidak boleh bernilai negatif 
- `Optional[str] = None` : field bersifat opsional dan akan bernilai None jika tidak diisi

### 5. Membuat `crud.py`
```py
from sqlalchemy.orm import Session
from sqlalchemy import or_
from models import Item
from schemas import ItemCreate, ItemUpdate


def create_item(db: Session, item_data: ItemCreate) -> Item:
    """Buat item baru di database."""
    db_item = Item(**item_data.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items(db: Session, skip: int = 0, limit: int = 20, search: str = None):
    """
    Ambil daftar items dengan pagination & search.
    - skip: jumlah data yang di-skip (untuk pagination)
    - limit: jumlah data per halaman
    - search: cari berdasarkan nama atau deskripsi
    """
    query = db.query(Item)
    
    if search:
        query = query.filter(
            or_(
                Item.name.ilike(f"%{search}%"),
                Item.description.ilike(f"%{search}%")
            )
        )
    
    total = query.count()
    items = query.order_by(Item.created_at.desc()).offset(skip).limit(limit).all()
    
    return {"total": total, "items": items}


def get_item(db: Session, item_id: int) -> Item | None:
    """Ambil satu item berdasarkan ID."""
    return db.query(Item).filter(Item.id == item_id).first()


def update_item(db: Session, item_id: int, item_data: ItemUpdate) -> Item | None:
    """
    Update item berdasarkan ID.
    Hanya update field yang dikirim (bukan None).
    """
    db_item = db.query(Item).filter(Item.id == item_id).first()
    
    if not db_item:
        return None
    
    # Hanya update field yang dikirim (exclude_unset=True)
    update_data = item_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int) -> bool:
    """Hapus item berdasarkan ID. Return True jika berhasil."""
    db_item = db.query(Item).filter(Item.id == item_id).first()
    
    if not db_item:
        return False
    
    db.delete(db_item)
    db.commit()
    return True
```
➤ Penjelasan : Kode ini digunakan untuk menjalankan fungsi-fungsi CRUD (Create, Read, Update, Delete) yang berinteraksi langsung dengan database melalui SQLAlchemy Session. Fungsi `create_item` digunakan untuk menambahkan data item baru, sedangkan `get_items` mengambil daftar item dengan dukungan pagination (skip dan limit) serta fitur pencarian berdasarkan nama atau deskripsi. Fungsi `get_item` digunakan untuk mengambil satu data item berdasarkan `id`. Selanjutnya, `update_item` digunakan untuk memperbarui data item tertentu dan hanya mengubah field yang dikirim oleh client. Terakhir, `delete_item` digunakan untuk menghapus data item berdasarkan `id` dan mengembalikan status keberhasilan operasi.

### 6. Update `main.py`
Tahap selanjutnya adalah mengganti isi dari file `main.py` yang sebelumnya dengan kode berikut
```py
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base
from schemas import ItemCreate, ItemUpdate, ItemResponse, ItemListResponse
import crud

# Buat semua tabel di database (jika belum ada)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Cloud App API",
    description="REST API untuk mata kuliah Komputasi Awan — SI ITK",
    version="0.2.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== HEALTH CHECK ====================

@app.get("/health")
def health_check():
    """Endpoint untuk mengecek apakah API berjalan."""
    return {"status": "healthy", "version": "0.2.0"}


# ==================== CRUD ENDPOINTS ====================

@app.post("/items", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    """
    Buat item baru.
    
    - **name**: Nama item (wajib, 1-100 karakter)
    - **price**: Harga (wajib, > 0)
    - **description**: Deskripsi (opsional)
    - **quantity**: Jumlah stok (default: 0)
    """
    return crud.create_item(db=db, item_data=item)


@app.get("/items", response_model=ItemListResponse)
def list_items(
    skip: int = Query(0, ge=0, description="Jumlah data yang di-skip"),
    limit: int = Query(20, ge=1, le=100, description="Jumlah data per halaman"),
    search: str = Query(None, description="Cari berdasarkan nama/deskripsi"),
    db: Session = Depends(get_db),
):
    """
    Ambil daftar items dengan pagination dan search.
    
    - **skip**: Offset untuk pagination (default: 0)
    - **limit**: Jumlah item per halaman (default: 20, max: 100)
    - **search**: Kata kunci pencarian (opsional)
    """
    return crud.get_items(db=db, skip=skip, limit=limit, search=search)


@app.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    """Ambil satu item berdasarkan ID."""
    item = crud.get_item(db=db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Item dengan id={item_id} tidak ditemukan")
    return item


@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    """
    Update item berdasarkan ID.
    Hanya field yang dikirim yang akan di-update (partial update).
    """
    updated = crud.update_item(db=db, item_id=item_id, item_data=item)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Item dengan id={item_id} tidak ditemukan")
    return updated


@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Hapus item berdasarkan ID."""
    success = crud.delete_item(db=db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Item dengan id={item_id} tidak ditemukan")
    return None

@app.get("/items/stats")
def items_stats(db: Session = Depends(get_db)):
    """Statistik inventory."""
    items = db.query(Item).all()
    if not items:
        return {"total_items": 0, "total_value": 0, "most_expensive": None, "cheapest": None}
    
    return {
        "total_items": len(items),
        "total_value": sum(i.price * i.quantity for i in items),
        "most_expensive": {"name": max(items, key=lambda x: x.price).name, 
                          "price": max(items, key=lambda x: x.price).price},
        "cheapest": {"name": min(items, key=lambda x: x.price).name,
                    "price": min(items, key=lambda x: x.price).price},
    }


# ==================== TEAM INFO ====================

@app.get("/team")
def team_info():
    return {
        "team": "Stranger_things",
        "members": [
            # TODO: Isi dengan data tim Anda
            {"name": "Ahmad Daffa Alfattah", "nim": "10231008", "role": "Lead Backend"},
            {"name": "Nazwa Amelia Zahra", "nim": "10231068", "role": "Lead Frontend"},
            {"name": "Cintya Widhi Astuti", "nim": "10231026", "role": "Lead DevOps"},
            {"name": "Verina Rahmadinah", "nim": "10231090", "role": "Lead QA & Docs"},
        ]
    }
```
➤ Penjelasan : Kode pada file ini digunakan untuk sebagai file utama untuk menjalankan aplikasi FastAPI dan mendefinisikan seluruh endpoint REST API. Pada bagian awal dilakukan inisialisasi koneksi database serta pembuatan tabel jika belum tersedia, kemudian ditambahkan konfigurasi CORS agar API dapat diakses dari aplikasi frontend. Endpoint yang dibuat meliputi health check (`GET /health`) untuk memastikan layanan berjalan, serta endpoint CRUD untuk resource items, yaitu `POST/items` (menambah data), `GET /items` yang digunakan untuk menampilkan daftar data dengan pagination dan pencarian, `GET /items/{item_id}` untuk mengambil satu data berdasarkan ID, `PUT /items/{item_id}` digunakan untuk memperbarui data, dan `DELETE /items/{item_id}` untukmenghapus data. Selain itu, ditambahkan endpoint `GET /team` yang menampilkan informasi anggota tim.

## 🔍 Testing via Swagger UI
Terdapat pada docs di file `api-test-result.md`

## 🔗 API Endpoints

### Endpoint `/health`
```py
@app.get("/health")
def health_check():
    """Endpoint untuk mengecek apakah API berjalan."""
    return {"status": "healthy", "version": "0.2.0"}
```
**Method:** `GET`

**URL:** `/health`

**Deskripsi:** Melakukan health check guna memastikan API berjalan dengan baik dan mengembalikan informasi status layanan serta versi aplikasi.

**Request Body**: GET /health

**Response Example:**

### Endpoint `/items`
```py
@app.post("/items", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    """
    Buat item baru.
    
    - **name**: Nama item (wajib, 1-100 karakter)
    - **price**: Harga (wajib, > 0)
    - **description**: Deskripsi (opsional)
    - **quantity**: Jumlah stok (default: 0)
    """
    return crud.create_item(db=db, item_data=item)
```
**Method:** `POST`

**URL:** `/items`

**Deskripsi:** Menambahkan item baru ke database

**Request Body**:
```sql
{
  "name": "Mouse Wireless",
  "price": 250000,
  "description": "Mouse bluetooth",
  "quantity": 20
}
```

**Response Example:** 201 CREATED
```sql
{
  "name": "Mouse Wireless",
  "description": "Mouse bluetooth",
  "price": 250000,
  "quantity": 20,
  "id": 5,
  "created_at": "2026-03-05T09:05:10.561093+08:00",
  "updated_at": null
}
```

### Endpoint `/items`
```py
@app.get("/items", response_model=ItemListResponse)
def list_items(
    skip: int = Query(0, ge=0, description="Jumlah data yang di-skip"),
    limit: int = Query(20, ge=1, le=100, description="Jumlah data per halaman"),
    search: str = Query(None, description="Cari berdasarkan nama/deskripsi"),
    db: Session = Depends(get_db),
):
    """
    Ambil daftar items dengan pagination dan search.
    
    - **skip**: Offset untuk pagination (default: 0)
    - **limit**: Jumlah item per halaman (default: 20, max: 100)
    - **search**: Kata kunci pencarian (opsional)
    """
    return crud.get_items(db=db, skip=skip, limit=limit, search=search)
```
**Method:** `GET`

**URL:** `/items`

**Deskripsi:** Mengambil daftar item dengan fitur pagination dan search

**Request:**
```sql
http://localhost:8000/items?skip=0&limit=20&search=mouse
```

**Response Example:** 200 OK
```sql
{
  "total": 2,
  "items": [
    {
      "name": "Mouse Wireless",
      "description": "Mouse bluetooth",
      "price": 250000,
      "quantity": 20,
      "id": 5,
      "created_at": "2026-03-05T09:05:10.561093+08:00",
      "updated_at": null
    }
  ]
}
```

### Endpoint `/items/{item_id}`
```py
@app.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    """Ambil satu item berdasarkan ID."""
    item = crud.get_item(db=db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Item dengan id={item_id} tidak ditemukan")
    return item
```

**Method:** `GET`

**URL:** `/items/3`

**Deskripsi:** Mengambil satu item berdasarkan ID

**Request:** 
```sql
http://localhost:8000/items/3
```

**Response Example:** 200 OK
```sql
{
  "name": "Mouse Wireless",
  "description": "Mouse bluetooth",
  "price": 250000,
  "quantity": 20,
  "id": 3,
  "created_at": "2026-03-03T08:33:22.780495+08:00",
  "updated_at": null
}
```

### Endpoint `/items/{item_id}`
```py
@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    """
    Update item berdasarkan ID.
    Hanya field yang dikirim yang akan di-update (partial update).
    """
    updated = crud.update_item(db=db, item_id=item_id, item_data=item)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Item dengan id={item_id} tidak ditemukan")
    return updated
```
**Method:** `PUT`

**URL:** `/items/3`

**Deskripsi:** Memperbarui data item berdasarkan ID. Hanya field yang dikirim yang akan diubah.

**Request Body**
```sql
{
  "name": "string",
  "description": "string",
  "price": 1,
  "quantity": 100
}
```
**Response Example: 200 OK**
```sql
{
  "name": "string",
  "description": "string",
  "price": 1,
  "quantity": 100,
  "id": 3,
  "created_at": "2026-03-03T08:33:22.780495+08:00",
  "updated_at": "2026-03-05T09:07:21.964971+08:00"
}
```

### Endpoint `/items/{item_id}`
```py
@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Hapus item berdasarkan ID."""
    success = crud.delete_item(db=db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Item dengan id={item_id} tidak ditemukan")
    return None
```
**Method:** `DELETE`

**URL:** `/items/2`

**Deskripsi:** Menghapus item berdasarkan ID.

**Request:**
```sql
http://localhost:8000/items/2
```
**Response Example:** 204 No Content
```py
Berhasil menghapus item, tanpa response body
```

### Endpoint `/items/stats`
```py
@app.get("/items/stats")
def items_stats(db: Session = Depends(get_db)):
    """Statistik inventory."""
    items = db.query(Item).all()
    if not items:
        return {"total_items": 0, "total_value": 0, "most_expensive": None, "cheapest": None}
    
    return {
        "total_items": len(items),
        "total_value": sum(i.price * i.quantity for i in items),
        "most_expensive": {"name": max(items, key=lambda x: x.price).name, 
                          "price": max(items, key=lambda x: x.price).price},
        "cheapest": {"name": min(items, key=lambda x: x.price).name,
                    "price": min(items, key=lambda x: x.price).price},
    }
```
**Method:** `GET`

**URL:** `/items/stats`

**Deskripsi:** Statistik Data Persediaan Barang

**Request:**
```sql
http://localhost:8000/items/stats
```
**Response Example: 200 OK**
```sql
{
  "total_items": 3,
  "total_value": 14600100,
  "most_expensive": {
    "name": "Keyboard Mechanical",
    "price": 12000000
  },
  "cheapest": {
    "name": "string",
    "price": 1
  }
}
```

### Endpoint `/team`
```py
@app.get("/team")
def team_info():
    return {
        "team": "Stranger_things",
        "members": [
            # TODO: Isi dengan data tim Anda
            {"name": "Ahmad Daffa Alfattah", "nim": "10231008", "role": "Lead Backend"},
            {"name": "Nazwa Amelia Zahra", "nim": "10231068", "role": "Lead Frontend"},
            {"name": "Cintya Widhi Astuti", "nim": "10231026", "role": "Lead DevOps"},
            {"name": "Verina Rahmadinah", "nim": "10231090", "role": "Lead QA & Docs"},
        ]
    }
```
**Method:** `GET`

**URL:** `/team`

**Deskripsi:** Informasi anggota tim beserta maisng - masing role

**Request Body:**
```sql
http://localhost:8000/team
```
**Response Example: 200 OK**
```py
Response body

{
  "team": "Stranger_things",
  "members": [
    {
      "name": "Ahmad Daffa Alfattah",
      "nim": "10231008",
      "role": "Lead Backend"
    },
    {
      "name": "Nazwa Amelia Zahra",
      "nim": "10231068",
      "role": "Lead Frontend"
    },
    {
      "name": "Cintya Widhi Astuti",
      "nim": "10231026",
      "role": "Lead DevOps"
    },
    {
      "name": "Verina Rahmadinah",
      "nim": "10231090",
      "role": "Lead QA & Docs"
    }
  ]
}
```
 