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
    assert response.status_code == 999  # Sengaja salah!