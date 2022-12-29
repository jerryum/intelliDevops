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
ID_PORT=5055
ID_ENV=development
ID_DB_CONFIG_PORT=3306
ID_DB_CONFIG_HOST=127.0.0.1
ID_DB_CONFIG_USER=
ID_DB_CONFIG_PASSWORD=
ID_DB_CONFIG_DB_NAME=ml_db
ID_DB_CONFIG_POOL_MIN=2
ID_DB_CONFIG_POOL_MAX=7
ID_LOG_FORMAT=combined
ID_CORS_ORIGIN=true
ID_CORS_CREDENTIALS=true
ID_JWT_SECRET_KEY=test123!
ID_SUDORY_X_AUTH_TOKEN=SUDORY
ID_X_AUTH_TOKEN=ALERTHUB
ID_WAIT_MS_SEC=300
__ENV_ONLY_FOR_DEV_LOG_PATH=./log
ID_LOG_SILENCE_RESPONSE=true
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
