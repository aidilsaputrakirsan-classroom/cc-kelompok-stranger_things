#!/usr/bin/env bash

# Skrip ini akan mengecek koneksi ke database sebelum menjalankan aplikasi utama (Uvicorn).
# Menggunakan Python dan module bawaannya + SQLAlchemy untuk ping DB, yang pasti tersedia di container Backend.

echo "⏳ Menunggu kesiapan PostgreSQL DB..."

python -c "
import os
import sys
import time
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()
db_url = os.getenv('DATABASE_URL')

if not db_url:
    print('⚠️  Peringatan: DATABASE_URL tidak ditemukan di environment variables.')
    sys.exit(1)

# Ganti asyncpg / sebagainya ke handler standard biar tetap jalan pengecekannya
if db_url.startswith('postgres://'):
    db_url = db_url.replace('postgres://', 'postgresql://', 1)

engine = create_engine(db_url)
max_retries = 30

for i in range(max_retries):
    try:
        with engine.connect() as connection:
            print('✅ PostgreSQL sudah siap dan dapat diakses!')
        sys.exit(0)
    except Exception as e:
        print(f'⏱️ DB belum respons, mencoba ulang... ({i+1}/{max_retries})')
        time.sleep(2)

print('❌ Gagal: PostgreSQL tidak kunjung respons.')
sys.exit(1)
"

# Cek status keluaran dari program python di atas
if [ $? -ne 0 ]; then
    echo "Gagal memverifikasi kesiapan Database. Menghentikan startup."
    exit 1
fi

echo "🚀 Menjalankan perintah utama: $@"
exec "$@"
