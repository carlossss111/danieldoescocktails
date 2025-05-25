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

## Enable HTTPS
Install certbot which will do challenges with ACME to get a certificate
```
apt install certbot
```

The challenge works by making a GET request to /.well-known/acme-challenge/. The docker-compose for the frontend should be mounting that 
directory, so create it locally.
```
mkdir -p .well-known/acme-challenge
```

Request a certificate and verify that it can be renewed 
```
certbot certonly --webroot -w /opt/danieldoescocktails -d danieldoescocktails.com -d www.danieldoescocktails.com
certbot renew --dry-run
```

Certificates are mounted by docker-compose at .letencrypt, so sym link that.
```
ln -s /etc/letsencrypt/ /opt/danieldoescocktails/.letsencrypt
```

Bare in mind the nginx.conf and the docker-compose might need some tweaking during this process.
Self signed certificates might need to be used for the initial challenge if this doesn't work [see README.md](/README.md).

## Schedule backups
First install the cron scheduler
```
apt install cron
```

Schedule the backup script to run periodically
```
crontab -e
> 0 3 * * 1 export DB_USER=<user>; /opt/danieldoescocktails/utils/db-backup.sh /opt/danieldoescocktails/backups
```

## Setup healthcheck
Setup a healthcheck crontab that restarts the systemd service on a failure automatically
```
crontab -e
> * * * * * docker ps | grep -q unhealthy && systemctl restart cocktail-compose
```

## Finishing steps
Setup logging by installing syslog.
```
apt install rsyslog
```

It's recommended to reboot at this point. If after rebooting the webserver is still up then we're all done.

# Upgrading
To upgrade the server, build the images and run the upgrade script on a _local_ machine. The script will upgrade the server via SSH.

This script assumes the default user is a sudoer.
```
./utils/remote-upgrade.sh <ssh-address>
```

