"""Pydantic schemas for Auth Service."""
from pydantic import BaseModel, EmailStr, field_validator


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str = "parent"


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        return v.lower()


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenVerifyResponse(BaseModel):
    user_id: int
    email: str
    name: str
    role: str