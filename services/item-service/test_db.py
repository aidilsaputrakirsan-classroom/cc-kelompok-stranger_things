import os
import sys
import traceback
from sqlalchemy import create_engine, text

# Cetak DATABASE_URL yang sedang digunakan
db_url = os.environ.get("DATABASE_URL")
print(f"DATABASE_URL is: {db_url}")

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        res = conn.execute(text("SELECT 1"))
        print(f"Query Result: {res.fetchone()}")
        print("KONEKSI SUKSES!")
except Exception as e:
    print("KONEKSI GAGAL!")
    traceback.print_exc()
