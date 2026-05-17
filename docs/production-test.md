# 🚀 Production Test

Dokumen ini berisi hasil dan panduan pengujian production setelah aplikasi berhasil dideploy ke Railway.

Production testing dilakukan untuk memastikan aplikasi yang sudah berjalan di cloud dapat digunakan dengan baik, baik dari sisi frontend, backend, maupun koneksi ke database.

---

## 1. Smoke Test Checklist

Smoke test adalah pengujian cepat untuk memastikan fitur utama aplikasi berjalan setelah proses deploy.

| No | Pengujian | Langkah Pengujian | Hasil yang Diharapkan | Status | 
|---|---|---|---|---|
| 1 | Buka Frontend Production | Akses URL frontend production melalui browser | Halaman frontend berhasil tampil tanpa error | ✅ | 
| 2 | Register User Baru | Buat akun baru melalui halaman register | Akun berhasil dibuat | ❌ | 
| 3 | Login User | Login menggunakan akun yang sudah dibuat | User berhasil masuk ke aplikasi | ❌ |  
| 4 | Create Item | Tambahkan item/data baru | Item berhasil dibuat dan tersimpan | ❌ | 
| 5 | Read Item | Lihat daftar item/data | Item yang dibuat muncul di daftar | ❌ | 
| 6 | Update Item | Edit item/data yang sudah dibuat | Perubahan berhasil tersimpan | ❌ | 
| 7 | Delete Item | Hapus item/data yang sudah dibuat | Item berhasil dihapus dari daftar | ❌ | 
| 8 | Health Check Backend | Akses endpoint `/health` pada backend production | Backend mengembalikan status `healthy` | ❌ | 

---

## 2. Hasil Perbandingan Development dan Production

Tabel ini digunakan untuk membandingkan apakah fitur yang berjalan di development juga berjalan dengan baik di production.

| Test | Development / Localhost | Production / Railway | Status | 
|---|---|---|---|
| Backend `/health` | ✅ | ❌ | ⏳ Pending |
| Register user | ✅ |  ❌ | ❌ Failed  |
| Login | ✅ | ❌ | ❌ Failed |
| Create item | ✅ | ❌ | ⏳ Pending |  
| Read items | ✅ | ❌ |  ⏳ Pending |
| Update item | ✅ | ❌ | ⏳ Pending|
| Delete item | ✅ | ❌ |⏳ Pending |
| Search | ✅ | ❌ | ⏳ Pending |

### Keterangan

Fitur sudah dites dan berhasil = ✅ Pass

Fitur sudah dites dan gagal	= ❌ Failed

Fitur belum bisa dites karena fitur sebelumnya gagal =	⏳ Pending 

---

## Kesimpulan

Berdasarkan hasil production testing, aplikasi sudah berhasil menampilkan halaman frontend production, sehingga deployment frontend dapat dikatakan berjalan. Namun, beberapa fungsi utama pada environment production belum berjalan dengan baik, terutama pada fitur register, login, CRUD item, search, dan health check backend.

Pada environment development atau localhost, seluruh fitur utama berjalan dengan baik. Akan tetapi, pada environment production masih ditemukan kegagalan, sehingga beberapa fitur belum dapat diuji secara penuh dan diberi status pending. Hal ini menunjukkan bahwa masih terdapat perbedaan kondisi antara development dan production, kemungkinan berkaitan dengan konfigurasi backend, koneksi database, environment variable, CORS, atau URL API production.
