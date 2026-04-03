from sqlalchemy.orm import Session
from sqlalchemy import or_, asc, desc
from models import Item, User
from schemas import ItemCreate, ItemUpdate, UserCreate
from auth import hash_password, verify_password
from sqlalchemy import func

def create_item(db: Session, item_data: ItemCreate) -> Item:
    """Buat item baru di database."""
    db_item = Item(**item_data.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items(
    db: Session,
    skip: int = 0,
    limit: int = 20,
    search: str = None,
    sort_by: str = "created_at",
    sort_dir: str = "desc",
):
    """
    Ambil daftar items dengan pagination, search, dan sorting.
    
    - skip: jumlah data yang di-skip
    - limit: jumlah data per halaman
    - search: kata kunci untuk nama/deskripsi
    - sort_by: kolom untuk sorting ("name", "price", "created_at")
    - sort_dir: arah sorting ("asc" atau "desc")
    """
    query = db.query(Item)

    if search:
        query = query.filter(
            or_(
                Item.name.ilike(f"%{search}%"),
                Item.description.ilike(f"%{search}%"),
            )
        )

    # Tentukan kolom sorting
    order_column = {
        "name": Item.name,
        "price": Item.price,
        "created_at": Item.created_at,
    }.get(sort_by, Item.created_at)

    # Terapkan ascending / descending
    if sort_dir == "asc":
        query = query.order_by(asc(order_column))
    else:
        query = query.order_by(desc(order_column))

    total = query.count()
    items = query.offset(skip).limit(limit).all()

    return {"total": total, "items": items}


def get_item(db: Session, item_id: int) -> Item | None:
    """Ambil satu item berdasarkan ID."""
    return db.query(Item).filter(Item.id == item_id).first()


def update_item(db: Session, item_id: int, item_data: ItemUpdate) -> Item | None:
    """
    Update item berdasarkan ID.
    Hanya field yang dikirim (exclude unset) akan di-update.
    """
    db_item = db.query(Item).filter(Item.id == item_id).first()

    if not db_item:
        return None

    update_data = item_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)

    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int) -> bool:
    """Hapus item berdasarkan ID. Return True jika berhasil."""
    db_item = db.query(Item).filter(Item.id == item_id).first()

    if not db_item:
        return False

    db.delete(db_item)
    db.commit()
    return True

def create_user(db: Session, user_data: UserCreate) -> User:
    """Buat user baru dengan password yang di-hash."""
    # Cek apakah email sudah terdaftar
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        return None  # Email sudah dipakai

    db_user = User(
        email=user_data.email,
        name=user_data.name,
        hashed_password=hash_password(user_data.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    """Autentikasi user: cek email & password."""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def get_items_stats(db: Session) -> dict:
    """Hitung statistik items."""
    items = db.query(Item).all()
    
    if not items:
        return {
            "total_items": 0,
            "avg_price": 0.0,
            "total_quantity": 0,
            "total_value": 0.0,
        }
    
    total_items = len(items)
    avg_price = sum(item.price for item in items) / total_items
    total_quantity = sum(item.quantity for item in items)
    total_value = sum(item.price * item.quantity for item in items)
    
    return {
        "total_items": total_items,
        "avg_price": round(avg_price, 2),
        "total_quantity": total_quantity,
        "total_value": round(total_value, 2),
    }


# ==================== CHILD CRUD ====================

def create_child(db: Session, child_data: dict, parent_id: int):
    """Buat profil anak untuk parent."""
    from models import Child
    db_child = Child(
        parent_id=parent_id,
        name=child_data.get("name"),
        birth_date=child_data.get("birth_date"),
        gender=child_data.get("gender"),
        blood_type=child_data.get("blood_type")
    )
    db.add(db_child)
    db.commit()
    db.refresh(db_child)
    return db_child


def get_child(db: Session, child_id: int):
    """Ambil anak berdasarkan ID."""
    from models import Child
    return db.query(Child).filter(Child.id == child_id).first()


def get_children_by_parent(db: Session, parent_id: int):
    """Ambil semua anak untuk seorang parent."""
    from models import Child
    return db.query(Child).filter(Child.parent_id == parent_id).all()


def update_child(db: Session, child_id: int, child_data: dict):
    """Update profil anak."""
    db_child = get_child(db, child_id)
    if db_child:
        for key, value in child_data.items():
            if value is not None:
                setattr(db_child, key, value)
        db.commit()
        db.refresh(db_child)
    return db_child


def delete_child(db: Session, child_id: int) -> bool:
    """Hapus profil anak."""
    db_child = get_child(db, child_id)
    if db_child:
        db.delete(db_child)
        db.commit()
        return True
    return False


# ==================== IMMUNIZATION CRUD ====================

def create_immunization_log(db: Session, log_data: dict):
    """Buat catatan vaksinasi."""
    from models import ImmunizationLog
    db_log = ImmunizationLog(
        child_id=log_data.get("child_id"),
        vaccine_id=log_data.get("vaccine_id"),
        facility_id=log_data.get("facility_id"),
        immunization_date=log_data.get("immunization_date"),
        status=log_data.get("status", "pending"),
        notes=log_data.get("notes")
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


def get_immunization_log(db: Session, log_id: int):
    """Ambil catatan vaksinasi berdasarkan ID."""
    from models import ImmunizationLog
    return db.query(ImmunizationLog).filter(ImmunizationLog.id == log_id).first()


def get_immunization_logs_by_child(db: Session, child_id: int):
    """Ambil semua catatan vaksinasi untuk seorang anak."""
    from models import ImmunizationLog
    return db.query(ImmunizationLog).filter(ImmunizationLog.child_id == child_id).all()


def update_immunization_log(db: Session, log_id: int, log_data: dict):
    """Update catatan vaksinasi."""
    db_log = get_immunization_log(db, log_id)
    if db_log:
        for key, value in log_data.items():
            if value is not None:
                setattr(db_log, key, value)
        db.commit()
        db.refresh(db_log)
    return db_log


def get_pending_immunizations(db: Session, child_id: int):
    """Ambil vaksinasi yang pending untuk seorang anak."""
    from models import ImmunizationLog
    return db.query(ImmunizationLog).filter(
        ImmunizationLog.child_id == child_id,
        ImmunizationLog.status == "pending"
    ).all()


def delete_immunization_log(db: Session, log_id: int) -> bool:
    """Hapus catatan vaksinasi."""
    db_log = get_immunization_log(db, log_id)
    if db_log:
        db.delete(db_log)
        db.commit()
        return True
    return False


# ==================== GROWTH RECORD CRUD ====================

def create_growth_record(db: Session, record_data: dict):
    """Buat catatan pertumbuhan anak."""
    from models import GrowthRecord
    db_record = GrowthRecord(
        child_id=record_data.get("child_id"),
        height=record_data.get("height"),
        weight=record_data.get("weight"),
        measurement_date=record_data.get("measurement_date"),
        head_circumference=record_data.get("head_circumference"),
        notes=record_data.get("notes")
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def get_growth_record(db: Session, record_id: int):
    """Ambil catatan pertumbuhan berdasarkan ID."""
    from models import GrowthRecord
    return db.query(GrowthRecord).filter(GrowthRecord.id == record_id).first()


def get_growth_records_by_child(db: Session, child_id: int):
    """Ambil semua catatan pertumbuhan untuk seorang anak."""
    from models import GrowthRecord
    return db.query(GrowthRecord).filter(
        GrowthRecord.child_id == child_id
    ).order_by(GrowthRecord.measurement_date.desc()).all()


def get_latest_growth_record(db: Session, child_id: int):
    """Ambil catatan pertumbuhan terbaru untuk seorang anak."""
    from models import GrowthRecord
    return db.query(GrowthRecord).filter(
        GrowthRecord.child_id == child_id
    ).order_by(GrowthRecord.measurement_date.desc()).first()


def update_growth_record(db: Session, record_id: int, record_data: dict):
    """Update catatan pertumbuhan."""
    db_record = get_growth_record(db, record_id)
    if db_record:
        for key, value in record_data.items():
            if value is not None:
                setattr(db_record, key, value)
        db.commit()
        db.refresh(db_record)
    return db_record


def delete_growth_record(db: Session, record_id: int) -> bool:
    """Hapus catatan pertumbuhan."""
    db_record = get_growth_record(db, record_id)
    if db_record:
        db.delete(db_record)
        db.commit()
        return True
    return False


# ==================== VACCINE CRUD ====================

def get_vaccine(db: Session, vaccine_id: int):
    """Ambil vaksin berdasarkan ID."""
    from models import VaccineType
    return db.query(VaccineType).filter(VaccineType.id == vaccine_id).first()


def get_all_vaccines(db: Session):
    """Ambil semua vaksin."""
    from models import VaccineType
    return db.query(VaccineType).all()


def get_vaccine_schedules_by_age(db: Session, age_months: int):
    """Ambil jadwal vaksin yang disarankan untuk usia tertentu (dalam bulan)."""
    from models import VaccineSchedule
    return db.query(VaccineSchedule).filter(
        VaccineSchedule.age_months_min <= age_months,
        VaccineSchedule.age_months_max >= age_months
    ).all()


# ==================== HEALTHCARE FACILITY CRUD ====================

def create_healthcare_facility(db: Session, facility_data: dict):
    """Buat fasilitas kesehatan."""
    from models import HealthcareFacility
    db_facility = HealthcareFacility(**facility_data)
    db.add(db_facility)
    db.commit()
    db.refresh(db_facility)
    return db_facility


def get_healthcare_facility(db: Session, facility_id: int):
    """Ambil fasilitas kesehatan berdasarkan ID."""
    from models import HealthcareFacility
    return db.query(HealthcareFacility).filter(HealthcareFacility.id == facility_id).first()


def get_all_healthcare_facilities(db: Session):
    """Ambil semua fasilitas kesehatan."""
    from models import HealthcareFacility
    return db.query(HealthcareFacility).all()


def get_facilities_by_type(db: Session, facility_type: str):
    """Ambil fasilitas berdasarkan tipe (puskesmas, klinik, rumah_sakit)."""
    from models import HealthcareFacility
    return db.query(HealthcareFacility).filter(
        HealthcareFacility.facility_type == facility_type
    ).all()


def update_healthcare_facility(db: Session, facility_id: int, facility_data: dict):
    """Update fasilitas kesehatan."""
    db_facility = get_healthcare_facility(db, facility_id)
    if db_facility:
        for key, value in facility_data.items():
            if value is not None:
                setattr(db_facility, key, value)
        db.commit()
        db.refresh(db_facility)
    return db_facility


# ==================== ARTICLE CRUD ====================

def create_article(db: Session, article_data: dict, author_id: int):
    """Buat artikel edukasi."""
    from models import Article
    db_article = Article(
        author_id=author_id,
        title=article_data.get("title"),
        content=article_data.get("content"),
        category=article_data.get("category")
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article


def get_article(db: Session, article_id: int):
    """Ambil artikel berdasarkan ID."""
    from models import Article
    return db.query(Article).filter(Article.id == article_id).first()


def get_all_articles(db: Session, skip: int = 0, limit: int = 10):
    """Ambil semua artikel dengan pagination."""
    from models import Article
    return db.query(Article).offset(skip).limit(limit).all()


def get_articles_by_category(db: Session, category: str):
    """Ambil artikel berdasarkan kategori."""
    from models import Article
    return db.query(Article).filter(Article.category == category).all()


def update_article(db: Session, article_id: int, article_data: dict):
    """Update artikel."""
    db_article = get_article(db, article_id)
    if db_article:
        for key, value in article_data.items():
            if value is not None:
                setattr(db_article, key, value)
        db.commit()
        db.refresh(db_article)
    return db_article


def delete_article(db: Session, article_id: int) -> bool:
    """Hapus artikel."""
    db_article = get_article(db, article_id)
    if db_article:
        db.delete(db_article)
        db.commit()
        return True
    return False