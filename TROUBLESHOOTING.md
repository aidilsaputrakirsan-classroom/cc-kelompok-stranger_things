## 🔧 TROUBLESHOOTING - Failed to Fetch Error

### Step 1: Check Backend Status
```bash
# Lihat semua logs dari Docker
docker compose logs backend

# Atau lihat hanya 20 baris terakhir
docker compose logs --tail=20 backend
```

**Cari pesan:**
- ✅ Kalau ada `Application startup complete` → Backend OK
- ❌ Kalau ada error → Backend crash

---

### Step 2A: Jika Backend Jalan (Local Development)

**Pastikan backend jalan di port 8000:**
```bash
# Cek dari terminal lain:
curl http://localhost:8000/health
```

**Response harus:**
```json
{"status": "healthy", "version": "0.4.0"}
```

**Kalau OK, coba di frontend:**
```bash
cd frontend
npm run dev
```

Buka `http://localhost:5173` (atau port yang ditunjukkan)

---

### Step 2B: Jika Backend Error/Crash

**Full restart dengan fresh rebuild:**
```bash
# 1. Stop semua
docker compose down

# 2. Remove old images untuk force rebuild
docker image rm bye_virus-backend bye_virus-frontend

# 3. Rebuild + Run
docker compose up --build

# 4. Check logs
docker compose logs backend
```

---

### Step 3: Common Issues & Fixes

#### Issue: `ERR_NAME_NOT_RESOLVED` (backend:8000 tidak ketemu)
**Cause:** Frontend lokal akses `backend:8000` (hanya di Docker network)
**Fix:** 
```bash
# Sudah ada .env.development
# Pastikan jalan: npm run dev
# Akan akses localhost:8000 ✅
```

#### Issue: `Connection refused` (localhost:8000)
**Cause:** Backend tidak jalan
**Fix:**
```bash
# Check: apakah DB healthy?
docker compose logs db

# Rebuild backend
docker image rm bye_virus-backend
docker compose up --build
```

#### Issue: `CORS error` masih muncul
**Cause:** CORS config belum di-reload
**Fix:**
```bash
# Hard restart
docker compose down -v  # -v: hapus volumes juga
docker compose up --build
```

---

### Step 4: Verify Setup

```bash
# 1. Database: Connect ke DB
psql postgresql://postgres:postgres@localhost:5432/bye_virus

# 2. Backend: Test endpoint
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"khan@gmail.com","password":"Password123!"}'

# 3. Frontend: 
# Buka browser -> Console (F12) -> Tab "Network"
# Lihat Network Request saat login - harus return 200 OK
```

---

### Step 5: Files Check

Pastikan ada ini:
- ✅ `backend/.env.docker` - Sudah update CORS
- ✅ `backend/main.py` - Sudah update CORS
- ✅ `frontend/.env.development` - Created (untuk npm run dev)
- ✅ `docker-compose.yml` - Sudah update VITE_API_URL

---

### Quick Fix Checklist:

```bash
# 1. Pull latest
git pull

# 2. Install dependencies (kalau perlu)
cd frontend && npm install && cd ../backend

# 3. Restart everything
docker compose down
docker compose up --build

# 4. Frontend local dev
cd frontend && npm run dev

# 5. Open browser
# http://localhost:5173 (atau port dari npm output)
```
