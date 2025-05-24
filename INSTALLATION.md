# Installation

## Environment
This installation process has been tested on Debian Bookworm, but similiar steps should be taken for any Linux distribution.
This webserver relies on Docker containers, therefore it should be portable between all Linux distros.

The installation does not support BSD because, at the time of writing, there is no Docker package available.

A fresh system with atleast 512mb of RAM, 1 CPU and a 10GB SSD should do the trick.

## Pre-requisites
1. The secrets files have been populated.
1. The docker images have been built as described in the README.md
1. The docker images have been saved to a file with `docker save` and copied over to the target system.
1. Super user permissions have been sorted out on the target system and we have root access.
1. The router allows traffic through ports 80, 443 and 5000.

## Prepare the installation
Copy over the database schema, the docker compose, the secrets, the utils and the docker images to the target system. Let's assume that they have been copied into `/tmp`.

As root, create the directory structure and copy in the files.
```
su
mkdir -p /opt/danieldoescocktails
mkdir -p /opt/danieldoescocktails/images
mkdir -p /opt/danieldoescocktails/schema/database
mv *.sql /opt/danieldoescocktails/schema/database/
mv docker-compose.yaml /opt/danieldoescocktails/
mv utils /opt/danieldoescocktails/
mv .secrets /opt/danieldoescocktails/
```

The structure should look like this:
```
/opt/danieldoescocktails
├── .secrets
│   ├── postgres-compose.txt
│   └── postgres-variables.env
├── database
│   └── schema
│       ├── mariadb_1.0.sql
│       ├── migration_1.0_2.0.sql
│       └── postgres.sql
├── docker-compose.yaml
├── images
│   ├── backend.image
│   └── frontend.image
└── utils
    ├── setup-firewall.sh
    ├── systemd-install.sh
    └── (...)
```
All commands from here should be run in `/opt/danieldoescocktails` as root.

Now prepare your package manager, here I am using apt.
```
apt update
apt upgrade
```

## Setup security
Install SSHGuard and Persistent IPTables.
```
apt install sshguard
apt install iptables-persistent
```

Run the firewall script and verify that the firewall has been setup.
```
./utils/setup-firewall.sh
systemctl status sshguard
systemctl status netfilter-persistent
cat /etc/iptables/rules.v4
```

Optionally link iptables to this directory for ease of access.
```
ln -s /etc/iptables/rules.v4 /opt/danieldoescocktails
```

## Setup docker
Install Docker.
```
apt install docker.io
```

Load the images to the local docker registry.
```
docker image load -i images/frontend.image
docker image load -i images/frontend.backend
```

Run the docker init script and verify that it's running.
```
./utils/docker-install.sh
systemctl status docker
```

## Launch the web server
Launch the webserver as a systemd service and check it is running.
```
apt install docker-compose
./utils/systemd-install.sh /opt/danieldoescocktails
systemctl status cocktail-compose
systemctl logs cocktail-compose
```

## Perform DB migrations (if applicable)
The docker compose will start up with the schema at `database/schema/postgres.sql`.
If you have DB migrations to apply, read in the environment variables to access the DB and run the migration script.

```
source .secrets/postgres-variables-manual.sh
./utils/db-migration.sh database/schema/migration_x_y.sql
```

## Finishing steps
It's recommended to reboot at this point. If after rebooting the webserver is still up then we're all done.

