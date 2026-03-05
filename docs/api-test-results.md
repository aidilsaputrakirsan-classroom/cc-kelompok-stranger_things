Cloud App API (Halaman Utama)
Halaman dokumentasi Swagger UI menampilkan daftar endpoint REST API untuk manajemen item dan informasi tim, disertai dengan metode HTTP seperti GET, POST, PUT, dan DELETE.

<img src="../frontend/image/WhatsApp Image 2026-03-05 at 08.03.03.jpeg" />

Proses pembuatan data item baru (contoh : mouse wireless) ke dalam database melalui metode POST, yang menghasilkan respon status 201 created beserta detail ID otomatis.

<img src="../frontend/image/WhatsApp Image 2026-03-05 at 08.05.36.jpeg" />

Menampilkan daftar seluruh item yang tersimpan menggunakan metode GET, lengkap dengan fitur pencarian (search) dan batasan jumlah data (limit) yang ditampilkan dalam format JSON.

<img src="../frontend/image/get i tems.jpeg" />

Proses pengambilan detail informasi satu item secara spesifik berdasarkan parameter item_id. Respon menampilkan atribut lengkap seperti harga, kuantitas, serta waktu pembuatan data.
<img src="../frontend/image/get items id.jpeg" />

Aksi memperbarui data item yang sudah ada menggunakan metode PUT. Gambar menunjukkan perubahan atribut item pada ID tertentu, yang ditandai dengan perubahan pada kolom updated_at
<img src="../frontend/image/update items.jpeg" />

Proses menghapus data item dari sistem berdasarkan item_id. Operasi ini berhasil ditandai dengan kode respon 204 No Content, yang berarti data telah terhapus tanpa ada konten yang dikembalikan.
<img src="../frontend/image/delete items.jpeg" />


Endpoint khusus untuk menampilkan ringkasan statistik inventaris, seperti total jumlah item, total nilai aset, serta informasi barang dengan harga termahal dan termurah.
<img src="../frontend/image/items stats.jpeg" />


Menampilkan informasi anggota tim "Steanger, things" yang bertanggung jawab atas pengembangan proyek, mencakup nama, NIM, dan peran masing-masing anggota (Backend, Frontend, DevOps, QA)
<img src="../frontend/image/tim info.jpeg" />