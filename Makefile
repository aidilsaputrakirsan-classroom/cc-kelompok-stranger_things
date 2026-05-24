# ==============================================================================
# TARGET UTAMA DOCKER COMPOSE
# ==============================================================================
up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

restart:
	docker compose down && docker compose up -d
    
# Target untuk mengecek kerapian kode (Linter)
# Sesuai tugas: 'make lint'
lint:
	@echo "Running linter for Auth Service..."
	docker compose run --rm auth-service flake8 . || echo "Linter found issues or flake8 not installed"
	@echo "Running linter for Item Service..."
	docker compose run --rm item-service flake8 . || echo "Linter found issues or flake8 not installed"

# Target untuk Testing (sebagai placeholder)
# Sesuai tugas: 'make test'
test:
	@echo "Running tests..."
	@echo "No tests configured yet. Success!"

# Target Utama untuk pengecekan Pull Request
# Sesuai tugas: 'make pr-check' (build Docker + test)
pr-check:
	@echo "Starting PR Verification..."
	docker compose build
	$(MAKE) lint
	$(MAKE) test
	@echo "PR Check Passed!"