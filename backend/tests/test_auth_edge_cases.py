"""
Test edge cases untuk auth endpoint.
Mencakup: validasi email, validasi password, get current user.
"""


# ==================== VALIDASI REGISTRASI ====================

def test_register_invalid_email_format(client):
    """Test registrasi dengan email tidak valid → 422."""
    response = client.post("/auth/register", json={
        "email": "bukan-email",
        "password": "Password123!",
        "name": "User Test"
    })
    assert response.status_code == 422


def test_register_password_too_short(client):
    """Test registrasi dengan password < 8 karakter → 422."""
    response = client.post("/auth/register", json={
        "email": "user@example.com",
        "password": "Ab1!",
        "name": "User Test"
    })
    assert response.status_code == 422


def test_register_password_no_uppercase(client):
    """Test registrasi dengan password tanpa huruf besar → 422."""
    response = client.post("/auth/register", json={
        "email": "user@example.com",
        "password": "password123!",
        "name": "User Test"
    })
    assert response.status_code == 422


def test_register_password_no_number(client):
    """Test registrasi dengan password tanpa angka → 422."""
    response = client.post("/auth/register", json={
        "email": "user@example.com",
        "password": "Password!!!",
        "name": "User Test"
    })
    assert response.status_code == 422


def test_register_password_no_special_char(client):
    """Test registrasi dengan password tanpa karakter spesial → 422."""
    response = client.post("/auth/register", json={
        "email": "user@example.com",
        "password": "Password123",
        "name": "User Test"
    })
    assert response.status_code == 422


def test_register_missing_name(client):
    """Test registrasi tanpa name (required) → 422."""
    response = client.post("/auth/register", json={
        "email": "user@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 422


def test_register_missing_email(client):
    """Test registrasi tanpa email (required) → 422."""
    response = client.post("/auth/register", json={
        "password": "Password123!",
        "name": "User Test"
    })
    assert response.status_code == 422


# ==================== VALIDASI LOGIN ====================

def test_login_missing_email(client):
    """Test login tanpa email → 422."""
    response = client.post("/auth/login", json={
        "password": "Password123!"
    })
    assert response.status_code == 422


def test_login_missing_password(client):
    """Test login tanpa password → 422."""
    response = client.post("/auth/login", json={
        "email": "user@example.com"
    })
    assert response.status_code == 422


def test_login_empty_body(client):
    """Test login dengan body kosong → 422."""
    response = client.post("/auth/login", json={})
    assert response.status_code == 422


# ==================== GET CURRENT USER ====================

def test_get_me_success(client, auth_headers):
    """Test GET /auth/me dengan token valid → 200 + data user."""
    response = client.get("/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert "email" in data
    assert "name" in data
    assert "hashed_password" not in data


def test_get_me_no_token(client):
    """Test GET /auth/me tanpa token → 401."""
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_get_me_invalid_token(client):
    """Test GET /auth/me dengan token tidak valid → 401."""
    response = client.get("/auth/me", headers={
        "Authorization": "Bearer tokenpalsu123"
    })
    assert response.status_code == 401


# ==================== TEAM ENDPOINT ====================

def test_team_info(client):
    """Test GET /team → 200 dengan info tim."""
    response = client.get("/team")
    assert response.status_code == 200
    data = response.json()
    assert "team" in data
    assert "members" in data
    assert len(data["members"]) > 0
