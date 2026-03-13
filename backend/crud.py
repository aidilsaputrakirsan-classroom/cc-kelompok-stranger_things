from sqlalchemy.orm import Session
from sqlalchemy import or_, asc, desc
from models import Item
from schemas import ItemCreate, ItemUpdate


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