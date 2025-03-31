#!/bin/bash

readonly install_dir="/opt/danieldoescocktails"

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

# Set variables and constants
base_dir=$( dirname $( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) )
cd "$base_dir" || exit 1

# Create Install Location
mkdir -p "$install_dir"
if [ "$?" -ne 0 ]; then
    echo 'Failed to create install location.'; exit 1
fi
echo "Created install location '$install_dir'..." 

# Install sources
mkdir -p "$install_dir/database/schema"
cp -r "$base_dir/database/schema/postgres.sql" "$install_dir/database/schema/postgres.sql" || exit 1
cp -r "$base_dir/docker-compose.yaml" "$install_dir/docker-compose.yaml" || exit 1
cp -r "$base_dir/README.md" "$install_dir/README.md" || exit 1
cp -r "$base_dir/.secrets" "$install_dir/.secrets" || exit 1
echo "Copied sources from '$base_dir' to '$install_dir'..."

# Create docker images
chmod 755 ./utils/docker-install.sh
./utils/docker-install.sh
if [ "$?" -ne 0 ]; then
    echo 'Failed to install docker images.'; exit 1
fi
echo 'Installed docker images services...'

# Install systemd modules
chmod 755 ./utils/systemd-install.sh
./utils/systemd-install.sh "$install_dir"
if [ "$?" -ne 0 ]; then
    echo 'Failed to install systemd services.'; exit 1
fi
echo 'Installed systemd services...'

# Finish
echo 'Finished installing everything successfully!'

