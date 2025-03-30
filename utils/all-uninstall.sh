#!/bin/bash

readonly install_dir="/opt/danieldoescocktails"

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

# Set variables and constants
base_dir=$( dirname $( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) )
cd "$base_dir" || exit 1

# Uninstall Systemd
chmod 755 ./utils/systemd-uninstall.sh
./utils/systemd-uninstall.sh "$install_dir"
if [ "$?" -ne 0 ]; then
    echo 'Failed to uninstall systemd services.'; exit 1
fi
echo 'Uninstalled systemd services...'

# Cleanup
rm -r "$install_dir" || exit 1
echo "Removed '$install_dir'"

# Finish
echo 'Finished uninstalling everything successfully!'

