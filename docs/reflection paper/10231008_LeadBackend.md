# Reflection Paper - Ahmad Daffa Alfattah (10231008)

## Kesulitan dan Tantangan Teknis

Selama pengerjaan proyek ini, salah satu tantangan terbesar yang saya temui adalah terkait **modul Docker dan lingkungan mikroservis**. Karena ini pertama kalinya saya mempelajari materi ini, saya sering merasa bingung mengenai cara kerja container, cara menghubungkan berbagai service, serta manajemen database terpisah untuk masing-masing service. Hal ini semakin terasa karena pengerjaan setiap bagian layanan harus menunggu tim lain menyelesaikan tugasnya, sehingga alur kerja terasa tidak linear dan menuntut koordinasi ekstra.

Selain itu, **merge conflict antar tim** menjadi masalah yang sering muncul. Ketika beberapa anggota tim mengubah file yang sama, terutama dokumentasi dan konfigurasi deployment, konflik ini menuntut pemahaman mendalam tentang git dan cara menyelesaikannya tanpa merusak commit orang lain. Situasi ini menekankan pentingnya **branching strategy** yang jelas serta komunikasi antar anggota tim.

## Puncak Tantangan: Mikroservis dan Server

Puncak tantangan muncul setelah UTS, saat kami mulai mengimplementasikan arsitektur **mikroservis**. Secara pribadi, saya menghadapi kesulitan di bagian **server dan deployment**, karena sebagian besar instruksi saya ikuti dari panduan dosen/asisten. Saya menyadari bahwa pemahaman mendalam tentang bagaimana **tim profesional bekerja dalam sistem terdistribusi** sangat penting: terutama mengenai koordinasi antar service, alur testing, dan bagaimana test dapat dikatakan optimal.

Saya juga mengalami kebingungan dalam **pembagian tugas saat mikroservis**, misalnya menentukan service mana yang harus dikembangkan terlebih dahulu, serta bagaimana menyusun pipeline deployment agar tidak terganggu ketika service lain belum siap. Hal ini mengajarkan saya bahwa **perencanaan dan urutan kerja antar service** sangat krusial agar tim dapat bergerak efisien dan mengurangi bottleneck.

## Pelajaran yang Didapat

1. **Koordinasi Tim Penting**: Menunggu tim lain menyelesaikan bagian mereka membuat saya menyadari pentingnya komunikasi, dokumentasi yang jelas, dan integrasi secara berkala agar konflik atau kesalahan tidak menumpuk.
2. **Pengelolaan Branch dan Merge**: Pengalaman menghadapi konflik git mengajarkan teknik **merge strategy**, penggunaan branch terpisah untuk fitur, dan pentingnya review sebelum merge.
3. **Testing Antar Service**: Saya belajar bahwa testing mikroservis bukan hanya memeriksa endpoint secara individual, tetapi juga memastikan **aliran data dan autentikasi antar service** berjalan sesuai ekspektasi.
4. **Deployment & Observability**: Mengamati kendala saat deployment membuat saya memahami pentingnya log, monitoring, dan health check agar sistem dapat berjalan secara andal dan masalah dapat cepat diidentifikasi.
