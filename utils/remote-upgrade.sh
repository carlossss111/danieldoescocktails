#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo 'Please provide an SSH address as the first argument.'; exit 1
fi
ssh_addr="$1"

if [ -z "$2" ]; then
    target="/opt/danieldoescocktails/images"
else
    target="$2"
fi

echo 'Saving images to files...'
docker image save danieldoescocktails-backend:latest -o /tmp/backend-$(date -I).image
docker image save danieldoescocktails-frontend:latest -o /tmp/frontend-$(date -I).image

echo 'Copying over to target...'
scp /tmp/*.image "$ssh_addr:/tmp"
rm /tmp/*.image

echo 'Unpacking images and restarting server...'
ssh -t "$ssh_addr" "sudo su -c \"\
    mv /tmp/*.image $target && \
    docker image load -i $target/backend-$(date -I).image && \
    docker image load -i $target/frontend-$(date -I).image && \
    systemctl restart cocktail-compose && \
    docker image prune && \
    echo 'Restarted, checking server status...' \
    sleep 5 && \
    systemctl status cocktail-compose | cat \""

echo 'Server updated to new image.'

