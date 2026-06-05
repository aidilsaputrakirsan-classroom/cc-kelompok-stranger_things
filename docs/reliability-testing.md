# 🛡️ Reliability Testing

Dokumen ini berisi hasil pengujian reliability pada sistem microservices yang terdiri dari Auth Service, Item Service, API Gateway, Frontend, serta database terpisah untuk masing-masing service. Pengujian dilakukan untuk memastikan sistem mampu menangani kondisi service down, timeout komunikasi antar service, dan service recovery.

---

## Test Environment

### Services

- auth-service
- item-service
- gateway
- frontend
- auth-db
- item-db

### Verification Command

```bash
docker compose ps
```

### Initial Service Status

| Service | Status |
|----------|----------|
| auth-service | Up (healthy) |
| item-service | Up (healthy) |
| auth-db | Up (healthy) |
| item-db | Up (healthy) |
| gateway | Up |
| frontend | Up |

---

## Test Scenario 1: Service Down

### Objective

Memastikan sistem tetap berjalan ketika Auth Service tidak tersedia.

### Reproduction Steps

1. Verifikasi seluruh service berjalan normal.

```bash
docker compose ps
```

2. Hentikan Auth Service.

```bash
docker compose stop auth-service
```

3. Verifikasi status service.

```bash
docker compose ps
```

4. Kirim request ke endpoint yang membutuhkan autentikasi.

Contoh:

```http
POST /children
```

### Expected Behavior

- Auth Service tidak dapat diakses setelah service dihentikan.
- Request yang membutuhkan autentikasi gagal diproses.
- Item Service tetap berjalan dan tidak mengalami crash.
- Gateway dan Frontend tetap dapat diakses.
- Sistem mengembalikan pesan error yang sesuai kepada pengguna.

### Test Result

<img src="../docs/image/reliability testing/service down (1).png" />

Pengujian dilakukan dengan menghentikan service `auth-service` menggunakan perintah `docker compose stop auth-service`. Dari hasil eksekusi, container `bye_virus-auth-service` berhasil dihentikan dengan status *Stopped*, yang menunjukkan bahwa service autentikasi sudah tidak berjalan di dalam sistem. Setelah itu dilakukan pengecekan menggunakan perintah `docker compose ps` untuk memastikan kondisi seluruh container yang aktif.

Hasil pengecekan menunjukkan bahwa seluruh service lainnya seperti `backend`, `gateway`, `frontend`, `item-service`, serta seluruh database (auth-db, item-db, dan db utama) tetap berada dalam kondisi *Up* dan sebagian besar berstatus *healthy*. Hal ini menandakan bahwa penghentian `auth-service` tidak menyebabkan gangguan atau crash pada service lainnya.


<img src="../docs/image/reliability testing/service down (2).png" />

Pengujian menunjukkan bahwa ketika `auth-service` dalam kondisi tidak berjalan, sistem tetap dapat menerima request namun tidak dapat memproses autentikasi yang bergantung pada service tersebut. Hal ini ditunjukkan dengan respons dari sistem berupa HTTP status code **503 Service Unavailable**.

Response body yang diterima berisi pesan error: *"Auth Service unavailable. Please try again later."*. Pesan ini mengindikasikan bahwa gateway atau backend berhasil mendeteksi bahwa layanan autentikasi tidak tersedia, kemudian mengembalikan respons yang sesuai kepada pengguna.


| Expected Behavior | Actual Result | Status |
|------------------|--------------|--------|
| Auth Service tidak dapat diakses setelah service dihentikan | Service Auth berhasil dihentikan dan tidak dapat diakses | ✅ |
| Request yang membutuhkan autentikasi gagal diproses | Request mengembalikan HTTP 503 Service Unavailable dengan pesan "Auth Service unavailable. Please try again later." | ✅ |
| Item Service tetap berjalan dan tidak mengalami crash | Item Service tetap berjalan normal tanpa error | ✅ |
| Gateway tetap dapat diakses | Gateway tetap aktif dan dapat menerima request | ✅ |
| Frontend tetap dapat diakses | Frontend tetap berjalan dan bisa diakses | ✅ |
| Sistem mengembalikan pesan error yang sesuai kepada pengguna | Sistem menampilkan error 503 dengan pesan yang jelas dari gateway/backend | ✅ |


---

## Test Scenario 2: Timeout Handling

### Objective

Memastikan sistem dapat menangani kegagalan komunikasi antar service tanpa menyebabkan aplikasi berhenti merespons.

### Reproduction Steps

1. Pastikan Auth Service tidak dapat merespons request dari Item Service.

```bash
docker compose stop auth-service
```

2. Kirim request ke endpoint yang membutuhkan validasi token.

Contoh:

```http
POST /children
```

3. Amati response yang diberikan sistem.

4. Periksa log Item Service.

```bash
docker compose logs item-service --tail=50
```

### Expected Behavior

- Sistem mencoba melakukan komunikasi dengan Auth Service.
- Request tidak menunggu tanpa batas waktu.
- Sistem mengembalikan response error ketika komunikasi gagal.
- Item Service tetap berjalan normal.
- Sistem tidak mengalami crash atau hang.

### Test Result

<img src="../docs/image/reliability testing/timeout.png" />
<img src="../docs/image/reliability testing/service down (2).png" />


Pada pengujian timeout handling, dilakukan simulasi gangguan pada `auth-service` sehingga service tersebut tidak dapat diakses. Dari log `item-service`, terlihat bahwa sistem mencoba melakukan komunikasi ke `auth-service` sebanyak beberapa kali (hingga 3 percobaan).

Hasil log menunjukkan adanya pesan:
- "Auth Service timeout (attempt 1/3)"
- "Cannot connect to Auth Service (attempt 2/3)"
- "Auth Service timeout (attempt 3/3)"
- "Auth Service unreachable after 3 attempts"

Setelah seluruh percobaan gagal, sistem kemudian mengembalikan respons HTTP **503 Service Unavailable** pada endpoint `/children`, yang menandakan bahwa service tidak dapat diproses karena dependency (auth-service) tidak tersedia.

Meskipun terjadi timeout pada salah satu service, `item-service` tetap berjalan normal dan endpoint lain seperti `/health` tetap mengembalikan status 200 OK. Hal ini menunjukkan bahwa mekanisme retry dan timeout handling sudah berjalan dengan baik tanpa menyebabkan crash pada service utama.

| Expected Behavior | Actual Result | Status |
|------------------|--------------|--------|
| Sistem mencoba melakukan komunikasi dengan Auth Service | Item Service melakukan beberapa percobaan koneksi ke Auth Service (attempt 1/3 hingga 3/3) | ✅ |
| Request tidak menunggu tanpa batas waktu | Sistem melakukan retry hingga 3 kali lalu menghentikan proses (tidak hang) | ✅ |
| Sistem mengembalikan response error ketika komunikasi gagal | Sistem mengembalikan HTTP 503 Service Unavailable dengan pesan "Auth Service unreachable after 3 attempts" | ✅ |
| Item Service tetap berjalan normal | Item Service tetap berjalan dan endpoint lain tetap merespon 200 OK | ✅ |
| Sistem tidak mengalami crash atau hang | Tidak terjadi crash atau hang, service tetap stabil | ✅ |

---

## Test Scenario 3: Service Recovery

### Objective

Memastikan sistem dapat kembali beroperasi normal setelah Auth Service diaktifkan kembali.

### Reproduction Steps

1. Jalankan kembali Auth Service.

```bash
docker compose start auth-service
```

2. Verifikasi status service.

```bash
docker compose ps
```

3. Login kembali dan dapatkan token yang valid.

4. Ulangi request yang sebelumnya gagal.

### Expected Behavior

- Auth Service kembali aktif setelah dijalankan.
- Komunikasi antar service kembali normal.
- Request yang sebelumnya gagal dapat diproses kembali.
- Sistem kembali beroperasi tanpa perlu me-restart seluruh aplikasi.

### Test Result

<img src="../docs/image/reliability testing/recovery (1).png" />

Pada pengujian recovery, dilakukan proses pengaktifan kembali service `auth-service` yang sebelumnya dihentikan. Proses dilakukan menggunakan perintah `docker compose start auth-service`, dan hasilnya container `bye_virus-auth-service` berhasil dijalankan kembali dengan status *Started*. Selain itu, container `auth-db` juga berada dalam kondisi *Healthy*, yang menunjukkan bahwa dependency database untuk auth service telah siap digunakan kembali.

Hasil pengecekan menggunakan `docker compose ps` menunjukkan bahwa seluruh service dalam sistem, termasuk `backend`, `gateway`, `frontend`, `item-service`, serta seluruh database, tetap berjalan normal tanpa restart atau gangguan. Status `auth-service` juga terlihat berada dalam kondisi *health: starting*, yang menandakan bahwa service sedang melakukan proses inisialisasi dan pemulihan koneksi.

Hasil ini menunjukkan bahwa sistem berhasil melakukan recovery dengan baik. Setelah `auth-service` diaktifkan kembali, seluruh komponen sistem tetap stabil dan tidak terjadi crash, sehingga sistem kembali ke kondisi normal seperti sebelum service mengalami downtime.

<img src="../docs/image/reliability testing/recovery (2).png" />

Setelah proses recovery dilakukan dengan mengaktifkan kembali `auth-service`, pengujian dilanjutkan dengan mengirimkan request ke endpoint `http://localhost:8002/children` pada `item-service`. Hasil pengujian menunjukkan bahwa sistem berhasil memproses request dengan normal dan mengembalikan respons HTTP **201 Created**.

Response body berisi data yang berhasil dibuat, termasuk atribut seperti `id`, `parent_id`, `name`, `birth_date`, `gender`, `blood_type`, `height`, `weight`, `notes`, dan `is_active`. Hal ini menunjukkan bahwa proses penyimpanan data ke dalam sistem berjalan dengan baik setelah service kembali aktif.

| Expected Behavior | Actual Result | Status |
|------------------|--------------|--------|
| Auth Service kembali aktif setelah dijalankan | Auth Service berhasil dijalankan kembali dengan status Started dan database auth-db dalam kondisi Healthy | ✅ |
| Komunikasi antar service kembali normal | Seluruh service (backend, gateway, frontend, item-service) kembali berjalan normal tanpa restart tambahan | ✅ |
| Request yang sebelumnya gagal dapat diproses kembali | Request ke endpoint `/children` berhasil diproses dan menghasilkan HTTP 201 Created | ✅ |
| Sistem kembali beroperasi tanpa perlu me-restart seluruh aplikasi | Sistem tetap berjalan stabil tanpa restart seluruh container, hanya auth-service yang di-start ulang | ✅ |

---

# Test Summary

| No | Scenario | Expected Result | Actual Result | Status |
|----|----------|----------------|--------------|--------|
| 1 | Service Down | Sistem tetap berjalan saat Auth Service mati | Auth Service berhenti, service lain tetap berjalan, request menghasilkan 503 | PASS ✅ |
| 2 | Timeout Handling | Sistem mengembalikan error tanpa crash saat Auth Service gagal diakses | Sistem melakukan retry 3x lalu mengembalikan 503 tanpa hang | PASS ✅ |
| 3 | Service Recovery | Sistem kembali normal setelah Auth Service aktif kembali | Auth Service berhasil start, request kembali berhasil dengan 201 Created | PASS ✅ |
---

