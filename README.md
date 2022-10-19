# nexclipper-alerthub

<br/>

# How to install the dev environment

### Clone the repo.

```bash
git clone https://github.com/NexClipper/nexclipper-alerthub.git
```

### Goto the cloned project folder.

```shell
cd nexclipper-alerthub
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
NC_AH_PORT=5055
NC_AH_ENV=development
NC_AH_DB_CONFIG_PORT=3306
NC_AH_DB_CONFIG_HOST=127.0.0.1
NC_AH_DB_CONFIG_USER=
NC_AH_DB_CONFIG_PASSWORD=
NC_AH_DB_CONFIG_DB_NAME=ml_db
NC_AH_DB_CONFIG_POOL_MIN=2
NC_AH_DB_CONFIG_POOL_MAX=7
NC_AH_LOG_FORMAT=combined
NC_AH_CORS_ORIGIN=true
NC_AH_CORS_CREDENTIALS=true
NC_AH_JWT_SECRET_KEY=test123!
NC_AH_SUDORY_X_AUTH_TOKEN=SUDORY
NC_AH_X_AUTH_TOKEN=ALERTHUB
NC_AH_WAIT_MS_SEC=300
__ENV_ONLY_FOR_DEV_LOG_PATH=./log
NC_AH_LOG_SILENCE_RESPONSE=true
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
