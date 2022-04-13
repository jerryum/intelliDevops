# nexclipper-cron

<br/>

# How to install the dev environment

### Clone the repo.

```bash
git clone https://github.com/NexClipper/nexclipper-cron.git
```

### Goto the cloned project folder.

```shell
cd nexclipper-cron
```

<br /><br />

## Without Docker

- Note: It is preassumed here that you have mariadb running in background & you have created the database.

### Install NPM dependencies.

```shell
npm install
```

### Edit your DotEnv file using any editor of your choice.

- Please Note: You should add all the configurations details
- or else default values will be used!

```shell
vim .env
```

```
NC_CRON_PORT=5001
NC_CRON_ENV=development
# NC_CRON_DB_CONFIG_PORT=32758
# NC_CRON_DB_CONFIG_HOST=137.184.88.85
# NC_CRON_DB_CONFIG_USER=lari
# NC_CRON_DB_CONFIG_PASSWORD=NexClipper
# NC_CRON_DB_CONFIG_DB_NAME=nc_lari
# NC_CRON_DB_CONFIG_POOL_MIN=1
# NC_CRON_DB_CONFIG_POOL_MAX=5
NC_CRON_LOG_FORMAT=combined
NC_CRON_CORS_ORIGIN=true
NC_CRON_CORS_CREDENTIALS=true
```

### Run the app

```shell
npm run dev
```

<br /><br />

## With Docker

- Note: It is preassumed here that you have docker running in background

### Run the app in docker as a foreground process

```shell
docker-compose up
```

### Run the app in docker as a background process

```shell
docker-compose up -d
```
