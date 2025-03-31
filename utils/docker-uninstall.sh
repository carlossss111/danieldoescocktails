#!/bin/bash

readonly POSTGRES_IMAGE='postgres:17.4-alpine3.21'
readonly PYTHON_IMAGE='python:3.13.2-alpine3.21'
readonly BACKEND_IMAGE='danieldoescocktails-backend:latest'

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

base_dir=$( dirname $( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) )
cd "$base_dir" || exit 1

echo 'Deleting docker containers...'
docker container prune -f

echo 'Deleting docker images...'
docker rmi "$POSTGRES_IMAGE"
docker rmi "$PYTHON_IMAGE"
docker rmi "$BACKEND_IMAGE"

echo 'Disabling docker service...'
systemctl stop docker.service
systemctl stop docker.socket
systemctl disable docker.socket
systemctl disable docker.socket
systemctl daemon-reload
systemctl reset-failed

echo 'Done.'

