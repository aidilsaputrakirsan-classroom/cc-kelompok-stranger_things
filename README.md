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
| 3 | React Frontend | ✅ |
| 4 | Full-Stack Integration | ✅ |
| 5-7 | Docker & Compose | ⬜ |
| 8 | UTS Demo | ⬜ |
| 9-11 | CI/CD Pipeline | ⬜ |
| 12-14 | Microservices | ⬜ |
| 15-16 | Final & UAS | ⬜ |

#

## 📁 Struktur File
```
cloud-team-stranger_things/
├── backend/
│   ├── main.py              ← Updated (auth endpoints, CORS fix)
│   ├── auth.py              ← BARU (JWT utilities)
│   ├── database.py
│   ├── models.py            ← Updated (+ User model)
│   ├── schemas.py           ← Updated (+ auth schemas)
│   ├── crud.py              ← Updated (+ user CRUD)
│   ├── requirements.txt     ← Updated (+ jose, passlib, bcrypt)
│   ├── .env                 ← Updated (+ JWT & CORS config)
│   └── .env.example         ← Updated
├── frontend/
│   ├── src/
│   │   ├── App.jsx              ← Updated (auth integration)
│   │   ├── components/
│   │   │   ├── Header.jsx       ← Updated (+ user info, logout)
│   │   │   ├── LoginPage.jsx    ← BARU
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ItemForm.jsx
│   │   │   ├── ItemList.jsx
│   │   │   └── ItemCard.jsx
│   │   └── services/
│   │       └── api.js           ← Updated (+ auth, token mgmt)
│   ├── .env
│   └── .env.example
├── .gitignore
└── README.md
```

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

**Request Body**: 
```sql
http://localhost:8000/health
```

**Response Example:**
```py
{
  "status": "healthy",
  "version": "0.2.0"
}
```

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
      "name": "Verina Rahma Dinah",
      "nim": "10231090",
      "role": "Lead QA & Docs"
    }
  ]
}
```
### Hasil Pengujian API
| No | Method | URL | Request Body | Response Body | HTTP Status Code | Hasil Pengujian |
|----|--------|-----|---------|--------|----------|-----------|
| 1 | GET | `/health` | `-` | `{"status":"healthy","version":"0.2.0"}` | `200 OK` | ✅ |
| 2 | POST | `/items` | `{"name":"Mouse Wireless","price":250000,"description":"Mouse bluetooth","quantity":20}` | `{"name":"Mouse Wireless","description":"Mouse bluetooth","price":250000,"quantity":20,"id":5,"created_at":"2026-03-05T09:05:10.561093+08:00","updated_at":null}` | `201 Created` | ✅ |
| 3 | GET | `/items` | `-` | `{"total":2,"items":[{"name":"Mouse Wireless","description":"Mouse bluetooth","price":250000,"quantity":20,"id":5,"created_at":"2026-03-05T09:05:10.561093+08:00","updated_at":null}]}` | `200 OK` | ✅ |
| 4 | GET | `/items/{item_id}` | `-` | `{"name":"Mouse Wireless","description":"Mouse bluetooth","price":250000,"quantity":20,"id":3,"created_at":"2026-03-03T08:33:22.780495+08:00","updated_at":null}` | `200 OK` | ✅ |
| 5 | PUT | `/items/{item_id}` | `{"name":"string","description":"string","price":1,"quantity":100}` | `{"name":"string","description":"string","price":1,"quantity":100,"id":3,"created_at":"2026-03-03T08:33:22.780495+08:00","updated_at":"2026-03-05T09:07:21.964971+08:00"}` | `200 OK` | ✅ |
| 6 | DELETE | `/items/{item_id}` | `-` | `Berhasil menghapus item, tanpa response body` | `204 No Content` | ✅ |
| 7 | GET | `/items/stats` | `-` | `{"total_items":3,"total_value":14600100,"most_expensive":{"name":"Keyboard Mechanical","price":12000000},"cheapest":{"name":"string","price":1}}` | `200 OK` | ✅ |
| 8 | GET | `/team` | `-` | `{"team":"Stranger_things","members":[{"name":"Ahmad Daffa Alfattah","nim":"10231008","role":"Lead Backend"},{"name":"Nazwa Amelia Zahra","nim":"10231068","role":"Lead Frontend"},{"name":"Cintya Widhi Astuti","nim":"10231026","role":"Lead DevOps"},{"name":"Verina Rahma Dinah","nim":"10231090","role":"Lead QA & Docs"}]}` | `200 OK` | ✅ |

## 🎨 FRONTEND REACT — UI & API INTEGRATION

Langkah yang dilakukan yaitu: 

### 1. Membuat Struktur Folder Bagian Frontend 
Pada langkah ini dilakukan pembuatan struktur folder pada bagian frontend untuk merapikan pengelompokan kode. Setelah masuk ke direktori frontend/src, dibuat dua folder utama yaitu components dan services. Folder components digunakan untuk menyimpan komponen antarmuka (UI) yang dapat digunakan kembali, sedangkan folder services digunakan untuk menampung logika layanan seperti pemanggilan API. Struktur ini membantu pengembangan menjadi lebih terorganisir dan memudahkan pemeliharaan kode. 

### 2. Membuat API Service 
Pada langkah ini dibuat modul API Service pada file frontend/src/services/api.js sebagai penghubung antara aplikasi frontend dan REST API yang berjalan pada backend. File ini berisi kumpulan fungsi untuk melakukan komunikasi HTTP menggunakan fetch, mencakup operasi GET (mengambil daftar item dengan parameter pencarian dan pagination, serta mengambil detail item berdasarkan ID), POST (menambahkan item baru), PUT (memperbarui data item), dan DELETE (menghapus item). 

### 3. Membuat Komponen Header & SearchBar 
Pada tahap ini dikembangkan dua komponen antarmuka pada frontend, yaitu Header dan SearchBar, untuk mendukung tampilan aplikasi serta interaksi pencarian data. Komponen Header berfungsi menampilkan identitas aplikasi (judul dan subtitle), jumlah total item (totalItems), serta indikator status koneksi API (isConnected) yang ditampilkan secara visual melalui label “API Connected/Disconnected”. Sementara itu, komponen SearchBar digunakan untuk melakukan pencarian item berdasarkan nama atau deskripsi, dengan memanfaatkan state lokal query untuk menampung input pengguna. 

### 4. Membuat Komponen ItemForm 
Komponen ItemForm digunakan sebagai form untuk menambah dan mengedit item. Data input disimpan pada state formData, sedangkan pesan kesalahan ditangani melalui state error. Saat editingItem aktif, form otomatis terisi data item yang dipilih, dan akan kembali kosong ketika mode edit dibatalkan. Sebelum dikirim, form melakukan validasi sederhana (nama wajib diisi dan harga > 0), lalu data diproses dan dikirim melalui onSubmit. Setelah berhasil, form direset dan tombol Batal Edit muncul khusus pada mode edit. 

### 5. Membuat Komponen ItemCard dan ItemList 
Pada tahap ini dibuat komponen ItemCard dan ItemList untuk menampilkan data item pada antarmuka aplikasi. ItemCard berfungsi menampilkan satu item dalam bentuk kartu, mencakup nama item, harga (diformat ke Rupiah), deskripsi (jika ada), jumlah stok, serta waktu pembuatan, dan menyediakan tombol aksi Edit dan Hapus yang memanggil fungsi callback dari parent. Sementara itu, ItemList berperan sebagai container yang menampilkan kumpulan ItemCard dalam layout grid, serta menangani kondisi loading (menampilkan pesan memuat data) dan kondisi data kosong (menampilkan informasi bahwa belum ada item). 

### 6. Pembaruan Root Component — App.jsx 
Pada tahap ini dilakukan pembaruan root component App.jsx sebagai pusat pengelolaan alur aplikasi frontend. App bertanggung jawab mengatur state utama seperti daftar item, total item, status loading, status koneksi API, mode edit, dan kata kunci pencarian. Saat aplikasi pertama kali dijalankan, useEffect digunakan untuk melakukan pengecekan koneksi melalui endpoint /health serta memuat data item dari backend. Aksi tambah, ubah, hapus, dan pencarian ditangani melalui fungsi handler yang memanggil API service, kemudian me-reload data agar tampilan selalu sesuai dengan kondisi terbaru. Komponen Header, ItemForm, SearchBar, dan ItemList disusun di dalam App untuk membentuk tampilan halaman utama. 

### 🔍 Hasil Pengujian UI
| No | Test Case | Langkah Pengujian | Hasil yang Diharapkan | Hasil Pengujian | Status |
|----|-----------|-------------------|-----------------------|-----------------|--------|
| 1 | Cek Status API | Menjalankan aplikasi lalu memeriksa indikator koneksi API pada tampilan frontend. | Status API menunjukkan bahwa frontend berhasil terhubung dengan backend. | Frontend berhasil terhubung dengan backend. Hal ini ditandai dengan munculnya status **API Connected** pada tampilan aplikasi. | ✅ Berhasil |
| 2 | Items dari Modul 2 Muncul di Daftar | Membuka halaman utama aplikasi dan memeriksa daftar item yang sudah dibuat pada modul sebelumnya. | Item dari modul sebelumnya tampil pada daftar item. | Item yang telah dibuat pada modul sebelumnya berhasil ditampilkan pada daftar item. | ✅ Berhasil |
| 3 | Menambah Item Baru melalui Form | Mengisi form penambahan item dengan data yang valid lalu menekan tombol **Tambah Item**. | Form dapat menerima input dan mengirim data item baru ke sistem. | Form penambahan item dapat digunakan dengan baik untuk memasukkan data baru. | ✅ Berhasil |
| 4 | Item Baru Muncul di Daftar | Setelah menambahkan item, memeriksa apakah item baru langsung tampil pada daftar item. | Item baru muncul pada daftar tanpa perlu memuat ulang halaman secara manual. | Item yang baru ditambahkan langsung muncul pada daftar item. Hal ini membuktikan bahwa data berhasil disimpan ke database dan frontend mampu memperbarui tampilan secara otomatis. | ✅ Berhasil |
| 5 | Klik Edit pada Item | Menekan tombol **Edit** pada salah satu item di daftar. | Sistem memilih item yang akan diedit dan menampilkan datanya pada form. | Tombol **Edit** berfungsi dengan baik. Saat tombol diklik, sistem berhasil memilih item yang diinginkan untuk diedit dan menyiapkan data item tersebut ke dalam form. | ✅ Berhasil |
| 6 | Form Terisi Data Lama, Mengubah Harga Item, dan Klik Update | Menekan tombol **Edit**, memastikan form terisi data lama, mengubah harga item, lalu menekan tombol **Update Item**. | Form menampilkan data lama, perubahan harga dapat disimpan, dan daftar item menampilkan data terbaru. | Form edit berhasil menampilkan data lama dari item yang dipilih. Pengguna dapat mengubah harga item dan menyimpan perubahan dengan menekan tombol **Update Item**. Perubahan harga kemudian tampil sesuai data terbaru pada daftar item. | ✅ Berhasil |
| 7 | Mencari Item melalui SearchBar | Memasukkan kata kunci tertentu pada **SearchBar** untuk mencari item. | Sistem menampilkan item yang sesuai dengan kata kunci pencarian. | Fitur pencarian bekerja sesuai fungsinya. Item dapat ditemukan berdasarkan kata kunci yang dimasukkan. | ✅ Berhasil |
| 8 | Menghapus Item dan Terdapat Confirm Dialog | Menekan tombol **Hapus** pada salah satu item di daftar. | Sistem menampilkan dialog konfirmasi sebelum item benar-benar dihapus. | Saat tombol **Hapus** ditekan, sistem menampilkan dialog konfirmasi terlebih dahulu. Hal ini menunjukkan bahwa mekanisme pengamanan sebelum penghapusan data berjalan dengan baik. | ✅ Berhasil |
| 9 | Item Hilang dari Daftar | Mengonfirmasi proses hapus lalu memeriksa kembali daftar item. | Item yang dihapus tidak lagi tampil pada daftar item. | Setelah penghapusan dikonfirmasi, item yang dipilih berhasil terhapus dan tidak lagi muncul pada daftar. Ini menandakan bahwa proses delete berjalan dengan benar. | ✅ Berhasil |
| 10 | Menghapus Semua Item dan Muncul Empty State | Menghapus seluruh item yang tersedia lalu memeriksa tampilan aplikasi. | Aplikasi menampilkan kondisi **empty state** ketika tidak ada data item yang tersedia. | Setelah seluruh item dihapus, aplikasi menampilkan kondisi **empty state**. Hal ini membuktikan bahwa sistem mampu menyesuaikan tampilan ketika tidak ada data yang tersedia. | ✅ Berhasil |

##  🔐 Authentication
Pada pengembangan modul ini, sistem telah dilengkapi dengan mekanisme autentikasi menggunakan **JSON Web Token (JWT)**. Penerapan autentikasi bertujuan untuk memastikan bahwa hanya pengguna yang telah terdaftar dan berhasil login yang dapat mengakses fitur-fitur tertentu pada aplikasi, khususnya endpoint yang bersifat **protected** seperti `/auth/me` dan seluruh endpoint `/items`.

### Alur Authentication
1. User melakukan registrasi melalui halaman register pada frontend
2. Frontend mengirim data ke endpoint `POST /auth/register`
3. Backend menyimpan user baru dengan password yang sudah di-hash
4. User login melalui halaman login pada frontend
5. Frontend mengirim email dan password ke endpoint `POST /auth/login`
6. Backend memverifikasi data login dan mengembalikan JWT token
7. Frontend menyimpan token dan menggunakannya untuk request berikutnya
8. Backend memvalidasi token setiap kali user mengakses endpoint protected
   
### API Endpoint List
| No | Method | Endpoint | Access | Deskripsi |
|----|--------|----------|--------|-----------|
| 1 | GET | `/health` | Public | Melakukan health check untuk memastikan backend berjalan dengan baik dan menampilkan status layanan serta versi aplikasi |
| 2 | POST | `/auth/register` | Public | Mendaftarkan user baru ke dalam sistem menggunakan email, nama, dan password |
| 3 | POST | `/auth/login` | Public | Melakukan login user dan menghasilkan JWT access token |
| 4 | GET | `/auth/me` | Protected | Mengambil data user yang sedang login berdasarkan token yang dikirim |
| 5 | POST | `/items` | Protected | Menambahkan item baru ke database |
| 6 | GET | `/items` | Protected | Mengambil daftar item dengan dukungan pagination dan pencarian |
| 7 | GET | `/items/{item_id}` | Protected | Mengambil detail satu item berdasarkan ID |
| 8 | PUT | `/items/{item_id}` | Protected | Memperbarui data item berdasarkan ID |
| 9 | DELETE | `/items/{item_id}` | Protected | Menghapus item berdasarkan ID |
| 10 | GET | `/team` | Public | Menampilkan informasi anggota tim pengembang aplikasi |

### Hasil Pengujian Authentication & CRUD
| No | Test Case | Langkah Pengujian | Hasil yang Diharapkan | Hasil Pengujian | Status |
|----|-----------|-------------------|-----------------------|-----------------|--------|
| 1 | Halaman login ditampilkan | Menjalankan frontend lalu membuka aplikasi pada browser | Halaman login tampil sebagai halaman awal aplikasi | Halaman login berhasil ditampilkan saat aplikasi pertama kali dibuka | ✅ Berhasil |
| 2 | Registrasi user baru | Memilih tab **Register**, mengisi nama, email, dan password yang valid, lalu menekan tombol **Register** | User baru berhasil terdaftar di dalam sistem | Registrasi user baru berhasil dilakukan | ✅ Berhasil |
| 3 | Login otomatis setelah registrasi | Setelah proses registrasi berhasil, sistem melanjutkan login secara otomatis | User langsung masuk ke aplikasi tanpa perlu login manual kembali | Setelah registrasi selesai, user otomatis masuk ke dalam aplikasi | ✅ Berhasil |
| 4 | Halaman utama dan daftar item ditampilkan | Setelah login berhasil, memeriksa tampilan halaman utama aplikasi | Halaman utama aplikasi dan daftar item berhasil dimuat | Halaman utama aplikasi tampil dengan baik dan data item berhasil dimuat | ✅ Berhasil |
| 5 | Nama user tampil pada header | Memeriksa bagian header setelah user berhasil login | Nama user tampil pada header aplikasi | Nama user berhasil ditampilkan pada header | ✅ Berhasil |
| 6 | Menambahkan item baru | Mengisi form item dengan data yang valid lalu menekan tombol **Tambah Item** | Item baru berhasil ditambahkan ke dalam sistem | Item baru berhasil ditambahkan melalui form input | ✅ Berhasil |
| 7 | Item baru muncul pada daftar | Setelah item ditambahkan, memeriksa daftar item pada halaman utama | Item baru langsung muncul pada daftar item | Item yang baru ditambahkan berhasil tampil pada daftar | ✅ Berhasil |
| 8 | Mengubah data item | Menekan tombol **Edit** pada salah satu item, mengubah data, lalu menekan tombol **Update Item** | Data item berhasil diperbarui dan perubahan tampil pada daftar | Fitur edit berjalan dengan baik dan perubahan data berhasil disimpan | ✅ Berhasil |
| 9 | Mencari item | Memasukkan kata kunci tertentu pada kolom pencarian | Sistem menampilkan item yang sesuai dengan kata kunci pencarian | Fitur pencarian berjalan sesuai fungsi dan item dapat ditemukan dengan baik | ✅ Berhasil |
| 10 | Mengurutkan produk berdasarkan harga termurah | Memilih opsi urutkan **harga termurah** pada fitur sorting | Daftar produk ditampilkan mulai dari harga paling rendah ke paling tinggi | Produk berhasil diurutkan berdasarkan harga termurah | ✅ Berhasil |
| 11 | Mengurutkan produk berdasarkan harga termahal | Memilih opsi urutkan **harga termahal** pada fitur sorting | Daftar produk ditampilkan mulai dari harga paling tinggi ke paling rendah | Produk berhasil diurutkan berdasarkan harga termahal | ✅ Berhasil |
| 12 | Mengurutkan produk berdasarkan data terlama | Memilih opsi urutkan **terlama** pada fitur sorting | Daftar produk ditampilkan berdasarkan waktu input paling lama ke paling baru | Produk berhasil diurutkan berdasarkan data terlama | ✅ Berhasil |
| 13 | Mengurutkan produk berdasarkan data terbaru | Memilih opsi urutkan **terbaru** pada fitur sorting | Daftar produk ditampilkan berdasarkan waktu input paling baru ke paling lama | Produk berhasil diurutkan berdasarkan data terbaru | ✅ Berhasil |
| 14 | Mengurutkan produk berdasarkan nama A–Z | Memilih opsi urutkan **A–Z** pada fitur sorting | Daftar produk ditampilkan berdasarkan urutan alfabet dari A ke Z | Produk berhasil diurutkan berdasarkan nama A–Z | ✅ Berhasil |
| 15 | Mengurutkan produk berdasarkan nama Z–A | Memilih opsi urutkan **Z–A** pada fitur sorting | Daftar produk ditampilkan berdasarkan urutan alfabet dari Z ke A | Produk berhasil diurutkan berdasarkan nama Z–A | ✅ Berhasil |
| 16 | Menghapus item | Menekan tombol **Hapus** pada salah satu item dan menyetujui dialog konfirmasi | Item berhasil dihapus dari sistem dan tidak lagi muncul pada daftar | Item berhasil dihapus dan tidak lagi tampil pada daftar | ✅ Berhasil |
| 17 | Logout dari aplikasi | Menekan tombol **Logout** pada header aplikasi | User keluar dari sesi login | Logout berhasil dilakukan | ✅ Berhasil |
| 18 | Kembali ke halaman login setelah logout | Setelah logout, memeriksa halaman yang ditampilkan sistem | Sistem menampilkan kembali halaman login | Setelah logout, aplikasi kembali ke halaman login | ✅ Berhasil |
| 19 | Login kembali dengan akun yang sama | Mengisi email dan password user yang telah didaftarkan sebelumnya lalu menekan tombol **Login** | User berhasil login kembali menggunakan akun yang sama | Login ulang dengan akun yang sudah dibuat berhasil dilakukan | ✅ Berhasil |
| 20 | Data item tetap tersedia setelah login ulang | Setelah login kembali, memeriksa apakah data item yang sebelumnya tersimpan masih tersedia | Data item yang telah tersimpan sebelumnya tetap tersedia | Data item tetap tersedia setelah user login kembali | ✅ Berhasil |
| 21 | Menampilkan empty state setelah semua item dihapus | Menghapus seluruh item yang tersedia lalu memeriksa tampilan aplikasi | Aplikasi menampilkan kondisi **empty state** saat tidak ada data item | Tampilan **empty state** berhasil muncul ketika seluruh item telah dihapus | ✅ Berhasil |


