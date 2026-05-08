# 🔍 Testing Guide

## 1. Cara Run Test Lokal Backend

Test backend digunakan untuk memastikan endpoint dan logic pada backend berjalan dengan benar.

Langkah-langkah menjalankan test backend:
Masuk ke folder backend:

```bash
cd backend
```
Install dependency jika belum pernah dilakukan:
```bash
pip install -r requirements.txt
```
Jalankan test:
```bash
pytest
```
Jika ingin melihat hasil test lebih detail:
```bash
pytest -v
```
Jika command pytest belum terbaca, install dulu:
```bash
pip install pytest
```
Lalu jalankan lagi:
```bash
pytest
```

---

## 2. Cara Run Test Lokal Frontend

Test frontend digunakan untuk memastikan komponen dan tampilan frontend berjalan sesuai dengan yang diharapkan.

Langkah-langkah menjalankan test frontend:

Masuk ke folder frontend:

```bash
cd frontend
```
Install dependency jika belum pernah dilakukan:
```bash
npm install
```
Jalankan test frontend:
```bash
npm test
```
Jika perintah npm test tidak tersedia, cek bagian scripts pada file:
```bash
frontend/package.json
```
Perintah test frontend dapat menyesuaikan konfigurasi project, misalnya:
```bash
npm run test
```
atau:
```bash
npm run test -- --run
```

---

## 3. Cara Membaca CI Log di GitHub Actions
CI akan berjalan otomatis ketika ada push atau Pull Request ke repository.

**Langkah membaca log CI:**
1. Buka repository di GitHub.
2. Masuk ke tab Actions.
3. Pilih workflow yang gagal atau sedang berjalan.
4. Klik job yang gagal, misalnya Test Backend atau Test Frontend.
5. Buka step yang berwarna merah.
6. Baca pesan error yang muncul.

Contoh error:
```bash
assert 200 == 999
```
Artinya hasil aktual dari endpoint adalah 200, tetapi test mengharapkan 999, sehingga test gagal.

## 4. Cara Debug Test Failure
Jika test gagal, lakukan langkah berikut:
1. Baca pesan error di terminal atau GitHub Actions
2. Cari nama file test yang gagal.
3. Periksa bagian assertion yang bermasalah
4. Bandingkan hasil aktual dan hasil yang diharapkan.
5. Perbaiki kode aplikasi atau kode test sesuai penyebab error.
6. Jalankan ulang test secara lokal.
7. Jika sudah berhasil, commit dan push ulang perubahan.

Contoh test gagal:
```python
def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 999
```
Kode tersebut gagal karena endpoint /health seharusnya mengembalikan status code 200.

Perbaikannya:
```python
def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
```

Setelah diperbaiki, jalankan ulang:
```bash
pytest
```

## 5. Cara Menambah Test Baru
Test backend dapat ditambahkan di folder:
```bash
backend/tests/
```
Contoh file test:
```bash
backend/tests/test_health.py
```
Contoh test baru untuk endpoint /health:
```python
def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
```
Aturan sederhana saat menambahkan test:
1. Nama file test sebaiknya diawali dengan test_.
2. Nama fungsi test harus diawali dengan test_.
3. Satu test sebaiknya fokus pada satu fitur atau satu endpoint.
4. Jalankan test lokal sebelum melakukan push ke GitHub.

## 6. Menjalankan Semua Test
Sebelum membuat Pull Request, semua test perlu dijalankan untuk memastikan tidak ada error.

Backend:
```bash
cd backend
python -m pytest
```

Frontend:
```bash
cd frontend
npm test
```

Dengan Docker Compose:
```bash
docker compose up -d --build
docker compose exec backend pytest
```
Jika semua test berhasil, perubahan aman untuk di-push ke branch.

## 7. Validasi Hasil Test
Validasi hasil test dilakukan dengan memastikan semua test memiliki status berhasil.

Contoh hasil berhasil:
```bash
passed
```
atau:
```bash
All tests passed
```
Jika terdapat test yang gagal, Pull Request sebaiknya tidak di-merge terlebih dahulu. Error harus diperbaiki sampai test berhasil.

Validasi juga dilakukan melalui GitHub Actions. Jika status CI berwarna hijau atau bertuliskan passing, berarti workflow berhasil dijalankan.