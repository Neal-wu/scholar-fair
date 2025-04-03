#!/bin/bash
BACKUP_DIR="$HOME/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/scholar_fair_$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create database backup
pg_dump -U scholar_fair_admin scholar_fair > $BACKUP_FILE

# Keep only last 7 backups
find $BACKUP_DIR -name "scholar_fair_*.sql" -type f -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE" 