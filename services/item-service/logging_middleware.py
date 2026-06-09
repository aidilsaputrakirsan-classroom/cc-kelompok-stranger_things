"""
Request Logging Middleware.
Log setiap HTTP request dengan timing, status, dan correlation ID.
Termasuk juga Error Alerting logic dari Lead Backend.
"""
import time
import uuid
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from metrics import metrics

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Middleware yang log setiap request/response."""

    async def dispatch(self, request: Request, call_next):
        # Generate atau ambil correlation ID
        correlation_id = request.headers.get(
            "X-Correlation-ID",
            str(uuid.uuid4())[:12]
        )

        # Simpan di request state (bisa diakses di endpoint)
        request.state.correlation_id = correlation_id

        # Catat waktu mulai
        start_time = time.time()

        # Proses request
        try:
            response = await call_next(request)
        except Exception as e:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            
            # Record failed request di metrics
            recent_error_rate = metrics.record_request(request.method, request.url.path, 500, duration_ms)
            
            extra_fields = {
                "correlation_id": correlation_id,
                "method": request.method,
                "path": request.url.path,
                "duration_ms": duration_ms,
                "status_code": 500,
            }
            
            # Lead Backend Task: Error Alerting Logic
            if recent_error_rate > 10.0:
                extra_fields["alert"] = True
                logger.critical(
                    f"CRITICAL ERROR ALERT! Error rate > 10% ({recent_error_rate:.1f}%). Request failed: {request.method} {request.url.path}",
                    extra=extra_fields,
                )
            else:
                logger.error(
                    f"Request failed: {request.method} {request.url.path}",
                    extra=extra_fields,
                )
            raise

        # Hitung durasi
        duration_ms = round((time.time() - start_time) * 1000, 2)

        # Record metrics (semua request, termasuk health)
        recent_error_rate = metrics.record_request(
            request.method, request.url.path,
            response.status_code, duration_ms
        )

        # Log request (skip health checks agar log tidak terlalu noisy)
        if request.url.path not in ["/health", "/metrics"]:
            extra_fields = {
                "correlation_id": correlation_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration_ms": duration_ms,
            }
            
            # Lead Backend Task: Error Alerting Logic for non-exception 4xx/5xx responses
            if response.status_code >= 400 and recent_error_rate > 10.0:
                extra_fields["alert"] = True
                logger.critical(
                    f"CRITICAL ERROR ALERT! Error rate > 10% ({recent_error_rate:.1f}%). {request.method} {request.url.path} → {response.status_code} ({duration_ms}ms)",
                    extra=extra_fields,
                )
            else:
                log_level = logging.WARNING if response.status_code >= 400 else logging.INFO
                logger.log(
                    log_level,
                    f"{request.method} {request.url.path} → {response.status_code} ({duration_ms}ms)",
                    extra=extra_fields,
                )

        # Teruskan correlation ID di response header
        response.headers["X-Correlation-ID"] = correlation_id
        return response