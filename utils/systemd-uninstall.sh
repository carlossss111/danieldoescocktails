#!/bin/bash

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

if [[ -z "$1" ]]; then
    echo 'Please provide a working directory as an argument.'; exit 1
fi
WORK_DIR="$1"

echo 'Disabling docker compose service...'
systemctl stop cocktail-compose
systemctl disable cocktail-compose

echo 'Deleting unit files...'
rm "$WORK_DIR/systemd/cocktail-compose.service"
rmdir "$WORK_DIR/systemd"

echo 'Done.'

