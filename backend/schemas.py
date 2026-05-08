from pydantic import BaseModel, Field, field_validator, computed_field
from typing import Optional
from datetime import datetime, date
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
    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Laptop",
                "description": "Laptop untuk cloud computing",
                "price": 15000000,
                "quantity": 10
            }
        }
    }


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
class UserCreate(BaseModel):
    """Schema untuk register user baru."""
    name: str = Field(..., min_length=1, max_length=100)
    email: str
    password: str = Field(..., min_length=8)
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Daffa Alfattah",
                "email": "daffa@student.itk.ac.id",
                "password": "Password123!"
            }
        }
    }
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        """Validasi format email."""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Email tidak valid. Format: user@example.com')
        return v.lower()
    
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

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "daffa@student.itk.ac.id",
                "password": "Password123!"
            }
        }
    }


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
    name: str = Field(..., min_length=1, max_length=100, title="Nama Anak")
    birth_date: date = Field(..., title="Tanggal Lahir", description="Format: YYYY-MM-DD")
    gender: str = Field(..., title="Jenis Kelamin", description="Isi dengan: male atau female")
    blood_type: Optional[str] = Field(None, title="Golongan Darah", description="Contoh: A, B, AB, O")
    height: Optional[float] = Field(None, title="Tinggi Badan (cm)")
    weight: Optional[float] = Field(None, title="Berat Badan (kg)")
    notes: Optional[str] = Field(None, title="Catatan Khusus")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Budi Santoso",
                "birth_date": "2024-05-10",
                "gender": "male",
                "blood_type": "A",
                "height": 50.0,
                "weight": 3.2,
                "notes": "Lahir normal"
            }
        }
    }

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v):
        allowed = {"male", "female"}
        if v.lower() not in allowed:
            raise ValueError("Gender harus 'male' atau 'female'")
        return v.lower()


class ChildUpdate(BaseModel):
    """Schema untuk update data anak (semua field opsional)."""
    name: Optional[str] = Field(None, min_length=1, max_length=100, title="Nama Anak")
    birth_date: Optional[date] = Field(None, title="Tanggal Lahir", description="Format: YYYY-MM-DD")
    gender: Optional[str] = Field(None, title="Jenis Kelamin", description="Isi dengan: male atau female")
    blood_type: Optional[str] = Field(None, title="Golongan Darah")
    height: Optional[float] = Field(None, title="Tinggi Badan (cm)")
    weight: Optional[float] = Field(None, title="Berat Badan (kg)")
    notes: Optional[str] = Field(None, title="Catatan Khusus")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Budi Santoso Updated",
                "gender": "male"
            }
        }
    }

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v):
        if v is None:
            return v
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
    height: Optional[float] = Field(None, title="Tinggi Badan (cm)")
    weight: Optional[float] = Field(None, title="Berat Badan (kg)")
    notes: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    immunizations: Optional[list] = Field(
        default_factory=list, 
        alias="immunization_logs",
        title="Riwayat Imunisasi"
    )

    class Config:
        from_attributes = True
        populate_by_name = True
    
    @computed_field
    @property
    def heightNow(self) -> Optional[float]:
        """Alias untuk height (untuk frontend)"""
        return self.height
    
    @computed_field
    @property
    def weightNow(self) -> Optional[float]:
        """Alias untuk weight (untuk frontend)"""
        return self.weight


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
    vaccine_id: int
    scheduled_date: date  # Format: YYYY-MM-DD
    status: Optional[str] = Field(None, description="pending, completed, delayed, skipped")
    facility_id: Optional[int] = None
    completion_date: Optional[date] = None
    notes: Optional[str] = None


class ImmunizationLogUpdate(BaseModel):
    """Schema untuk update status imunisasi."""
    status: Optional[str] = None  # 'pending', 'completed', 'delayed', 'skipped'
    completion_date: Optional[date] = None


class ImmunizationLogResponse(BaseModel):
    """Schema untuk response catatan imunisasi."""
    id: int
    child_id: int
    vaccine_id: int
    status: str
    scheduled_date: date
    completion_date: Optional[date] = None
    created_at: datetime
    notes: Optional[str] = None

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