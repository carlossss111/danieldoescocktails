#!/bin/bash

readonly CONTAINER=database

if [ -z "$1" ]; then
    echo 'Usage: ./db-migration.sh <sql_script>'; exit 1
fi

docker exec "$CONTAINER" mkdir -p "/tmp/$1"
docker exec "$CONTAINER" rmdir "/tmp/$1"
docker cp "$1" "$CONTAINER:/tmp/$1"
docker exec "$CONTAINER" psql -U"$DB_USER" -d"$DB_NAME" -a -f "/tmp/$1"

