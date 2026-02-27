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
[React Frontend] <--HTTP--> [FastAPI Backend] <--SQL--> [PostgreSQL]
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
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

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

## 📅 Roadmap

| Minggu | Target | Status |
|--------|--------|--------|
| 1 | Setup & Hello World | ✅ |
| 2 | REST API + Database | ⬜ |
| 3 | React Frontend | ⬜ |
| 4 | Full-Stack Integration | ⬜ |
| 5-7 | Docker & Compose | ⬜ |
| 8 | UTS Demo | ⬜ |
| 9-11 | CI/CD Pipeline | ⬜ |
| 12-14 | Microservices | ⬜ |
| 15-16 | Final & UAS | ⬜ |




