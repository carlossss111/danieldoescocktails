#!/bin/bash

if [ "$1" = '--auth' ]; then
    less +G /var/log/auth.log 
elif [ "$1" = '--frontend' ]; then
    docker logs frontend | less +G
elif [ "$1" = '--database' ]; then
    docker logs database | less +G
elif [ "$1" = '--backend' ]; then
    docker logs backend | less +G
elif [ "$1" = '--combined' ]; then
    journalctl -fu cocktail-compose
else
    echo 'Command line options: '
    echo '  --auth, show /var/log/auth.log'
    echo '  --frontend, show frontend docker logs'
    echo '  --backend, show backend docker logs'
    echo '  --database, show database docker logs'
    echo '  --combined, show systemd logs for the server'
fi

