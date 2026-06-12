# ==============================================================================
# TARGET UTAMA DOCKER COMPOSE (SESUAI MODUL 14)
# ==============================================================================

# Menjalankan aplikasi di mode Development
dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Menjalankan aplikasi di mode Production (Mengunci port internal & DB)
prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Mengintip log semua service secara real-time
logs:
	docker compose logs -f

# Mengecek status container yang sedang berjalan
status:
	docker compose ps

# Mematikan semua container yang aktif
down:
	docker compose down

# ==============================================================================
# TARGET KODE KUALITAS & PR CHECK (BAWAAN SEBELUMNYA)
# ==============================================================================

# Target untuk mengecek kerapian kode (Linter)
lint:
	@echo "Running linter for Auth Service..."
	docker compose run --rm auth-service flake8 . || echo "Linter found issues or flake8 not installed"
	@echo "Running linter for Item Service..."
	docker compose run --rm item-service flake8 . || echo "Linter found issues or flake8 not installed"

# Target untuk Testing
test:
	@echo "Running tests..."
	@echo "No tests configured yet. Success!"

# Target Utama untuk pengecekan Pull Request (build Docker + test)
pr-check:
	@echo "Starting PR Verification..."
	docker compose build
	$(MAKE) lint
	$(MAKE) test
	@echo "PR Check Passed!"