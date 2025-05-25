![Logo](/frontend/src/images/logo/Dan_Does_Cocktails_Heavy_Shadow.jpg)

# Design
## Database
* Postgres database
* Python ORM layer built into a wheel file and imported into the backend
* DB is accessed with SQLAlchemy

## Backend
* Python FastAPI
* Service layer wraps the db methods
* Routes call the services

## Frontend
* Classically simple frontend as it's not really my bag
* Typescript for ECMA2005
* Main script file imports the other ones

## Infrastructure
* Components are compiled into Docker images
* Docker-compose file runs all containers
* NGinx on the frontend routes the traffic

# Running Locally

## Secrets
The secret files can be changed and renamed in `./secrets`
```
vi .secrets/postgres-compose.txt.template
mv .secrets/postgres-compose.txt.template .secrets/postgres-compose.txt
vi .secrets/postgres-variables.env.template
mv .secrets/postgres-variables.env.template .secrets/postgres-variables.env
vi .secrets/postgres-variables-manual.sh.template
mv .secrets/postgres-variables-manual.sh.template .secrets/postgres-variables-manual.sh
```

## Prepare HTTPS environment
This step is required because the docker-compose, which can be copied to a live server, mounts certain directories. These steps are purely for testing, production keys can be generated following [INSTALLATION.md](/INSTALLATION.md).

Create self-signed certs
```
cd .letsencrypt/live/danieldoescocktails.com
openssl req -newkey rsa:4096 -x509 -sha512 -days 365 -nodes -out fullchain.pem -keyout privkey.pem
```

Create ssl params
```
cd .letsencrypt
openssl dhparam -out ssl-dhparams.pem 4096
```

These will be picked up in a mounted docker volume.

## Docker
First activate a python environment
```
python -m venv .venv
source .venv/bin/activate
pip install -r frontend/requirements.txt
pip install -r backend/requirements.txt
```

Then build images with the makefiles
```
cd backend && make docker-build && cd -
cd frontend && make docker-build && cd -
```

Run with docker compose.
```
docker compose up -d
```

## Database
The DB can be debugged by running the following
```
source .secrets/postgres-variables-manual.sh
docker exec -it database psql -U<username> -d<dbname>
```

It can be migrated with the utils script
```
source .secrets/postgres-variables-manual.sh
./utils/db-migration.sh database/schema/migration_x_y.sql
```

# Installation
See [INSTALLATION.md](/INSTALLATION.md)

## Author
Daniel R 2025

