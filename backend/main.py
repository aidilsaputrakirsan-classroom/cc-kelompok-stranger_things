from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Cloud App API",
    description="API untuk mata kuliah Komputasi Awan",
    version="0.1.0"
)

# CORS - agar frontend bisa akses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Untuk development saja
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Hello from Cloud App API!",
        "status": "running",
        "version": "0.1.0"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/team")
def team_info():
    return {
        "team": "cloud-team-XX",
        "members": [
            # TODO: Isi dengan data tim Anda
            {"name": "Ahmad Daffa Alfattah", "nim": "10231008", "role": "Lead Backend"},
            {"name": "Nazwa Amelia Zahra", "nim": "10231068", "role": "Lead Frontend"},
            {"name": "Cintya Widhi Astuti", "nim": "10231026", "role": "Lead DevOps"},
            {"name": "Verina Rahmadinah", "nim": "10231090", "role": "Lead QA & Docs"},
        ]
    }