"""
Test untuk endpoint child dan artikel.
Mencakup: CRUD anak, akses tidak diizinkan, artikel, dan endpoint lainnya.
"""


# ==================== CHILD ENDPOINTS ====================

def _register_and_login(client, email="parent@test.com"):
    """Helper: register + login dan kembalikan auth headers."""
    client.post("/auth/register", json={
        "email": email,
        "password": "Password123!",
        "name": "Parent User"
    })
    resp = client.post("/auth/login", json={
        "email": email,
        "password": "Password123!"
    })
    token = resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def _create_child(client, headers):
    """Helper: buat child dan return response JSON."""
    resp = client.post("/children", json={
        "name": "Budi Santoso",
        "birth_date": "2023-01-15",
        "gender": "male",
        "blood_type": "A",
        "height": 75.0,
        "weight": 9.5
    }, headers=headers)
    return resp


def test_create_child_success(client, auth_headers):
    """Test POST /children berhasil membuat profil anak."""
    response = _create_child(client, auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Budi Santoso"
    assert data["gender"] == "male"
    assert "id" in data


def test_create_child_invalid_gender(client, auth_headers):
    """Test POST /children dengan gender tidak valid → 422."""
    response = client.post("/children", json={
        "name": "Budi",
        "birth_date": "2023-01-15",
        "gender": "unknown"
    }, headers=auth_headers)
    assert response.status_code == 422


def test_create_child_missing_required_fields(client, auth_headers):
    """Test POST /children tanpa field wajib → 422."""
    response = client.post("/children", json={
        "name": "Budi"
        # birth_date dan gender tidak diisi
    }, headers=auth_headers)
    assert response.status_code == 422


def test_get_children_empty(client, auth_headers):
    """Test GET /children saat belum ada anak → list kosong."""
    response = client.get("/children", headers=auth_headers)
    assert response.status_code == 200
    assert response.json() == []


def test_get_children_success(client, auth_headers):
    """Test GET /children setelah create → return list."""
    _create_child(client, auth_headers)
    _create_child(client, auth_headers)

    response = client.get("/children", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2


def test_get_child_by_id_success(client, auth_headers):
    """Test GET /children/{id} berhasil."""
    create_resp = _create_child(client, auth_headers)
    child_id = create_resp.json()["id"]

    response = client.get(f"/children/{child_id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["id"] == child_id


def test_get_child_not_found(client, auth_headers):
    """Test GET /children/{id} dengan id tidak ada → 404."""
    response = client.get("/children/99999", headers=auth_headers)
    assert response.status_code == 404


def test_get_child_unauthorized_other_user(client):
    """Test akses anak milik user lain → 403."""
    # User A buat anak
    headers_a = _register_and_login(client, "user_a@test.com")
    create_resp = _create_child(client, headers_a)
    child_id = create_resp.json()["id"]

    # User B coba akses anak milik User A
    headers_b = _register_and_login(client, "user_b@test.com")
    response = client.get(f"/children/{child_id}", headers=headers_b)
    assert response.status_code == 403


def test_update_child_success(client, auth_headers):
    """Test PUT /children/{id} berhasil update field."""
    create_resp = _create_child(client, auth_headers)
    child_id = create_resp.json()["id"]

    response = client.put(f"/children/{child_id}", json={
        "name": "Budi Updated",
        "weight": 10.5
    }, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["name"] == "Budi Updated"


def test_update_child_not_found(client, auth_headers):
    """Test PUT /children/{id} yang tidak ada → 404."""
    response = client.put("/children/99999", json={
        "name": "Tidak Ada"
    }, headers=auth_headers)
    assert response.status_code == 404


def test_delete_child_success(client, auth_headers):
    """Test DELETE /children/{id} berhasil → 204."""
    create_resp = _create_child(client, auth_headers)
    child_id = create_resp.json()["id"]

    response = client.delete(f"/children/{child_id}", headers=auth_headers)
    assert response.status_code == 204

    # Verifikasi sudah tidak ada
    get_resp = client.get(f"/children/{child_id}", headers=auth_headers)
    assert get_resp.status_code == 404


def test_delete_child_not_found(client, auth_headers):
    """Test DELETE /children/{id} yang tidak ada → 404."""
    response = client.delete("/children/99999", headers=auth_headers)
    assert response.status_code == 404


def test_child_requires_auth(client):
    """Test semua child endpoint membutuhkan autentikasi → 401."""
    assert client.get("/children").status_code == 401
    assert client.post("/children", json={}).status_code == 401
    assert client.get("/children/1").status_code == 401
    assert client.put("/children/1", json={}).status_code == 401
    assert client.delete("/children/1").status_code == 401


# ==================== ARTIKEL ENDPOINT ====================

def test_get_articles_empty(client):
    """Test GET /articles saat belum ada artikel → list kosong."""
    response = client.get("/articles")
    assert response.status_code == 200
    assert response.json() == []


def test_create_and_get_article(client, auth_headers):
    """Test POST /articles kemudian GET /articles/{id}."""
    create_resp = client.post("/articles", json={
        "title": "Panduan Imunisasi Anak",
        "content": "Imunisasi sangat penting untuk kesehatan anak.",
        "category": "kesehatan"
    }, headers=auth_headers)
    assert create_resp.status_code == 201
    article_id = create_resp.json()["id"]

    get_resp = client.get(f"/articles/{article_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["title"] == "Panduan Imunisasi Anak"


def test_get_article_not_found(client):
    """Test GET /articles/{id} yang tidak ada → 404."""
    response = client.get("/articles/99999")
    assert response.status_code == 404


def test_get_articles_pagination(client, auth_headers):
    """Test GET /articles?skip=0&limit=2 dengan pagination."""
    # Buat 3 artikel
    for i in range(3):
        client.post("/articles", json={
            "title": f"Artikel {i+1}",
            "content": f"Isi artikel {i+1}",
            "category": "umum"
        }, headers=auth_headers)

    response = client.get("/articles?skip=0&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert len(data) <= 2


def test_get_articles_by_category(client, auth_headers):
    """Test GET /articles/category/{category}."""
    client.post("/articles", json={
        "title": "Vaksinasi BCG",
        "content": "Info tentang vaksin BCG.",
        "category": "vaksinasi"
    }, headers=auth_headers)
    client.post("/articles", json={
        "title": "Tips Gizi",
        "content": "Tips gizi untuk anak.",
        "category": "gizi"
    }, headers=auth_headers)

    response = client.get("/articles/category/vaksinasi")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert all(a["category"] == "vaksinasi" for a in data)


# ==================== VACCINE & HEALTHCARE ENDPOINTS ====================

def test_get_all_vaccines(client):
    """Test GET /vaccines → 200."""
    response = client.get("/vaccines")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_all_healthcare_facilities(client):
    """Test GET /healthcare-facilities → 200."""
    response = client.get("/healthcare-facilities")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
