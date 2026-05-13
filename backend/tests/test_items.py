"""Test CRUD item endpoints."""


def test_create_item(client, auth_headers):
    """Test membuat item baru → 201."""
    response = client.post("/items", json={
        "name": "Laptop",
        "description": "Laptop untuk cloud computing",
        "price": 15000000,
        "quantity": 5
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Laptop"
    assert data["price"] == 15000000
    assert "id" in data


def test_create_item_unauthorized(client):
    """Test membuat item tanpa login → 401."""
    response = client.post("/items", json={
        "name": "Laptop",
        "price": 15000000,
        "quantity": 1
    })
    assert response.status_code == 401


def test_get_items(client, auth_headers):
    """Test mengambil daftar items → 200."""
    # Buat 2 items
    client.post("/items", json={
        "name": "Laptop", "price": 15000000, "quantity": 1
    }, headers=auth_headers)
    client.post("/items", json={
        "name": "Mouse", "price": 250000, "quantity": 3
    }, headers=auth_headers)

    response = client.get("/items", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 2


def test_get_item_not_found(client, auth_headers):
    """Test mengambil item yang tidak ada → 404."""
    response = client.get("/items/9999", headers=auth_headers)
    assert response.status_code == 404


def test_update_item(client, auth_headers):
    """Test update item → data berubah."""
    # Buat item
    create_resp = client.post("/items", json={
        "name": "Laptop", "price": 15000000, "quantity": 1
    }, headers=auth_headers)
    item_id = create_resp.json()["id"]

    # Update
    response = client.put(f"/items/{item_id}", json={
        "price": 14000000
    }, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["price"] == 14000000


def test_delete_item(client, auth_headers):
    """Test hapus item → 204, lalu GET → 404."""
    # Buat item
    create_resp = client.post("/items", json={
        "name": "Temporary", "price": 100, "quantity": 1
    }, headers=auth_headers)
    item_id = create_resp.json()["id"]

    # Hapus
    response = client.delete(f"/items/{item_id}", headers=auth_headers)
    assert response.status_code == 204

    # Verifikasi sudah tidak ada
    get_resp = client.get(f"/items/{item_id}", headers=auth_headers)
    assert get_resp.status_code == 404


def test_search_items(client, auth_headers):
    """Test search item berdasarkan nama."""
    client.post("/items", json={
        "name": "Laptop Gaming", "price": 20000000, "quantity": 1
    }, headers=auth_headers)
    client.post("/items", json={
        "name": "Mouse Wireless", "price": 350000, "quantity": 2
    }, headers=auth_headers)

    response = client.get("/items?search=laptop", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    assert any("laptop" in item["name"].lower() for item in data["items"])


def test_create_item_with_category(client, auth_headers):
    """Test membuat item dengan field category."""
    response = client.post("/items", json={
        "name": "Laptop Gaming",
        "description": "Laptop untuk gaming",
        "price": 20000000,
        "quantity": 2,
        "category": "electronics"
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["category"] == "electronics"


def test_create_item_without_category(client, auth_headers):
    """Test membuat item tanpa category (field opsional)."""
    response = client.post("/items", json={
        "name": "Buku Catatan",
        "price": 25000,
        "quantity": 10
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["category"] is None


def test_filter_items_by_category(client, auth_headers):
    """Test filter GET /items?category=electronics."""
    # Buat item dengan kategori berbeda
    client.post("/items", json={
        "name": "Laptop Pro", "price": 18000000, "quantity": 1, "category": "electronics"
    }, headers=auth_headers)
    client.post("/items", json={
        "name": "Stetoskop", "price": 500000, "quantity": 5, "category": "medical"
    }, headers=auth_headers)
    client.post("/items", json={
        "name": "Pena Ballpoint", "price": 5000, "quantity": 50, "category": "office"
    }, headers=auth_headers)

    # Filter hanya electronics
    response = client.get("/items?category=electronics", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    for item in data["items"]:
        assert item["category"].lower() == "electronics"


def test_filter_items_category_no_match(client, auth_headers):
    """Test filter category yang tidak ada itemnya → total 0."""
    client.post("/items", json={
        "name": "Laptop", "price": 15000000, "quantity": 1, "category": "electronics"
    }, headers=auth_headers)

    response = client.get("/items?category=furniture", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []


def test_update_item_category(client, auth_headers):
    """Test update category pada item yang sudah ada."""
    # Buat item tanpa category
    create_resp = client.post("/items", json={
        "name": "Mouse", "price": 200000, "quantity": 3
    }, headers=auth_headers)
    item_id = create_resp.json()["id"]

    # Update category
    response = client.put(f"/items/{item_id}", json={
        "category": "electronics"
    }, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["category"] == "electronics"