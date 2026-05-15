import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import engine, get_db, SessionLocal
from models import Base, User, Role, VaccineType
from schemas import (
    ItemCreate, ItemUpdate, ItemResponse, ItemListResponse,
    UserCreate, UserResponse, LoginRequest, TokenResponse,
    ChildCreate, ChildUpdate, ChildResponse,
    ImmunizationLogCreate, ImmunizationLogUpdate, ImmunizationLogResponse
)
from auth import create_access_token, get_current_user
import crud

load_dotenv()

# Buat semua tabel
Base.metadata.create_all(bind=engine)

# Initialize default roles
def init_default_roles():
    """Inisialisasi role default jika belum ada."""
    db = SessionLocal()
    try:
        # Cek apakah role sudah ada
        user_role = db.query(Role).filter(Role.name == "email").first()
        if not user_role:
            user_role = Role(name="user", description="Regular user")
            db.add(user_role)
        
        admin_role = db.query(Role).filter(Role.name == "admin").first()
        if not admin_role:
            admin_role = Role(name="admin", description="Administrator")
            db.add(admin_role)
        
        db.commit()
        print("[OK] Default roles initialized")
    except Exception as e:
        print(f"[ERROR] Error initializing roles: {e}")
        db.rollback()
    finally:
        db.close()

def init_default_vaccines():
    """Inisialisasi data vaksin default jika belum ada."""
    db = SessionLocal()
    try:
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
        
        for vac in default_vaccines:
            existing = db.query(VaccineType).filter(VaccineType.id == vac["id"]).first()
            if not existing:
                new_vac = VaccineType(id=vac["id"], name=vac["name"])
                db.add(new_vac)
        
        db.commit()
        print("[OK] Default vaccines initialized")
    except Exception as e:
        print(f"[ERROR] Error initializing vaccines: {e}")
        db.rollback()
    finally:
        db.close()

init_default_roles()
init_default_vaccines()

app = FastAPI(
    title="Cloud App API",
    description="REST API untuk mata kuliah Komputasi Awan — SI ITK",
    version="0.4.0",
)

# ==================== CORS (IMPROVED) ====================
# Baca dari environment atau gunakan default yang comprehensive untuk semua localhost variants
allowed_origins_str = os.getenv(
    "ALLOWED_ORIGINS", 
    "http://localhost:3000,http://localhost:8000,http://127.0.0.1:3000,http://127.0.0.1:8000,http://localhost:5173,http://127.0.0.1:5173"
)
origins_list = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

print(f"🔐 CORS Allowed Origins: {origins_list}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

print("✅ CORS middleware configured successfully")

# ==================== HEALTH CHECK ====================

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    """Health check endpoint — cek status semua komponen."""
    health = {
        "status": "healthy",
        "service": "backend",
        "version": "1.0.0",
    }
    
    # Cek database connection
    try:
        db.execute(text("SELECT 1"))
        health["database"] = "connected"
    except Exception as e:
        health["status"] = "unhealthy"
        health["database"] = f"error: {str(e)}"
    
    status_code = 200 if health["status"] == "healthy" else 503
    return JSONResponse(content=health, status_code=status_code)


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
    """Login biasa untuk frontend (menerima JSON body)."""
    user = crud.authenticate_user(db=db, email=login_data.email, password=login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Email atau password salah")

    token = create_access_token(data={"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }

@app.post("/auth/swagger-token", include_in_schema=False)
def swagger_login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Endpoint khusus untuk tombol Authorize/Lock di Swagger UI."""
    user = crud.authenticate_user(db=db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Email atau password salah")

    token = create_access_token(data={"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer"
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
    category: str = Query(None, description="Filter berdasarkan kategori, contoh: electronics, medical, office"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Ambil daftar items dengan filter opsional. **Membutuhkan autentikasi.**"""
    return crud.get_items(db=db, skip=skip, limit=limit, search=search, category=category)


@app.get("/items/stats")
def items_stats(db: Session = Depends(get_db)):
    """Statistik inventory."""
    return crud.get_items_stats(db=db)


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

@app.post("/children", status_code=201, response_model=ChildResponse)
def create_child(
    child_data: ChildCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Buat profil anak baru untuk parent yang sedang login."""
    return crud.create_child(db=db, child_data=child_data, parent_id=current_user.id)


@app.get("/children", response_model=list[ChildResponse])
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


@app.put("/children/{child_id}", response_model=ChildResponse)
def update_child(
    child_id: int,
    child_data: ChildUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update profil anak. Hanya field yang dikirim yang akan diubah."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    return crud.update_child(db=db, child_id=child_id, child_data=child_data.model_dump(exclude_unset=True))


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

@app.post("/children/{child_id}/immunization", status_code=201, response_model=ImmunizationLogResponse)
def create_immunization_log(
    child_id: int,
    log_data: ImmunizationLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Catat vaksinasi untuk seorang anak."""
    child = crud.get_child(db=db, child_id=child_id)
    if not child:
        raise HTTPException(status_code=404, detail="Anak tidak ditemukan")
    if child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Tidak berhak mengakses data anak ini")
    
    try:
        log_dict = log_data.model_dump(exclude_unset=True)
        log_dict["child_id"] = child_id
        result = crud.create_immunization_log(db=db, log_data=log_dict)
        print(f"✅ Immunization log created: child_id={child_id}, vaccine_id={log_data.vaccine_id}")
        return result
    except Exception as e:
        print(f"❌ Error creating immunization log: {e}")
        raise HTTPException(status_code=500, detail=f"Gagal membuat catatan imunisasi: {str(e)}")


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


@app.put("/immunization/{log_id}", response_model=ImmunizationLogResponse)
def update_immunization_log(
    log_id: int,
    log_data: ImmunizationLogUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update catatan vaksinasi (e.g., ubah status ke completed)."""
    log = crud.get_immunization_log(db=db, log_id=log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Catatan vaksinasi tidak ditemukan")
    
    return crud.update_immunization_log(db=db, log_id=log_id, log_data=log_data.model_dump(exclude_unset=True))


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