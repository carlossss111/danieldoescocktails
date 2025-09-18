#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo 'Please provide an SSH address as the first argument.'; exit 1
fi
ssh_addr="$1"

if [ -z "$2" ]; then
    target="/opt/danieldoescocktails"
else
    target="$2"
fi

echo 'Copying configuration files over...'
scp database/schema/*.sql "$ssh_addr:/tmp"
scp utils/*.sh "$ssh_addr:/tmp"
scp docker-compose.yaml "$ssh_addr:/tmp"
scp nginx.conf "$ssh_addr:/tmp"
ssh -t "$ssh_addr" "sudo su -c \"\
    mv /tmp/*.sql $target/database/schema && \
    mv /tmp/*.sh $target/utils && \
    mv /tmp/docker-compose.yaml $target/ && \
    mv /tmp/nginx.conf $target/ \""

echo 'Files copied...'

echo 'Saving docker images to files...'
docker image save danieldoescocktails-backend:latest -o /tmp/backend-$(date -I).image
docker image save danieldoescocktails-frontend:latest -o /tmp/frontend-$(date -I).image
docker image save danieldoescocktails-flask:latest -o /tmp/flask-$(date -I).image

echo 'Copying over images to target...'
scp /tmp/*.image "$ssh_addr:/tmp"
rm /tmp/*.image

echo 'Unpacking images and restarting server...'
ssh -t "$ssh_addr" "sudo su -c \"\
    mv /tmp/*.image $target/images && \
    docker image load -i $target/images/backend-$(date -I).image && \
    docker image load -i $target/images/frontend-$(date -I).image && \
    docker image load -i $target/images/flask-$(date -I).image && \
    systemctl restart cocktail-compose && \
    docker image prune && \
    echo 'Restarted, checking server status...' && \
    sleep 5 && \
    systemctl status cocktail-compose | cat && \
    docker ps \""

echo 'Server updated to new image.'

