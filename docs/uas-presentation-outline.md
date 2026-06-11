# UAS Presentation Outline

## Slide 1: Title
- Nama proyek: Bye Virus / Stranger Things
- Nama tim: Kelompok Stranger Things
- Anggota: [Daftar Anggota]

## Slide 2: Problem & Solution
- Masalah yang diselesaikan: Pencatatan Imunisasi dan Manajemen Inventori yang terpadu
- Target pengguna: Orang Tua dan Bidan
- Solusi: Sistem berbasis Cloud Native Microservices

## Slide 3: Architecture Journey
- Week 1-4: Monolith (1 backend, 1 DB)
- Week 5-7: Containerized (Docker Compose)
- Week 9-11: CI/CD (GitHub Actions + Railway)
- Week 12-14: Microservices (2 services + gateway)

## Slide 4: Tech Stack & Infrastructure
- Diagram arsitektur final
- Jumlah containers, services, endpoints
- CI/CD pipeline flow
- Monitoring & observability

## Slide 5: Live Demo
- Flow: Open app → register → login → create child/items → view items
  → update → delete → check /status page → show CI/CD badge
- Backup: recorded video jika internet bermasalah

## Slide 6: Challenges & Lessons Learned
- Challenge 1: Komunikasi antar service → Solution: HTTP REST dengan Circuit Breaker
- Challenge 2: Keamanan API → Solution: Nginx Rate Limiting dan Pydantic Validation
- Challenge 3: Sinkronisasi Environment → Solution: Audit credentials dan Docker volumes
- Biggest learning: Observability (Logs/Metrics) dan pentingnya DevOps praktis

## Slide 7: Team Contributions
- [Nama] — Lead Backend — Setup FastAPI, Microservices, API Contract
- [Nama] — Lead Frontend — React UI, Integration, Status Page
- [Nama] — Lead DevOps — Docker, Nginx, Railway
- [Nama] — Lead QA & Docs — Testing, CI Pipeline, Documentation

## Demo Script (urutan langkah)
1. Buka http://localhost (atau production URL)
2. Register user baru
3. Login
4. Create profile anak / item
5. Tampilkan daftar anak / item
6. Update data
7. Delete data
8. Buka /status — show health + metrics
9. Show GitHub → CI/CD pipeline green
10. Show structured logs (docker compose logs)
