"""Item model — di bye_virus database."""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Item(Base):
    """Model untuk tabel 'items' - Inventory barang/supplies"""
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    owner_id = Column(Integer, nullable=False, index=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    category = Column(String(100), nullable=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Child(Base):
    """Model untuk tabel 'children' - Data profil anak"""
    __tablename__ = "children"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, nullable=False, index=True)  # User ID from auth-service
    name = Column(String(100), nullable=False)
    birth_date = Column(Date, nullable=False, index=True)
    gender = Column(String(10), nullable=False)  # 'male' or 'female'
    blood_type = Column(String(5), nullable=True)
    height = Column(Float, nullable=True)
    weight = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class VaccineType(Base):
    """Model untuk tabel 'vaccine_types' - Master data jenis vaksin"""
    __tablename__ = "vaccine_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    age_month_min = Column(Integer, nullable=True)
    age_month_max = Column(Integer, nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ImmunizationLog(Base):
    """Model untuk tabel 'immunization_logs' - Catatan imunisasi anak"""
    __tablename__ = "immunization_logs"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, index=True)
    vaccine_id = Column(Integer, ForeignKey("vaccine_types.id"), nullable=False, index=True)
    status = Column(String(50), default="pending")
    scheduled_date = Column(Date, nullable=False, index=True)
    completion_date = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())