#!/bin/bash
set -e

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

if [ -z "$1" ]; then
    echo 'Please provide a working directory as an argument.'; exit 1
fi
WORK_DIR="$1"

mkdir -p "$WORK_DIR"
mkdir -p "$WORK_DIR/systemd"

echo "Writing docker compose service as '$WORK_DIR/systemd/cocktail-compose.service'..."
cat << EOF > "$WORK_DIR/systemd/cocktail-compose.service"
[Unit]
Description=Starts the docker-compose containing danieldoescocktails.com

[Service]
Type=simple
WorkingDirectory=$WORK_DIR
ExecStart=/usr/bin/env /usr/bin/docker-compose up
ExecStop=/usr/bin/env /usr/bin/docker-compose stop
StandardOutput=syslog
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target

EOF

echo 'Enabling and starting docker service...'
systemctl enable docker.service
systemctl enable docker.socket
systemctl daemon-reload
systemctl start docker.service
systemctl start docker.socket

echo 'Enabling and starting docker compose service...'
systemctl enable "$WORK_DIR/systemd/cocktail-compose.service"
systemctl daemon-reload
systemctl start cocktail-compose

echo 'Done.'

