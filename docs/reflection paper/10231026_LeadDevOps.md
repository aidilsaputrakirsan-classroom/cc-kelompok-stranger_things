# Reflection Paper - Cintya Widhi Astuti (10231026)

Sebagai pengguna baru pertama kali menyentuh Docker, kendala terbesar saya adalah kebingungan dalam memahami alur kerja perintahnya—terutama kapan harus menggunakan `docker compose up`, kapan harus `down` untuk membersihkan kontainer, dan kapan harus melakukan `--build` ulang setelah ada perubahan kode. Akibat ketidaktahuan ini, proses build sempat macet total karena harddisk laptop penuh oleh tumpukan cache kontainer lama yang tidak dibersihkan.  

Hambatan ini semakin rumit ketika kami mencoba melakukan Pull Request (PR) di GitHub; terjadi bentrokan kode (*conflict*) yang merusak file `ci.yml` (konfigurasi otomatisasi pengujian/CI) karena beberapa anggota tim mengedit jalur otomasi yang sama secara bersamaan. Di sisi aplikasi, kami juga menghadapi masalah **data backend yang tidak tampil di frontend** karena salah urutan menyalakan kontainer, serta bug **dark mode** yang hanya mengubah warna navbar saja.

---

## Solusi yang Diterapkan

1. **Otomatisasi alur kerja Docker**  
   Perintah-perintah membingungkan digabung ke dalam file **Makefile**, menggunakan target `dev:` dan `prod:` untuk otomatis build dan up.

2. **Penyelesaian masalah storage penuh**  
   Menggunakan perintah `docker system prune -a --volumes` dan mengganti basis sistem ke versi ringan berbasis Alpine.

3. **Resolusi konflik PR / file ci.yml**  
   Debugging histori di VS Code dengan fitur **Accept Both Changes** untuk menyatukan pipa otomatisasi tim.

4. **Sinkronisasi backend & frontend**  
   Menggunakan parameter `depends_on` di Docker Compose agar database menyala lebih dulu, serta memindahkan pengaturan tema dark mode ke **Context Provider** agar berlaku global.

---

## Pelajaran yang Diambil

- Menggunakan Docker bukan sekadar menjalankan aplikasi, melainkan memahami **siklus hidup kontainer**—kapan harus `down` dan `build` agar tidak menyisakan sampah di memori lokal.
- File konfigurasi otomasi seperti `ci.yml` sangat sensitif terhadap perubahan massal; koordinasi tim adalah kunci.
- **Koordinasi dan komunikasi intens** antar-anggota tim jauh lebih penting untuk meminimalisir konflik di GitHub dibanding urusan teknis kode saja.
- Pemahaman alur Docker dan Git yang matang akan menghemat waktu tim dan mencegah pengulangan kesalahan operasional.