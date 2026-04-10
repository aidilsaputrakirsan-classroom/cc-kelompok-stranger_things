# Backend Update Summary - Frontend & Backend Alignment

**Date**: April 7, 2026  
**Status**: ✅ Complete  
**Objective**: Align backend with frontend expectations for authentication and items management

---

## Overview

Backend telah diupdate untuk sepenuhnya match dengan struktur dan expectations dari frontend. Perubahan utama adalah **migrasi dari email-based authentication ke username-based authentication**.

---

## Files Modified

### 1. **backend/models.py**

**Changes:**

- User model field `email` → `username` (unique identifier)
- Made `role_id` nullable dengan default value = 1
- Made `email` field optional (nullable)
- Kept `name` field untuk full name user

**Reason:** Frontend menggunakan username untuk login, bukan email

---

### 2. **backend/schemas.py**

**Changes:**

- `UserCreate`: Sekarang menerima `username` dan `fullName` (bukan `email` dan `name`)
- `UserResponse`: Mengembalikan `username` dan `name` (bukan `email`)
- `LoginRequest`: Mengharapkan `username` (bukan `email`)
- Added username validation: alphanumeric, underscore, dash only

**Reason:** Align dengan form data yang dikirim frontend

---

### 3. **backend/crud.py**

**Changes:**

- `create_user()`: Maps `fullName` → `name` field dan assign `role_id=1`
- `authenticate_user()`: Sekarang menggunakan `username` untuk lookup instead of `email`

**Reason:** Handle username-based authentication

---

### 4. **backend/main.py**

**Changes:**

- Added import: `SessionLocal` dari database
- Added import: `Role` dari models
- Added function: `init_default_roles()` untuk initialize default roles (user, admin)
- Updated `/auth/login` endpoint untuk gunakan username
- Updated error messages dari "email" → "username"

**Reason:** Initialize database dengan default roles dan support username-based auth

---

### 5. **frontend/src/services/api.js**

**Changes:**

- `login()` function sekarang mengirim `{ username, password }` (bukan `{ email, password }`)
- `register()` function mengirim full formData dengan validation fields

**Reason:** Match backend endpoint expectations

---

### 6. **frontend/src/App.jsx**

**Changes:**

- `handleRegister()` sekarang menggunakan `userData.username` (bukan `userData.email`)

**Reason:** Pass correct field ke login function

---

## Authentication Flow

### Register Flow

```
Frontend Form: { fullName, username, password, confirmPassword }
        ↓
LoginPage.onRegister() → App.handleRegister()
        ↓
POST /auth/register: { fullName, username, password }
        ↓
Backend validates:
  - username: unique, alphanumeric + underscore/dash
  - password: min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
        ↓
Create User:
  - username (unique)
  - name (from fullName)
  - hashed_password
  - role_id = 1 (default user role)
        ↓
Return UserResponse: { id, username, name, is_active, created_at }
```

### Login Flow

```
Frontend Form: { username, password }
        ↓
POST /auth/login: { username, password }
        ↓
Backend authenticates:
  - Find user by username
  - Verify password hash
        ↓
Return TokenResponse:
  {
    access_token: "jwt_token",
    token_type: "bearer",
    user: UserResponse
  }
        ↓
Frontend stores token and user data
```

---

## API Endpoints Summary

### Authentication

- `POST /auth/register` → Creates new user → Returns UserResponse
- `POST /auth/login` → Authenticates user → Returns TokenResponse
- `GET /auth/me` → Get current user data → Returns UserResponse (requires auth)

### Items Management (All require authentication)

- `GET /items` → List items with search → Returns ItemListResponse
- `POST /items` → Create new item → Returns ItemResponse
- `GET /items/{id}` → Get single item → Returns ItemResponse
- `PUT /items/{id}` → Update item → Returns ItemResponse
- `DELETE /items/{id}` → Delete item → Returns 204 No Content

### Utility

- `GET /health` → Health check → Returns { status, version }

---

## Database Schema Changes

### roles table

```
id (Integer, PK)
name (String, Unique) - "user", "admin"
description (Text)
created_at (DateTime)
```

### users table

```
id (Integer, PK)
username (String, Unique) ← CHANGED from email
email (String, Nullable) ← CHANGED from NOT NULL
name (String) - Full name
phone (String, Nullable)
address (Text, Nullable)
hashed_password (String)
role_id (Integer, FK) ← NOW NULLABLE with default=1
is_active (Boolean, default=True)
created_at (DateTime)
updated_at (DateTime)
```

---

## Important Notes

### Default Roles

- On startup, `init_default_roles()` automatically creates:
  - `user` role (id=1) - for regular users
  - `admin` role (id=2) - for administrators
- All new users get `role_id=1` by default

### Database Migration

- If you have existing database with old schema:
  - Option 1: Delete database and let SQLAlchemy create fresh tables
  - Option 2: Manually migrate using Alembic
  - Option 3: Create migration script to alter tables

- **For fresh project**: Simply run backend, it will create all tables automatically

### JWT Configuration

- `SECRET_KEY`: Set via environment variable `.env`
- `ALGORITHM`: HS256 (set via `.env`)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: 60 (set via `.env`)
- Token stored in header: `Authorization: Bearer <token>`

---

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Database connects successfully
- [ ] Default roles are created
- [ ] User can register with valid username/password
- [ ] User cannot register with duplicate username
- [ ] User can login with correct username/password
- [ ] User gets JWT token on successful login
- [ ] User can create items when authenticated
- [ ] User cannot access items without valid token
- [ ] Unauthenticated requests return 401 Unauthorized
- [ ] Frontend can register and login
- [ ] Frontend displays user name in header
- [ ] Frontend can CRUD items after login
- [ ] Logout clears token and redirects to login

---

## Environment Variables Required (.env)

```
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## Next Steps

1. **Database Setup**
   - Ensure PostgreSQL is running
   - Verify database URL in `.env`
   - Run backend (it will auto-create tables)

2. **Start Services**

   ```bash
   # Terminal 1 - Backend
   cd backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

   # Terminal 2 - Frontend
   cd frontend
   npm install
   npm run dev
   ```

3. **Test Authentication**
   - Open http://localhost:5173
   - Register new user
   - Login and verify items can be managed

4. **Monitor Logs**
   - Backend logs in terminal (shows auth flow)
   - Frontend browser console (shows API calls)

---

## Troubleshooting

### "Username already registered"

→ Username is taken, user should choose different one

### "Username or password is incorrect"

→ Check username spelling and password

### "401 Unauthorized"

→ Token expired or invalid, user needs to login again

### "CORS error"

→ Check `ALLOWED_ORIGINS` in `.env` includes frontend URL

### "Database connection failed"

→ Verify PostgreSQL is running and `DATABASE_URL` is correct

---

## Version Info

- Backend: v0.4.0
- Database: PostgreSQL
- Framework: FastAPI
- Frontend: React + Vite
- Auth: JWT (HS256)

---

**All changes made:** April 7, 2026  
**Status:** Ready for testing
