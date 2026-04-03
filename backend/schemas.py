from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
import re


# === BASE SCHEMA ===
class ItemBase(BaseModel):
    """Base schema — field yang dipakai untuk create & update."""
    name: str = Field(..., min_length=1, max_length=100, examples=["Laptop"])
    description: Optional[str] = Field(None, examples=["Laptop untuk cloud computing"])
    price: float = Field(..., gt=0, examples=[15000000])
    quantity: int = Field(0, ge=0, examples=[10])


# === CREATE SCHEMA (untuk POST request) ===
class ItemCreate(ItemBase):
    """Schema untuk membuat item baru. Mewarisi semua field dari ItemBase."""
    pass


# === UPDATE SCHEMA (untuk PUT request) ===
class ItemUpdate(BaseModel):
    """
    Schema untuk update item. Semua field optional 
    karena user mungkin hanya ingin update sebagian field.
    """
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)


# === RESPONSE SCHEMA (untuk output) ===
class ItemResponse(ItemBase):
    """Schema untuk response. Termasuk id dan timestamp dari database."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # Agar bisa convert dari SQLAlchemy model


# === LIST RESPONSE (dengan metadata) ===
class ItemListResponse(BaseModel):
    """Schema untuk response list items dengan total count."""
    total: int
    items: list[ItemResponse]
    
# === USER SCHEMAS ===
from pydantic import BaseModel, Field, field_validator
import re

class UserCreate(BaseModel):
    """Schema untuk register user baru."""
    email: str
    name: str
    password: str = Field(..., min_length=8)
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        """Validasi format email menggunakan regex."""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Email format tidak valid. Gunakan format: user@example.com')
        return v.lower()  # Normalize ke lowercase
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        """Validasi kekuatan password."""
        if len(v) < 8:
            raise ValueError('Password minimal 8 karakter')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password harus mengandung minimal 1 huruf besar')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password harus mengandung minimal 1 huruf kecil')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password harus mengandung minimal 1 angka')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password harus mengandung minimal 1 karakter spesial (!@#$%^&*)')
        return v


class UserResponse(BaseModel):
    """Schema untuk response user (tanpa password)."""
    id: int
    email: str
    name: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    """Schema untuk login request."""
    email: str
    password: str


class TokenResponse(BaseModel):
    """Schema untuk login response dengan JWT token."""
    access_token: str
    token_type: str
    user: UserResponse


# ============================================
# Child Schemas
# ============================================

class ChildCreate(BaseModel):
    """Schema untuk membuat data anak baru."""
    name: str = Field(..., min_length=1, max_length=100)
    birth_date: str  # Format: YYYY-MM-DD
    gender: str  # 'male' atau 'female'
    blood_type: Optional[str] = None
    height_at_birth: Optional[float] = None
    weight_at_birth: Optional[float] = None
    notes: Optional[str] = None


class ChildResponse(BaseModel):
    """Schema untuk response data anak."""
    id: int
    parent_id: int
    name: str
    birth_date: str
    gender: str
    blood_type: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============================================
# Vaccine Type Schemas
# ============================================

class VaccineTypeResponse(BaseModel):
    """Schema untuk response vaksin."""
    id: int
    name: str
    description: Optional[str] = None
    age_month_min: Optional[int] = None
    age_month_max: Optional[int] = None

    class Config:
        from_attributes = True


# ============================================
# Vaccine Schedule Schemas
# ============================================

class VaccineScheduleResponse(BaseModel):
    """Schema untuk response jadwal imunisasi."""
    id: int
    vaccine_id: int
    age_month: int
    dose_number: Optional[int] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True


# ============================================
# Immunization Log Schemas
# ============================================

class ImmunizationLogCreate(BaseModel):
    """Schema untuk membuat catatan imunisasi."""
    child_id: int
    vaccine_id: int
    scheduled_date: str  # Format: YYYY-MM-DD
    facility_id: Optional[int] = None
    completion_date: Optional[str] = None
    notes: Optional[str] = None


class ImmunizationLogUpdate(BaseModel):
    """Schema untuk update status imunisasi."""
    status: Optional[str] = None  # 'pending', 'completed', 'delayed', 'skipped'
    completion_date: Optional[str] = None


class ImmunizationLogResponse(BaseModel):
    """Schema untuk response catatan imunisasi."""
    id: int
    child_id: int
    vaccine_id: int
    status: str
    scheduled_date: str
    completion_date: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ============================================
# Growth Record Schemas
# ============================================

class GrowthRecordCreate(BaseModel):
    """Schema untuk membuat data pertumbuhan."""
    child_id: int
    age_month: int
    weight: float
    height: float
    head_circumference: Optional[float] = None
    recorded_date: str  # Format: YYYY-MM-DD
    notes: Optional[str] = None


class GrowthRecordResponse(BaseModel):
    """Schema untuk response data pertumbuhan."""
    id: int
    child_id: int
    age_month: int
    weight: float
    height: float
    head_circumference: Optional[float] = None
    recorded_date: str
    created_at: datetime

    class Config:
        from_attributes = True


# ============================================
# Healthcare Facility Schemas
# ============================================

class HealthcareFacilityResponse(BaseModel):
    """Schema untuk response fasilitas kesehatan."""
    id: int
    name: str
    type: str
    address: str
    phone: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    operating_hours: Optional[str] = None

    class Config:
        from_attributes = True