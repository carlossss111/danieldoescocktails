
# Logging
Check the logs with one script
```
./utils/check-log.sh
```

# Upgrade
Perform a remote upgrade from a source system to a target system with SSH
```
./utils/remote-upgrade.sh <ssh-address>
```

# Migrate
If an upgrade also requires a migration, SSH onto the server and run the migration script
```
source .secrets/postgres-variables-manual.sh
./utils/db-migration.sh <sql-file-to-migrate-with>
```

# Backup
Perform a backup of both database SQL and cocktail pictures
```
source .secrets/postgres-variables-manual.sh
./utils/db-backup.sh <dir/to/backup/to>
```

# Restore
Restore postgres db from a file
```
source .secrets/postgres-variables-manual.sh
./utils/restore-backup.sh --db <sql-file-to-restore-from>
```

Restore images (pictures) from a tar
```
./utils/restore-backup.sh --pics <tar-to-restore-from>
```

# Restart
Restart the server with the 'cocktail-compose' systemd unit
```
systemctl restart cocktail-compose.service
```

