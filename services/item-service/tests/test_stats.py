"""Modul test_stats.py untuk Item Service."""
import pytest
from fastapi.testclient import TestClient
import os

# Force SQLite in-memory for tests before importing main
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from main import app
from database import engine, Base, get_db
from models import Item
from auth_client import verify_token_with_auth_service
from sqlalchemy.orm import sessionmaker

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Override dependencies
app.dependency_overrides[get_db] = override_get_db

async def mock_verify_token():
    return {"user_id": 1, "email": "test@example.com", "name": "Test User"}

app.dependency_overrides[verify_token_with_auth_service] = mock_verify_token

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_items_stats_empty():
    response = client.get("/items/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_items"] == 0
    assert data["total_value"] == 0.0
    assert data["most_expensive"] is None
    assert data["cheapest"] is None

def test_items_stats_with_data():
    db = TestingSessionLocal()
    
    # Items for user 1
    item1 = Item(name="Item 1", price=100.0, quantity=2, owner_id=1)
    item2 = Item(name="Item 2", price=50.0, quantity=5, owner_id=1)
    item3 = Item(name="Item 3", price=200.0, quantity=1, owner_id=1)
    
    # Item for another user (should be ignored in stats)
    item4 = Item(name="Item 4", price=1000.0, quantity=10, owner_id=2)
    
    db.add_all([item1, item2, item3, item4])
    db.commit()
    db.close()

    response = client.get("/items/stats")
    assert response.status_code == 200
    data = response.json()
    
    assert data["total_items"] == 8  # 2 + 5 + 1
    assert data["total_value"] == 650.0  # (100*2) + (50*5) + (200*1) = 200 + 250 + 200 = 650
    assert data["most_expensive"]["name"] == "Item 3"
    assert data["most_expensive"]["price"] == 200.0
    assert data["cheapest"]["name"] == "Item 2"
    assert data["cheapest"]["price"] == 50.0
