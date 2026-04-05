import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, User
from schemas import (
    ItemCreate, ItemUpdate, ItemResponse, ItemListResponse,
    UserCreate, UserResponse, LoginRequest, TokenResponse,
)
from auth import create_access_token, get_current_user
import crud

load_dotenv()

# Buat semua tabel
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Cloud App API",
    description="REST API untuk mata kuliah Komputasi Awan — SI ITK",
    version="0.4.0",
)

# ==================== CORS (FIXED) ====================
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
origins_list = [origin.strip() for origin in allowed_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== HEALTH CHECK ====================

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "0.4.0"}


# ==================== AUTH ENDPOINTS (PUBLIC) ====================

@app.post("/auth/register", response_model=UserResponse, status_code=201)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Registrasi user baru dengan validasi email dan password."""
    user = crud.create_user(db=db, user_data=user_data)
    if not user:
        raise HTTPException(
            status_code=400, 
            detail="Email sudah terdaftar. Gunakan email lain untuk registrasi."
        )
    return user


@app.post("/auth/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db=db, email=login_data.email, password=login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Email atau password salah")

    token = create_access_token(data={"sub": str(user.id)})  # ← Tambah str()
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }


@app.get("/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Ambil profil user yang sedang login."""
    return current_user


# ==================== ITEM ENDPOINTS (PROTECTED) ====================

@app.post("/items", response_model=ItemResponse, status_code=201)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Buat item baru. **Membutuhkan autentikasi.**"""
    return crud.create_item(db=db, item_data=item)


@app.get("/items", response_model=ItemListResponse)
def list_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    search: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil daftar items. **Membutuhkan autentikasi.**"""
    return crud.get_items(db=db, skip=skip, limit=limit, search=search)


@app.get("/items/{item_id}", response_model=ItemResponse)
def get_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil satu item. **Membutuhkan autentikasi.**"""
    item = crud.get_item(db=db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Item {item_id} tidak ditemukan")
    return item


@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(
    item_id: int,
    item: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update item. **Membutuhkan autentikasi.**"""
    updated = crud.update_item(db=db, item_id=item_id, item_data=item)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Item {item_id} tidak ditemukan")
    return updated


@app.delete("/items/{item_id}", status_code=204)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Hapus item. **Membutuhkan autentikasi.**"""
    success = crud.delete_item(db=db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Item {item_id} tidak ditemukan")
    return None




# ==================== CHILD ENDPOINTS ====================

@app.post("/children", status_code=201)
def create_child(
    child_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Buat profil anak baru untuk parent yang sedang login."""
    return crud.create_child(db=db, child_data=child_data, parent_id=current_user.id)


@app.get("/children")
def get_user_children(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil semua anak untuk parent yang sedang login."""
    return crud.get_children_by_parent(db=db, parent_id=current_user.id)


@app.get("/children/{child_id}")
def get_child(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil detail anak tertentu. Hanya parent dari anak tersebut yang bisa akses."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    return child


@app.put("/children/{child_id}")
def update_child(
    child_id: int,
    child_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update profil anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    return crud.update_child(db=db, child_id=child_id, child_data=child_data)


@app.delete("/children/{child_id}", status_code=204)
def delete_child(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Hapus profil anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    crud.delete_child(db=db, child_id=child_id)
    return None


# ==================== IMMUNIZATION ENDPOINTS ====================

@app.post("/children/{child_id}/immunization", status_code=201)
def create_immunization_log(
    child_id: int,
    log_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Catat vaksinasi untuk seorang anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    log_data["child_id"] = child_id
    return crud.create_immunization_log(db=db, log_data=log_data)


@app.get("/children/{child_id}/immunization")
def get_child_immunization_records(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil semua catatan vaksinasi untuk seorang anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    return crud.get_immunization_logs_by_child(db=db, child_id=child_id)


@app.get("/children/{child_id}/immunization/pending")
def get_pending_immunizations(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil vaksinasi yang masih pending untuk seorang anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    return crud.get_pending_immunizations(db=db, child_id=child_id)


@app.put("/immunization/{log_id}")
def update_immunization_log(
    log_id: int,
    log_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update catatan vaksinasi (e.g., ubah status ke completed)."""
    log = crud.get_immunization_log(db=db, log_id=log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Catatan vaksinasi tidak ditemukan")
    
    return crud.update_immunization_log(db=db, log_id=log_id, log_data=log_data)


# ==================== GROWTH RECORD ENDPOINTS ====================

@app.post("/children/{child_id}/growth", status_code=201)
def create_growth_record(
    child_id: int,
    record_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Catat pengukuran pertumbuhan anak (tinggi, berat badan)."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    record_data["child_id"] = child_id
    return crud.create_growth_record(db=db, record_data=record_data)


@app.get("/children/{child_id}/growth")
def get_child_growth_records(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil semua catatan pertumbuhan untuk seorang anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    return crud.get_growth_records_by_child(db=db, child_id=child_id)


@app.get("/children/{child_id}/growth/latest")
def get_latest_growth_record(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil catatan pertumbuhan terbaru untuk seorang anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    return crud.get_latest_growth_record(db=db, child_id=child_id)


# ==================== VACCINE ENDPOINTS ====================

@app.get("/vaccines")
def get_all_vaccines(db: Session = Depends(get_db)):
    """Ambil daftar semua vaksin yang tersedia."""
    return crud.get_all_vaccines(db=db)


@app.get("/vaccines/schedule")
def get_vaccine_schedule(
    age_months: int = Query(..., ge=0, le=60, description="Usia anak dalam bulan"),
    db: Session = Depends(get_db),
):
    """Ambil jadwal vaksin yang disarankan untuk usia tertentu."""
    return crud.get_vaccine_schedules_by_age(db=db, age_months=age_months)


# ==================== HEALTHCARE FACILITY ENDPOINTS ====================

@app.get("/healthcare-facilities")
def get_all_healthcare_facilities(db: Session = Depends(get_db)):
    """Ambil daftar semua fasilitas kesehatan."""
    return crud.get_all_healthcare_facilities(db=db)


@app.get("/healthcare-facilities/type/{facility_type}")
def get_facilities_by_type(
    facility_type: str = Path(..., description="Tipe fasilitas: puskesmas, klinik, rumah_sakit"),
    db: Session = Depends(get_db),
):
    """Ambil fasilitas kesehatan berdasarkan tipe."""
    return crud.get_facilities_by_type(db=db, facility_type=facility_type)


# ==================== ARTICLE ENDPOINTS ====================

@app.post("/articles", status_code=201)
def create_article(
    article_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Buat artikel edukasi. Hanya untuk health workers atau admin."""
    return crud.create_article(db=db, article_data=article_data, author_id=current_user.id)


@app.get("/articles")
def get_all_articles(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Ambil daftar artikel dengan pagination."""
    return crud.get_all_articles(db=db, skip=skip, limit=limit)


@app.get("/articles/category/{category}")
def get_articles_by_category(
    category: str,
    db: Session = Depends(get_db),
):
    """Ambil artikel berdasarkan kategori."""
    return crud.get_articles_by_category(db=db, category=category)


@app.get("/articles/{article_id}")
def get_article(
    article_id: int,
    db: Session = Depends(get_db),
):
    """Ambil detail artikel tertentu."""
    article = crud.get_article(db=db, article_id=article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    return article


@app.put("/articles/{article_id}")
def update_article(
    article_id: int,
    article_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update artikel. Hanya author yang bisa update."""
    article = crud.get_article(db=db, article_id=article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    if article.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Hanya author yang bisa update artikel")
    
    return crud.update_article(db=db, article_id=article_id, article_data=article_data)


@app.delete("/articles/{article_id}", status_code=204)
def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Hapus artikel. Hanya author yang bisa hapus."""
    article = crud.get_article(db=db, article_id=article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    if article.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Hanya author yang bisa delete artikel")
    
    crud.delete_article(db=db, article_id=article_id)
    return None


# ==================== TEAM INFO ====================

@app.get("/team")
def team_info():
    return {
        "team": "cloud-team-stranger_things",
        "members": [
            {"name": "Ahmad Daffa Alfattah", "nim": "10231008", "role": "Lead BackEnd"},
            {"name": "Nazwa Amelia Zahra", "nim": "10231068", "role": "Lead Frontend"},
            {"name": "Cintya ", "nim": "10231026", "role": "Lead Devops"},
            {"name": "Verina Rahma Dinah", "nim": "10231090", "role": "Lead QA & Docs"},
        ],
    }