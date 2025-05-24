#!/bin/bash
set -e

readonly DB_CONTAINER='database'
readonly FRONTEND_CONTAINER='frontend'
readonly MAX_BACKUPS=9

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

if [ -z "$1" ]; then
    echo 'Please provide a directory to save the backup to as an argument'; exit 1
fi
save_dir="$1"

echo 'Backing up database...'
mkdir -p "$save_dir"
docker exec "$DB_CONTAINER" pg_dumpall -U"$DB_USER" > $save_dir/database-$(date -I).sql

num_of_files=$(ls -l $save_dir/*.sql | wc -l)
if [ "$num_of_files" -gt "$MAX_BACKUPS" ]; then
    echo -n 'Rotating backups by removing the oldest file: '
    oldest_file=$(ls -1t $save_dir/*.sql | tail -1)
    echo "$oldest_file"
    rm "$oldest_file"
fi

echo 'Backing up images...'
docker exec "$FRONTEND_CONTAINER" tar czvf images-$(date -I).tar.gz -C /usr/share/nginx/static/images . > /dev/null
docker cp "$FRONTEND_CONTAINER:images-$(date -I).tar.gz" "$save_dir"
docker exec "$FRONTEND_CONTAINER" rm "images-$(date -I).tar.gz"

num_of_files=$(ls -l $save_dir/*.tar.gz | wc -l)
if [ "$num_of_files" -gt "$MAX_BACKUPS" ]; then
    echo -n 'Rotating backups by removing the oldest image: '
    oldest_file=$(ls -1t $save_dir/*.tar.gz | tail -1)
    echo "$oldest_file"
    rm "$oldest_file"
fi

echo 'Done.'

