Dokumentasi ini membahas proses standardisasi konfigurasi lingkungan (environment variables) pada bagian frontend aplikasi LenteraPustaka.

## ✅ Pekerjaan yang Telah Dilakukan

### Pembuatan File .env
**a. File frontend/.env berisi konfigurasi:**
`VITE_API_URL=http://localhost:8000`

**b. File `frontend/.env.example` juga disiapkan sebagai template dengan isi yang sama:**
`VITE_API_URL=http://localhost:8000`

Pembaruan File api.js
Pada file `frontend/src/services/api.js`, dilakukan penyesuaian untuk mengambil nilai API URL dari environment variable dengan fallback ke default:

`const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"`

Pembaruan File .gitignore
File .gitignore diperbarui untuk menghindari file konfigurasi sensitif ikut terunggah ke repository, dengan menambahkan:

# --- Environment Variables ---
```.env
frontend/.env
backend/.env
*.local
```

Sumber:
```frontend/src/services/api.js, frontend/.env.example, frontend/.gitignore```