#!/bin/sh


if [[ -f /vault/secrets/ncdb-admin-login ]]; then
    source /vault/secrets/ncdb-admin-login
    export ID_DB_CONFIG_USER="${ID_DB_CONFIG_USER}"
    export ID_DB_CONFIG_PASSWORD="${ID_DB_CONFIG_PASSWORD}"
fi

npm run start

