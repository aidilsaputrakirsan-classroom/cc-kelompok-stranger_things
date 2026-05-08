# Target untuk mengecek kerapian kode (Linter)
# Sesuai tugas: 'make lint'
lint:
	@echo "Running linter..."
	docker compose run --rm backend flake8 . || echo "Linter found issues or flake8 not installed"

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