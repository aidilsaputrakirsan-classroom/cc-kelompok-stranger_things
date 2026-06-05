# Reliability Testing

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



### Status



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



### Status






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



### Status



---

# Test Summary

| No | Scenario | Expected Result | Actual Result | Status |
|----|----------|----------------|--------------|--------|
| 1 | Service Down | Sistem tetap berjalan saat Auth Service mati | .. | .. |
| 2 | Timeout Handling | Sistem mengembalikan error ketika komunikasi dengan Auth Service gagal tanpa menyebabkan service lain berhenti | .. | .. |
| 3 | Service Recovery | Sistem kembali normal setelah Auth Service aktif kembali | .. | .. |
---

