# Docker Cheatsheet — CloudApp

Referensi cepat penggunaan Docker untuk proyek CloudApp  
(Backend FastAPI + Frontend React + PostgreSQL)

---

## Build Image

```bash
docker build -t <nama_image>:<tag> .
docker build --no-cache -t <nama_image>:<tag> .
```
### Contoh
```bash
# Backend
cd backend
docker build -t cloudapp-backend:v2 .

# Frontend
cd frontend
docker build -t cloudapp-frontend:v1 .
```
## Run Container
```bash
docker run -d --name <nama> -p <host>:<container> <image>
```
### Contoh:
```bash
# Database PostgreSQL
docker run -d --name db --network cloudnet \
-e POSTGRES_USER=bye_virus \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=cloudapp \
-p 5433:5432 \
-v pgdata:/var/lib/postgresql/data \
postgres:16-alpine

# Backend
docker run -d --name backend --network cloudnet \
--env-file .env.docker \
-p 8000:8000 \
cloudapp-backend:v2

# Frontend
docker run -d --name frontend --network cloudnet \
-p 3000:80 \
cloudapp-frontend:v1
```
## KOnfigurasi Database
```bash
DATABASE_URL=postgresql://bye_virus:postgres@db:5432/cloudapp
```
## Monitoring & Debugging
``` bash
docker ps
docker ps -a
docker logs backend
docker logs -f backend
docker inspect backend
docker stats
```
## Masuk ke Container
```bash
docker exec -it backend bash
docker exec -it db sh
```
## Akses Database:
``` bash
docker exec -it db psql -U bye_virus -d cloudapp
```
```sql
SELECT * FROM users;
```
## Stop & REmove
``` bash
docker stop backend
docker rm backend
docker rm -f backend
docker restart backend
```
## Image Management
```bash
docker images
docker rmi <image>
docker history <image>
```
## Push ke Docker Hub
```bash
docker login

docker tag cloudapp-backend:v2 cntywdh/cloudapp-backend:v2
docker push cntywdh/cloudapp-backend:v2

docker tag cloudapp-frontend:v1 cntywdh/cloudapp-frontend:v1
docker push cntywdh/cloudapp-frontend:v1
```
## Cleanup
```bash
docker system df
docker system prune
docker system prune -a
```
## Test Persistence
``` bash
docker restart backend

docker stop db
docker rm db

docker run -d --name db --network cloudnet \
-e POSTGRES_USER=bye_virus \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=cloudapp \
-p 5433:5432 \
-v pgdata:/var/lib/postgresql/data \
postgres:16-alpine

docker restart backend
```
**Cek data:**
```bash
docker exec -it db psql -U bye_virus -d cloudapp
```
```sql
SELECT * FROM users;
```
## Workflow
```bash
# Build backend
cd backend
docker build -t cloudapp-backend:v2 .

# Run backend
docker run -d -p 8000:8000 --env-file .env.docker --name backend cloudapp-backend:v2

# Build frontend
cd ../frontend
docker build -t cloudapp-frontend:v1 .

# Run frontend
docker run -d -p 3000:80 --name frontend cloudapp-frontend:v1

# Push ke Docker Hub
docker login

docker tag cloudapp-backend:v2 cntywdh/cloudapp-backend:v2
docker push cntywdh/cloudapp-backend:v2

docker tag cloudapp-frontend:v1 cntywdh/cloudapp-frontend:v1
docker push cntywdh/cloudapp-frontend:v1
```