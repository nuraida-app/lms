#!/bin/bash

# Konfigurasi
DB_NAME="lms_v2"
DB_USER="postgres"
DB_PASSWORD="nibs2024*"
DB_HOST="localhost"
BACKUP_DIR="/www/wwwroot/lms_v2/server/backup_db"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_${DB_NAME}_${DATE}.sql.gz"
PG_DUMP_PATH="/www/server/pgsql/bin/pg_dump"
GZIP_PATH="/bin/gzip"

# Pastikan direktori backup ada
mkdir -p "$BACKUP_DIR"

# Eksekusi backup
echo "Membackup database $DB_NAME..."
PGPASSWORD="$DB_PASSWORD" "$PG_DUMP_PATH" -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" | "$GZIP_PATH" > "$BACKUP_FILE"

# Cek apakah backup berhasil
if [ $? -eq 0 ]; then
    echo "Backup selesai: $BACKUP_FILE"
    
    # Ubah kepemilikan file agar bisa diakses di aaPanel
    chown www:www "$BACKUP_FILE"
    chmod 644 "$BACKUP_FILE"
else
    echo "Backup gagal!"
    exit 1
fi
