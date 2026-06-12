# Reflection Paper - Verina Rahma Dinah (10231090)

Sebagai Lead QA & Documentation, tanggung jawab saya mencakup pengujian antar service (end-to-end), memastikan integritas data, serta menyusun dokumentasi teknis seperti API contract, deployment guide, dan dokumentasi testing. Fokus utama adalah memastikan seluruh sistem dapat berjalan sesuai desain dan semua layanan berkomunikasi dengan baik melalui API.

## Beberapa keputusan teknis yang saya ambil antara lain:

- Membuat skenario pengujian end-to-end yang tidak hanya memeriksa endpoint satu per satu, tapi juga memastikan integrasi antar service berjalan lancar. Ini penting karena kegagalan pada satu service bisa mempengaruhi service lain.
- Melakukan pengujian setiap kali ada perubahan, baik di frontend, backend, maupun konfigurasi deployment untuk memastikan semua bagian sistem tetap saling terhubung dan berjalan sesuai harapan. Dengan cara ini, masalah bisa ditemukan lebih cepat dan integrasi antar service tetap terjaga.
- Memanfaatkan logging, health check, dan observability tools untuk mendeteksi masalah lebih cepat dan memahami perilaku sistem di berbagai environment, baik lokal maupun container.

## Beberapa kesulitan yang saya hadapi:

- **Token JWT kadang expired** saat pengujian, membuat endpoint protected tidak bisa diakses sampai token diperbarui.
- **Pipeline CI/CD sensitif** terhadap konflik file `.yml` ketika anggota tim lain mengubah jalur test atau deployment.
- **Merge conflict** pada pull request yang belum di-merge menunda integrasi testing.
- **Resource Docker terbatas**, beberapa kali build gagal karena space disk penuh atau volume lama belum dibersihkan.
- **Testing antar service** kadang gagal karena service target belum siap atau sedang down, meski retry dan graceful degradation membantu memitigasi masalah.
- **Dokumentasi tidak selalu sinkron** dengan endpoint terbaru, sehingga skrip QA lama kadang tidak sesuai.

## Pelajaran yang saya ambil:

1. **Koordinasi Tim** sangat penting. QA harus tahu kapan developer menyelesaikan PR untuk bisa melakukan end-to-end testing tanpa tertunda.
2. **Pengujian Berkelanjutan** lebih efektif daripada menunggu fitur selesai. QA harus ikut memikirkan integrasi antar service sejak awal.
3. **Dokumentasi Terupdate** membantu mengurangi kebingungan, terutama saat service baru ditambahkan atau konfigurasi deployment berubah.
4. **Monitoring & Debugging** adalah kunci untuk cepat menemukan masalah. Log, health check, dan observability menjadi alat yang wajib digunakan.


