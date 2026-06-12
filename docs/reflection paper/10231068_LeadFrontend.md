# Reflection Paper - Nazwa Amelia Zahra (10231068)

## Kendala Teknis yang Dihadapi

Selama mengerjakan proyek ini, saya menghadapi beberapa kendala teknis yang signifikan. Mulai dari **data backend yang tidak tampil di frontend**, hingga masalah navigasi antar halaman yang tidak berfungsi sesuai ekspektasi. Konfigurasi Nginx (`nginx.conf`) juga sempat error ketika menambahkan `auth-service` dan `item-service`, yang memerlukan waktu cukup lama untuk diperbaiki.

Selain itu, kendala lain yang sering muncul adalah **conflict saat pull request antar anggota tim**, serta masalah pada fitur dark mode di mana perubahan tampilan hanya mempengaruhi navbar, sementara halaman lainnya tidak ikut menyesuaikan. Dalam sisi infrastruktur, saya kesulitan beradaptasi dengan **Docker** karena baru pertama kali menggunakannya. Masalah penyimpanan yang penuh saat proses instalasi Docker juga sempat menghambat jalannya pengerjaan.

## Pelajaran dan Analisis

Dari pengalaman tersebut, saya menarik beberapa pelajaran penting:

1. **Koordinasi dan Komunikasi Tim**  
   Koordinasi antar anggota tim sangat krusial agar konflik pada pull request dapat diminimalisir dan alur pengerjaan lebih efisien.

2. **Pemahaman Infrastruktur dan Mikroservis**  
   Penting untuk memahami Docker, konfigurasi Nginx, dan arsitektur mikroservis secara lebih mendalam sebelum implementasi. Hal ini akan mengurangi kemungkinan error saat deployment dan integrasi antar service.

3. **Pentingnya Monitoring & Debugging**  
   Dengan adanya kesalahan pada data dan tampilan, saya menyadari pentingnya **log, health check, dan debugging** untuk mengidentifikasi titik masalah lebih cepat.

4. **Manajemen Resource Lokal**  
   Masalah storage saat instalasi Docker menunjukkan perlunya **manajemen resource lokal** agar pengembangan tidak terhambat oleh masalah teknis di mesin pengembang.
