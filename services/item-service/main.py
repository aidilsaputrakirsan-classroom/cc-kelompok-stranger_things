"""
Item Service — Handles inventory management.
Berkomunikasi dengan Auth Service untuk verifikasi token.
"""
import os
import logging  # ← TAMBAHKAN INI
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import engine, get_db, Base
from models import Item, Child, ImmunizationLog
from schemas import (
    ItemCreate, ItemUpdate, ItemResponse, ItemListResponse, ItemStatsResponse,
    ChildCreate, ChildResponse, ChildListResponse,
    ImmunizationLogCreate, ImmunizationLogResponse, ImmunizationListResponse
)
from auth_client import verify_token_with_auth_service
from auth_client import auth_circuit  # Import circuit breaker instance

from logging_config import setup_logging
from logging_middleware import RequestLoggingMiddleware
from metrics import metrics

setup_logging()
logger = logging.getLogger(__name__)

# Create tables
Base.metadata.create_all(bind=engine)

def init_default_vaccines():
    from database import SessionLocal
    from models import VaccineType
    from sqlalchemy import text
    
    db = SessionLocal()
    try:
        if db.query(VaccineType).count() > 0:
            return
            
        default_vaccines = [
            {"id": 1, "name": "BCG (TBC)"},
            {"id": 2, "name": "Hepatitis B"},
            {"id": 3, "name": "DPT (Difteri, Pertusis, Tetanus)"},
            {"id": 4, "name": "Polio"},
            {"id": 5, "name": "Hib"},
            {"id": 6, "name": "Campak"},
            {"id": 7, "name": "MMR"},
            {"id": 8, "name": "Influenza"},
            {"id": 9, "name": "Pneumokokus (PCV)"},
            {"id": 10, "name": "Rotavirus"},
            {"id": 11, "name": "Varicella (Cacar Air)"},
            {"id": 12, "name": "Hepatitis A"},
            {"id": 13, "name": "Tifoid"},
            {"id": 14, "name": "Japanese Encephalitis (JE)"},
            {"id": 15, "name": "Dengue"},
        ]
        
        try:
            db.execute(text("ALTER SEQUENCE vaccine_types_id_seq RESTART WITH 1"))
        except:
            pass
            
        for vac in default_vaccines:
            new_vac = VaccineType(id=vac["id"], name=vac["name"])
            db.add(new_vac)
        
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"[WARN] Failed to initialize vaccines: {e}")
    finally:
        db.close()

init_default_vaccines()

app = FastAPI(
    title="Item Service",
    description="Inventory microservice — CRUD items with auth via Auth Service",
    version="2.0.0",
)

# CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RequestLoggingMiddleware)

# =====================
# ENDPOINTS
# =====================

@app.get("/health")
async def health_check():
    """Health check dengan dependency status."""
    # Mengambil status Circuit Breaker dari Auth Service
    auth_status = auth_circuit.get_status()

    # Memeriksa koneksi ke database secara langsung
    db_status = "connected"
    try:
        db = next(get_db())
        db.execute(text("SELECT 1"))
        db.close()
    except Exception as e:
        import traceback
        print(f"HEALTHCHECK DB ERROR: {e}")
        traceback.print_exc()
        db_status = "disconnected"

    # Menentukan status kesehatan sistem keseluruhan
    overall = "healthy"
    if auth_status["state"] != "CLOSED":
        overall = "degraded"
    if db_status != "connected":
        overall = "unhealthy"

    return {
        "status": overall,
        "service": "item-service",
        "version": "2.1.0",
        "dependencies": {
            "auth-service": {
                "status": "available" if auth_status["state"] == "CLOSED" else "unavailable",
                "circuit_breaker": auth_status,
            },
            "database": {
                "status": db_status,
            },
        },
    }


@app.get("/metrics")
def get_metrics():
    """Return application metrics."""
    return {
        "service": "item-service",
        **metrics.get_metrics(),
    }

@app.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(
    item_data: ItemCreate,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Buat item baru — requires authentication."""
    item = Item(
        **item_data.model_dump(),
        owner_id=user["user_id"],
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@app.get("/items", response_model=ItemListResponse)
async def get_items(
    search: str = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Ambil daftar items milik user yang login."""
    query = db.query(Item).filter(Item.owner_id == user["user_id"])
    if search:
        query = query.filter(Item.name.ilike(f"%{search}%"))
    total = query.count()
    items = query.offset(skip).limit(limit).all()
    return ItemListResponse(total=total, items=items)


@app.get("/items/stats", response_model=ItemStatsResponse)
async def items_stats(
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Statistik inventory milik user yang login."""
    items = db.query(Item).filter(Item.owner_id == user["user_id"]).all()
    
    total_items = sum(item.quantity for item in items)
    total_value = sum(item.price * item.quantity for item in items)
    
    most_expensive = max(items, key=lambda i: i.price, default=None)
    cheapest = min(items, key=lambda i: i.price, default=None)
    
    return ItemStatsResponse(
        total_items=total_items,
        total_value=total_value,
        most_expensive=most_expensive,
        cheapest=cheapest,
    )


@app.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(
    item_id: int,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Ambil item by ID."""
    item = db.query(Item).filter(
        Item.id == item_id, Item.owner_id == user["user_id"]
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.put("/items/{item_id}", response_model=ItemResponse)
async def update_item(
    item_id: int,
    update_data: ItemUpdate,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Update item."""
    item = db.query(Item).filter(
        Item.id == item_id, Item.owner_id == user["user_id"]
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    for field, value in update_data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@app.delete("/items/{item_id}", status_code=204)
async def delete_item(
    item_id: int, 
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Hapus item."""
    item = db.query(Item).filter(
        Item.id == item_id, Item.owner_id == user["user_id"]
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()


# ==================== CHILD ENDPOINTS ====================

@app.post("/children", status_code=201, response_model=ChildResponse)
async def create_child(
    child_data: ChildCreate,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Buat profil anak baru untuk parent yang sedang login."""
    db_child = Child(
        parent_id=user["user_id"],
        name=child_data.name,
        birth_date=child_data.birth_date,
        gender=child_data.gender,
        blood_type=child_data.blood_type,
        height=child_data.height,
        weight=child_data.weight,
        notes=child_data.notes
    )
    db.add(db_child)
    db.commit()
    db.refresh(db_child)
    return db_child


@app.get("/children", response_model=ChildListResponse)
async def get_user_children(
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Ambil daftar anak (Parent: anak sendiri, Midwife: semua anak)."""
    if user.get("role") == "midwife":
        children = db.query(Child).all()
    else:
        children = db.query(Child).filter(Child.parent_id == user["user_id"]).all()
    return ChildListResponse(total=len(children), children=children)


@app.get("/children/{child_id}", response_model=ChildResponse)
async def get_child(
    child_id: int,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Ambil detail anak berdasarkan ID."""
    if user.get("role") == "midwife":
        child = db.query(Child).filter(Child.id == child_id).first()
    else:
        child = db.query(Child).filter(
            Child.id == child_id, Child.parent_id == user["user_id"]
        ).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    return child


@app.put("/children/{child_id}", response_model=ChildResponse)
async def update_child(
    child_id: int,
    child_data: ChildCreate,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Update data anak."""
    if user.get("role") == "midwife":
        child = db.query(Child).filter(Child.id == child_id).first()
    else:
        child = db.query(Child).filter(
            Child.id == child_id, Child.parent_id == user["user_id"]
        ).first()
        
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    
    child.name = child_data.name
    child.birth_date = child_data.birth_date
    child.gender = child_data.gender
    child.blood_type = child_data.blood_type
    child.height = child_data.height
    child.weight = child_data.weight
    child.notes = child_data.notes
    
    db.commit()
    db.refresh(child)
    return child


@app.delete("/children/{child_id}", status_code=204)
async def delete_child(
    child_id: int,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Hapus data anak."""
    child = db.query(Child).filter(
        Child.id == child_id, Child.parent_id == user["user_id"]
    ).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    db.delete(child)
    db.commit()


# ==================== IMMUNIZATION ENDPOINTS ====================

@app.post("/children/{child_id}/immunization", status_code=201, response_model=ImmunizationLogResponse)
async def create_immunization(
    child_id: int,
    immun_data: ImmunizationLogCreate,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Buat immunization log untuk anak."""
    # Verify the child belongs to the user OR user is a midwife
    if user.get("role") == "midwife":
        child = db.query(Child).filter(Child.id == child_id).first()
    else:
        child = db.query(Child).filter(
            Child.id == child_id, Child.parent_id == user["user_id"]
        ).first()
        
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    
    db_immunization = ImmunizationLog(
        child_id=child_id,
        vaccine_id=immun_data.vaccine_id,
        status=immun_data.status,
        scheduled_date=immun_data.scheduled_date,
        notes=immun_data.notes
    )
    db.add(db_immunization)
    db.commit()
    db.refresh(db_immunization)
    return db_immunization


@app.get("/children/{child_id}/immunization", response_model=ImmunizationListResponse)
async def get_child_immunizations(
    child_id: int,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Ambil daftar immunization logs untuk anak."""
    # Verify the child belongs to the user OR user is midwife
    if user.get("role") == "midwife":
        child = db.query(Child).filter(Child.id == child_id).first()
    else:
        child = db.query(Child).filter(
            Child.id == child_id, Child.parent_id == user["user_id"]
        ).first()
        
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    
    immunizations = db.query(ImmunizationLog).filter(
        ImmunizationLog.child_id == child_id
    ).all()
    return ImmunizationListResponse(total=len(immunizations), immunizations=immunizations)


@app.get("/children/{child_id}/immunization/pending", response_model=ImmunizationListResponse)
async def get_pending_immunizations(
    child_id: int,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Ambil daftar immunization yang pending untuk anak."""
    # Verify the child belongs to the user OR user is midwife
    if user.get("role") == "midwife":
        child = db.query(Child).filter(Child.id == child_id).first()
    else:
        child = db.query(Child).filter(
            Child.id == child_id, Child.parent_id == user["user_id"]
        ).first()
        
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    
    immunizations = db.query(ImmunizationLog).filter(
        ImmunizationLog.child_id == child_id,
        ImmunizationLog.status == "pending"
    ).all()
    return ImmunizationListResponse(total=len(immunizations), immunizations=immunizations)

@app.put("/children/{child_id}/immunization/{immun_id}", response_model=ImmunizationLogResponse)
async def update_immunization(
    child_id: int,
    immun_id: int,
    immun_data: ImmunizationLogCreate,
    user: dict = Depends(verify_token_with_auth_service),
    db: Session = Depends(get_db),
):
    """Update status immunization (khusus untuk Bidan/Parent yang sah)."""
    if user.get("role") == "midwife":
        child = db.query(Child).filter(Child.id == child_id).first()
    else:
        child = db.query(Child).filter(
            Child.id == child_id, Child.parent_id == user["user_id"]
        ).first()
        
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
        
    immunization = db.query(ImmunizationLog).filter(
        ImmunizationLog.id == immun_id,
        ImmunizationLog.child_id == child_id
    ).first()
    
    if not immunization:
        raise HTTPException(status_code=404, detail="Immunization not found")
        
    immunization.vaccine_id = immun_data.vaccine_id
    immunization.status = immun_data.status
    immunization.scheduled_date = immun_data.scheduled_date
    immunization.notes = immun_data.notes
    
    db.commit()
    db.refresh(immunization)
    return immunization