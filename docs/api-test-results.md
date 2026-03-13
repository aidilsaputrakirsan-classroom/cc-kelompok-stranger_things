- Cloud App API (Halaman Utama)
Halaman dokumentasi Swagger UI menampilkan daftar endpoint REST API untuk manajemen item dan informasi tim, disertai dengan metode HTTP seperti GET, POST, PUT, dan DELETE.

<img src="../frontend/image/WhatsApp Image 2026-03-05 at 08.03.03.jpeg" />


- Proses pembuatan data item baru (contoh : mouse wireless) ke dalam database melalui metode POST, yang menghasilkan respon status 201 created beserta detail ID otomatis.

<img src="../frontend/image/WhatsApp Image 2026-03-05 at 08.05.36.jpeg" />


- Menampilkan daftar seluruh item yang tersimpan menggunakan metode GET, lengkap dengan fitur pencarian (search) dan batasan jumlah data (limit) yang ditampilkan dalam format JSON.

<img src="../frontend/image/get i tems.jpeg" />


- Proses pengambilan detail informasi satu item secara spesifik berdasarkan parameter item_id. Respon menampilkan atribut lengkap seperti harga, kuantitas, serta waktu pembuatan data.

<img src="../frontend/image/get items id.jpeg" />


- Aksi memperbarui data item yang sudah ada menggunakan metode PUT. Gambar menunjukkan perubahan atribut item pada ID tertentu, yang ditandai dengan perubahan pada kolom updated_at.

<img src="../frontend/image/update items.jpeg" />


- Proses menghapus data item dari sistem berdasarkan item_id. Operasi ini berhasil ditandai dengan kode respon 204 No Content, yang berarti data telah terhapus tanpa ada konten yang dikembalikan.

<img src="../frontend/image/delete items.jpeg" />


- Endpoint khusus untuk menampilkan ringkasan statistik inventaris, seperti total jumlah item, total nilai aset, serta informasi barang dengan harga termahal dan termurah.

<img src="../frontend/image/items stats.jpeg" />


- Menampilkan informasi anggota tim "Steanger, things" yang bertanggung jawab atas pengembangan proyek, mencakup nama, NIM, dan peran masing-masing anggota (Backend, Frontend, DevOps, QA)

<img src="../frontend/image/tim info.jpeg" />

# API Test Results — Modul 3

## Test Status: ✅ PASSED

### 1. Health Check
- Endpoint: `GET /health`
- Status: ✅ PASSED
- Response: `{"status": "healthy", "version": "0.2.0"}`

### 2. Pagination Test
- Endpoint: `GET /items?skip=0&limit=2`
- Status: ✅ PASSED
- Result:
  - Total items in DB: 3
  - Items returned: 2
  - Data: Mouse Wireless, Keyboard Mechanical

### 3. Items Stats Endpoint
- Endpoint: `GET /items/stats`
- Status: ✅ PASSED (test this now)
- Result:
   {"total_items":3,"total_value":14600100.0,"most_expensive":{"name":"Keyboard Mechanical","price":1200000.0},"cheapest":{"name":"string","price":1.0}}

