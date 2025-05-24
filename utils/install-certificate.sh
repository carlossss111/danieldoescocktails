#!/bin/bash

readonly CERT_DIR = /etc/ssl/certs/

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

mkdir -p "$CERT_DIR"

certbot certonly --nginx

