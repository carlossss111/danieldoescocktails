#!/bin/bash
set -e

readonly DB_CONTAINER='database'
readonly FRONTEND_CONTAINER='frontend'

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

if [ "$1" = '--db' ]; then
    if [ -z "$2" ]; then
        echo 'No sql file selected'; exit 1
    fi
    sql_file="$2"
elif [ "$1" = '--pics' ]; then
    if [ -z "$2" ]; then
        echo 'No picture tar file selected'; exit 1
    fi
    img_file="$2"
else
    echo 'Usage: < --db OR --pics > <file name>'; exit 1
fi

if [ "$1" = '--db' ];
then
    docker cp "$sql_file" "$DB_CONTAINER:/tmp"
    docker exec "$DB_CONTAINER" psql -U"$DB_USER" -d"$DB_NAME" -f "/tmp/$sql_file" 
    docker exec "$DB_CONTAINER" rm "/tmp/$sql_file"
else
    docker cp "$img_file" "$FRONTEND_CONTAINER:/usr/share/nginx/static/images/img.tar.gz"
    docker exec "$FRONTEND_CONTAINER" tar xzvf "/usr/share/nginx/static/images/img.tar.gz" -C /usr/share/nginx/static/images
    docker exec "$FRONTEND_CONTAINER" rm "/usr/share/nginx/static/images/img.tar.gz"
fi
echo 'Done.'

