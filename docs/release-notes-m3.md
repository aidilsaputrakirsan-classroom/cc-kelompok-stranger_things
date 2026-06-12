# Release Notes — Milestone 3 (Final)

## Version: 3.0.0
**Release Date:** 15 Jun 2026  
**Tag:** v3.0.0

## 🆕 Fitur Baru (dari Milestone 2)
Fitur sama seperti milestone 2

### Microservices Architecture
- Monolith decomposed menjadi Auth Service + Item Service
- Database per service (auth_db, item_db)
- API Gateway (Nginx) sebagai entry point
- Inter-service communication via HTTP REST

### Reliability
- Retry logic dengan exponential backoff (3 kali percobaan)
- Circuit breaker: 5 kegagalan → open, cooldown 30 detik
- Graceful degradation jika Auth Service down

### Monitoring & Observability
- Structured JSON logging dengan correlation ID
- In-memory metrics: request count, error rate, latency (p50/p95/p99)
- Health dashboard: `/status` dengan auto-refresh
- Aggregated health check untuk status dependensi

### Security Hardening
- Rate limiting di API Gateway: 5 req/s untuk auth, 20 req/s untuk API
- Validasi input diperkuat (password strength, batasan field)
- Semua secrets disimpan di environment variables
- CORS dikonfigurasi sesuai environment

## 📊 Statistik Proyek

| Metric | Nilai |
|--------|-------|
| Total Services | 8 containers (3 databases, 3 services, frontend, gateway) |
| Total Endpoints | 12 |
| Unit Tests | 20 tests |
| Integration Tests | 8 tests |
| CI Pipeline Jobs | 133 jobs |
| Total Commits | 218 |
| Total PRs Merged | 65 |


## 👥 Kontribusi
| Nama | Commits | PRs | Areas |
|------|---------|-----|-------|
| Ahmad Daffa Alfattah | 66 | 17 | Backend, Auth Service |
| Nazwa Amelia Zahra | 58 | 16 | Frontend, Dashboard |
| Cintya Widhi Astuti | 49 | 19 | DevOps, Gateway, CI/CD |
| Verina Rahma Dinah | 45 | 13 | QA, Testing, Docs |
