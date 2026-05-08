"""Test health check endpoint."""


def test_health_check(client):
    """Test health endpoint → 200 dan status healthy."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "backend"
    
def test_intentional_failure(client):
    """Test ini sengaja gagal — untuk latihan debug CI."""
    response = client.get("/health")
<<<<<<< HEAD
=======
feature/ci-optimization
    assert response.status_code == 200  # Sengaja salah!
>>>>>>> 3ae868d9cce4b6ad7de3ff8dc4742555b9d247a3
    assert response.status_code == 200  # Sengaja salah!
