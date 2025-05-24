#!/bin/bash
set -e

readonly POSTGRES_IMAGE='postgres:17.5-alpine3.21'
readonly PYTHON_IMAGE='python:3.13.3-alpine3.21'

systemctl list-units --full -all | grep -Fq 'docker.service'
if [ "$?" -ne 0 ]; then
    echo 'Please install docker.io before running.'; exit
fi


if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

base_dir=$( dirname $( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) )
cd "$base_dir" || exit 1

echo 'Enabling and starting docker service...'
systemctl enable docker.service
systemctl enable docker.socket
systemctl daemon-reload
systemctl start docker.service
systemctl start docker.socket

echo 'Pulling base docker images...'
docker pull "$POSTGRES_IMAGE"
docker pull "$PYTHON_IMAGE"

echo 'Done.'

