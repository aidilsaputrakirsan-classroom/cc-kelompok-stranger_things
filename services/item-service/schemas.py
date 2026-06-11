"""Pydantic schemas for Item Service."""
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import date, datetime


class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    quantity: Optional[int] = 0

    @field_validator("name")
    @classmethod
    def validate_name(cls, v):
        if len(v.strip()) < 1:
            raise ValueError("Nama item tidak boleh kosong")
        if len(v) > 300:
            raise ValueError("Nama item maksimal 300 karakter")
        return v.strip()

    @field_validator("description")
    @classmethod
    def validate_description(cls, v):
        if v and len(v) > 2000:
            raise ValueError("Deskripsi maksimal 2000 karakter")
        return v

    @field_validator("price")
    @classmethod
    def validate_price(cls, v):
        if v < 0:
            raise ValueError("Harga tidak boleh negatif")
        if v > 999_999_999:
            raise ValueError("Harga terlalu besar")
        return round(v, 2)

    @field_validator("quantity")
    @classmethod
    def validate_quantity(cls, v):
        if v is not None and v < 0:
            raise ValueError("Quantity tidak boleh negatif")
        if v is not None and v > 999_999:
            raise ValueError("Quantity terlalu besar")
        return v


class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None


class ItemResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    quantity: int
    owner_id: int

    class Config:
        from_attributes = True


class ItemListResponse(BaseModel):
    total: int
    items: list[ItemResponse]


class ItemStatsResponse(BaseModel):
    total_items: int
    total_value: float
    most_expensive: Optional[ItemResponse] = None
    cheapest: Optional[ItemResponse] = None


# ==================== CHILD SCHEMAS ====================

class ChildCreate(BaseModel):
    """Schema untuk membuat data anak baru."""
    name: str = Field(..., min_length=1, max_length=100, title="Nama Anak")
    birth_date: date = Field(..., title="Tanggal Lahir", description="Format: YYYY-MM-DD")
    gender: str = Field(..., title="Jenis Kelamin", description="Isi dengan: male atau female")
    blood_type: Optional[str] = Field(None, title="Golongan Darah", description="Contoh: A, B, AB, O")
    height: Optional[float] = Field(None, title="Tinggi Badan (cm)")
    weight: Optional[float] = Field(None, title="Berat Badan (kg)")
    notes: Optional[str] = Field(None, title="Catatan Khusus")

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v):
        allowed = {"male", "female"}
        if v.lower() not in allowed:
            raise ValueError("Gender harus 'male' atau 'female'")
        return v.lower()


class ChildResponse(BaseModel):
    """Schema untuk response data anak."""
    id: int
    parent_id: int
    name: str
    birth_date: date
    gender: str
    blood_type: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    notes: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True


class ChildListResponse(BaseModel):
    """Schema untuk list data anak."""
    total: int
    children: list[ChildResponse]


# ==================== IMMUNIZATION SCHEMAS ====================

class ImmunizationLogCreate(BaseModel):
    """Schema untuk membuat immunization log."""
    vaccine_id: int = Field(..., title="ID Vaksin")
    scheduled_date: date = Field(..., title="Tanggal Dijadwalkan", description="Format: YYYY-MM-DD")
    status: Optional[str] = Field("pending", title="Status", description="pending atau completed")
    notes: Optional[str] = Field(None, title="Catatan")


class ImmunizationLogResponse(BaseModel):
    """Schema untuk response immunization log."""
    id: int
    child_id: int
    vaccine_id: int
    status: str
    scheduled_date: date
    completion_date: Optional[date] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ImmunizationListResponse(BaseModel):
    """Schema untuk list immunization logs."""
    total: int
    immunizations: list[ImmunizationLogResponse]