"""Test endpoints untuk authentication."""
import pytest


def test_register_success(client):
    """Test registrasi user baru berhasil."""
    response = client.post("/auth/register", json={
        "email": "newuser@example.com",
        "password": "Password123!",
        "name": "New User"
    })
    assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
    
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["name"] == "New User"
    assert "id" in data
    assert "hashed_password" not in data  # Password should not be returned


def test_register_duplicate_email(client):
    """Test registrasi dengan email yang sudah terdaftar."""
    # Register first user
    client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "Password123!",
        "name": "Test User"
    })
    
    # Try to register with same email
    response = client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "Password456!",
        "name": "Another User"
    })
    assert response.status_code == 400, f"Expected 400, got {response.status_code}: {response.text}"
    assert "sudah terdaftar" in response.json()["detail"].lower()


def test_login_success(client):
    """Test login berhasil."""
    # Register user
    client.post("/auth/register", json={
        "email": "login@example.com",
        "password": "Password123!",
        "name": "Login User"
    })
    
    # Login
    response = client.post("/auth/login", json={
        "email": "login@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert "user" in data
    assert data["user"]["email"] == "login@example.com"


def test_login_wrong_password(client):
    """Test login dengan password yang salah."""
    # Register user
    client.post("/auth/register", json={
        "email": "wrong@example.com",
        "password": "Password123!",
        "name": "Wrong Pass User"
    })
    
    # Try login dengan password salah
    response = client.post("/auth/login", json={
        "email": "wrong@example.com",
        "password": "WrongPassword123!"
    })
    assert response.status_code == 401, f"Expected 401, got {response.status_code}"


def test_login_nonexistent_email(client):
    """Test login dengan email yang tidak terdaftar."""
    response = client.post("/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 401, f"Expected 401, got {response.status_code}"


def test_search_items(client, auth_headers, item_data):
    """Test search items."""
    # Create item
    client.post("/items", json=item_data, headers=auth_headers)
    
    # Search
    response = client.get("/items?search=laptop", headers=auth_headers)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    
    data = response.json()
    assert "total" in data
    assert "items" in data