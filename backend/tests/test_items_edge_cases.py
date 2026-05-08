"""
Test edge cases untuk items endpoint.
Mencakup: input tidak valid, field kosong, stats, pagination, dan filter kategori.
"""


# ==================== EDGE CASES: INPUT TIDAK VALID ====================

def test_create_item_missing_name(client, auth_headers):
    """Test membuat item tanpa name (required) → 422 Unprocessable Entity."""
    response = client.post("/items", json={
        "price": 10000,
        "quantity": 1
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_item_missing_price(client, auth_headers):
    """Test membuat item tanpa price (required) → 422."""
    response = client.post("/items", json={
        "name": "Laptop",
        "quantity": 1
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_item_negative_price(client, auth_headers):
    """Test membuat item dengan price negatif → 422 (price harus > 0)."""
    response = client.post("/items", json={
        "name": "Laptop",
        "price": -1000,
        "quantity": 1
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_item_zero_price(client, auth_headers):
    """Test membuat item dengan price = 0 → 422 (price harus > 0)."""
    response = client.post("/items", json={
        "name": "Laptop",
        "price": 0,
        "quantity": 1
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_item_negative_quantity(client, auth_headers):
    """Test membuat item dengan quantity negatif → 422 (quantity >= 0)."""
    response = client.post("/items", json={
        "name": "Laptop",
        "price": 1000,
        "quantity": -5
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_item_empty_name(client, auth_headers):
    """Test membuat item dengan name kosong '' → 422 (min_length=1)."""
    response = client.post("/items", json={
        "name": "",
        "price": 10000,
        "quantity": 1
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_item_name_too_long(client, auth_headers):
    """Test membuat item dengan name > 100 karakter → 422."""
    response = client.post("/items", json={
        "name": "A" * 101,
        "price": 10000,
        "quantity": 1
    }, headers=auth_headers)
    assert response.status_code == 422


def test_update_item_not_found(client, auth_headers):
    """Test update item yang tidak ada → 404."""
    response = client.put("/items/99999", json={
        "price": 20000
    }, headers=auth_headers)
    assert response.status_code == 404


def test_delete_item_not_found(client, auth_headers):
    """Test delete item yang tidak ada → 404."""
    response = client.delete("/items/99999", headers=auth_headers)
    assert response.status_code == 404


def test_get_single_item_success(client, auth_headers):
    """Test GET /items/{id} berhasil mendapatkan item."""
    create_resp = client.post("/items", json={
        "name": "Keyboard Mechanical",
        "price": 750000,
        "quantity": 3,
        "description": "Keyboard gaming"
    }, headers=auth_headers)
    assert create_resp.status_code == 201
    item_id = create_resp.json()["id"]

    response = client.get(f"/items/{item_id}", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == item_id
    assert data["name"] == "Keyboard Mechanical"
    assert data["price"] == 750000


# ==================== PAGINATION ====================

def test_items_pagination_skip_limit(client, auth_headers):
    """Test pagination dengan ?skip=0&limit=2."""
    # Buat 5 items
    for i in range(5):
        client.post("/items", json={
            "name": f"Item {i+1}",
            "price": (i + 1) * 10000,
            "quantity": i + 1
        }, headers=auth_headers)

    # Ambil hanya 2 item pertama
    response = client.get("/items?skip=0&limit=2", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 2
    assert data["total"] == 5


def test_items_pagination_skip(client, auth_headers):
    """Test pagination dengan skip untuk halaman ke-2."""
    for i in range(4):
        client.post("/items", json={
            "name": f"Produk {i+1}",
            "price": (i + 1) * 5000,
            "quantity": 1
        }, headers=auth_headers)

    # Halaman 1: skip=0, limit=2
    page1 = client.get("/items?skip=0&limit=2", headers=auth_headers)
    # Halaman 2: skip=2, limit=2
    page2 = client.get("/items?skip=2&limit=2", headers=auth_headers)

    assert page1.status_code == 200
    assert page2.status_code == 200
    assert len(page1.json()["items"]) == 2
    assert len(page2.json()["items"]) == 2

    # Item di halaman 1 dan 2 harus berbeda
    ids_page1 = {item["id"] for item in page1.json()["items"]}
    ids_page2 = {item["id"] for item in page2.json()["items"]}
    assert ids_page1.isdisjoint(ids_page2)


def test_items_pagination_limit_max(client, auth_headers):
    """Test limit melebihi maksimum (100) → 422."""
    response = client.get("/items?limit=999", headers=auth_headers)
    assert response.status_code == 422


def test_items_pagination_skip_negative(client, auth_headers):
    """Test skip negatif → 422."""
    response = client.get("/items?skip=-1", headers=auth_headers)
    assert response.status_code == 422


def test_items_empty_list(client, auth_headers):
    """Test GET /items saat tidak ada item → total 0, list kosong."""
    response = client.get("/items", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []


# ==================== STATS ENDPOINT ====================

def test_items_stats_empty(client):
    """Test GET /items/stats saat tidak ada item."""
    response = client.get("/items/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_items"] == 0
    assert data["total_value"] == 0
    assert data["most_expensive"] is None
    assert data["cheapest"] is None


def test_items_stats_with_data(client, auth_headers):
    """Test GET /items/stats dengan beberapa item."""
    client.post("/items", json={
        "name": "Laptop", "price": 15000000, "quantity": 2
    }, headers=auth_headers)
    client.post("/items", json={
        "name": "Mouse", "price": 200000, "quantity": 5
    }, headers=auth_headers)
    client.post("/items", json={
        "name": "Monitor", "price": 3000000, "quantity": 1
    }, headers=auth_headers)

    response = client.get("/items/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_items"] == 3
    assert data["total_value"] == (15000000 * 2) + (200000 * 5) + (3000000 * 1)
    assert data["most_expensive"]["name"] == "Laptop"
    assert data["most_expensive"]["price"] == 15000000
    assert data["cheapest"]["name"] == "Mouse"
    assert data["cheapest"]["price"] == 200000


def test_items_stats_single_item(client, auth_headers):
    """Test GET /items/stats dengan 1 item — most_expensive = cheapest."""
    client.post("/items", json={
        "name": "Single Item", "price": 50000, "quantity": 3
    }, headers=auth_headers)

    response = client.get("/items/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_items"] == 1
    assert data["most_expensive"]["name"] == "Single Item"
    assert data["cheapest"]["name"] == "Single Item"
