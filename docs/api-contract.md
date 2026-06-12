# API Contract — Cloud App Microservices

## Base URLs

| Environment | Gateway URL |
|-------------|-------------|
| Local Development | http://localhost |
| Production | https://cc-kelompok-strangerthings.akhzafachrozy.my.id/ |

## Authentication

All protected endpoints require JWT token in header:
`Authorization: Bearer <access_token>`

Token diperoleh dari `POST /auth/login`.  
Token expire setelah 30 menit (configurable via TOKEN_EXPIRE_MINUTES).

## Error Response Format

Semua error menggunakan format yang konsisten:
```json
{
    "detail": "Error message description"
}
```

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted (no content) |
| 400 | Bad request / validation error |
| 401 | Unauthorized / invalid token |
| 404 | Resource not found |
| 422 | Validation error (Pydantic) |
| 429 | Rate limited |
| 503 | Service unavailable |

# Auth Service Endpoints

## POST /auth/register
- Rate limit: 5 req/s
- Body: {"email": "str", "password": "str (min 8, 1 uppercase, 1 digit)", "name": "str"}
- Response 201: {"id": int, "email": "str", "name": "str"}

## POST /auth/login
- Rate limit: 5 req/s
- Body: {"email": "str", "password": "str"}
- Response 200: {"access_token": "str", "token_type": "bearer"}

## GET /auth/verify
- Internal: Dipanggil oleh service lain, bukan frontend
- Header: Authorization: Bearer <token>
- Response 200: {"user_id": int, "email": "str", "name": "str"}

# Item Service Endpoints

## GET /health
- Health check
- Response 200: {"status": "healthy", "service": "item-service", "version": "2.1.0", "dependencies": {"auth-service": {"status": "available"}, "database": {"status": "connected"}}}

## GET /metrics
- Service metrics (request count, error rate, latency)
- Response 200: JSON dengan fields uptime_seconds, total_requests, total_errors, error_rate_percent, latency, status_codes

## GET /children
- Auth: Required
- Response 200: ChildListResponse

## POST /children
- Auth: Required
- Body: ChildCreate
- Response 201: ChildResponse

## GET /children/{child_id}
- Auth: Required
- Response 200: ChildResponse

## PUT /children/{child_id}
- Auth: Required
- Body: ChildCreate (partial)
- Response 200: ChildResponse

## DELETE /children/{child_id}
- Auth: Required
- Response 204: No content
