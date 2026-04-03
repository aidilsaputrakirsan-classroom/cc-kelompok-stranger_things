from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, Date, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Role(Base):
    """Model untuk tabel 'roles' - Role-based access control"""
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    users = relationship("User", back_populates="role")


class User(Base):
    """Model untuk tabel 'users' - Data pengguna (orang tua dan petugas kesehatan)"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    role = relationship("Role", back_populates="users")
    children = relationship("Child", back_populates="parent")
    articles = relationship("Article", back_populates="author")


class Child(Base):
    """Model untuk tabel 'children' - Data profil anak"""
    __tablename__ = "children"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    birth_date = Column(Date, nullable=False, index=True)
    gender = Column(String(10), nullable=False)  # 'male' or 'female'
    blood_type = Column(String(5), nullable=True)
    height_at_birth = Column(Float, nullable=True)
    weight_at_birth = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    parent = relationship("User", back_populates="children")
    immunization_logs = relationship("ImmunizationLog", back_populates="child")
    growth_records = relationship("GrowthRecord", back_populates="child")


class HealthcareFacility(Base):
    """Model untuk tabel 'healthcare_facilities' - Data fasilitas kesehatan"""
    __tablename__ = "healthcare_facilities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    type = Column(String(50), nullable=False, index=True)
    address = Column(Text, nullable=False)
    phone = Column(String(20), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    operating_hours = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    immunization_logs = relationship("ImmunizationLog", back_populates="facility")


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

    # Relationships
    schedules = relationship("VaccineSchedule", back_populates="vaccine")
    immunization_logs = relationship("ImmunizationLog", back_populates="vaccine")


class VaccineSchedule(Base):
    """Model untuk tabel 'vaccine_schedules' - Jadwal imunisasi berdasarkan usia anak"""
    __tablename__ = "vaccine_schedules"

    id = Column(Integer, primary_key=True, index=True)
    vaccine_id = Column(Integer, ForeignKey("vaccine_types.id"), nullable=False, index=True)
    age_month = Column(Integer, nullable=False, index=True)
    dose_number = Column(Integer, nullable=True)
    description = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    vaccine = relationship("VaccineType", back_populates="schedules")
    immunization_logs = relationship("ImmunizationLog", back_populates="schedule")


class ImmunizationLog(Base):
    """Model untuk tabel 'immunization_logs' - Catatan imunisasi anak"""
    __tablename__ = "immunization_logs"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, index=True)
    vaccine_id = Column(Integer, ForeignKey("vaccine_types.id"), nullable=False, index=True)
    schedule_id = Column(Integer, ForeignKey("vaccine_schedules.id"), nullable=True)
    facility_id = Column(Integer, ForeignKey("healthcare_facilities.id"), nullable=True, index=True)
    status = Column(String(50), default="pending")
    scheduled_date = Column(Date, nullable=False, index=True)
    completion_date = Column(Date, nullable=True)
    healthcare_worker_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    child = relationship("Child", back_populates="immunization_logs")
    vaccine = relationship("VaccineType", back_populates="immunization_logs")
    schedule = relationship("VaccineSchedule", back_populates="immunization_logs")
    facility = relationship("HealthcareFacility", back_populates="immunization_logs")
    reminders = relationship("Reminder", back_populates="immunization_log")


class GrowthRecord(Base):
    """Model untuk tabel 'growth_records' - Data catatan pertumbuhan anak"""
    __tablename__ = "growth_records"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, index=True)
    age_month = Column(Integer, nullable=False)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    head_circumference = Column(Float, nullable=True)
    recorded_date = Column(Date, nullable=False, index=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    child = relationship("Child", back_populates="growth_records")


class Reminder(Base):
    """Model untuk tabel 'reminders' - Sistem reminder/notifikasi imunisasi"""
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)
    immunization_log_id = Column(Integer, ForeignKey("immunization_logs.id", ondelete="CASCADE"), nullable=False)
    reminder_type = Column(String(50), default="app_notification")
    reminder_date = Column(Date, nullable=False, index=True)
    is_sent = Column(Boolean, default=False, index=True)
    sent_at = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    immunization_log = relationship("ImmunizationLog", back_populates="reminders")


class Item(Base):
    """Model untuk tabel 'items' - Inventory barang/supplies"""
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Article(Base):
    """Model untuk tabel 'articles' - Artikel edukasi"""
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    category = Column(String(100), nullable=True, index=True)
    is_published = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    author = relationship("User", back_populates="articles")


class AuditLog(Base):
    """Model untuk tabel 'audit_logs' - Log untuk tracking perubahan data"""
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(50), nullable=False)
    table_name = Column(String(100), nullable=False)
    record_id = Column(Integer, nullable=True)
    old_values = Column(JSON, nullable=True)
    new_values = Column(JSON, nullable=True)
    ip_address = Column(String(45), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)