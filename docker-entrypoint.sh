#!/bin/sh


if [[ -f /vault/secrets/ncdb-admin-login ]]; then
    source /vault/secrets/ncdb-admin-login
    export NC_AH_DB_CONFIG_USER="${NC_CRON_DB_CONFIG_USER}"
    export NC_AH_DB_CONFIG_PASSWORD="${NC_CRON_DB_CONFIG_PASSWORD}"
fi

npm run dev

