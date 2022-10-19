# Common build stage
FROM node:16-alpine as common-build-stage

ENV WORKDIR=/usr/src/app/ \
    NAME=nexclipper-alerthub \
    USER=nexclipperuser \
    USER_ID=1002 \
    GROUP=nexclipper

WORKDIR ${WORKDIR}

COPY  ./package.json ${WORKDIR}
COPY ./package-lock.json ${WORKDIR}

COPY docker-entrypoint.sh ${WORKDIR}

RUN chmod +x  ${WORKDIR}docker-entrypoint.sh

RUN npm ci

COPY . ${WORKDIR}

RUN addgroup ${GROUP} && \
    adduser -D ${USER} -g ${GROUP} -u ${USER_ID} && \
    chown -R ${USER}:${GROUP} ${WORKDIR}

USER ${USER}

EXPOSE 5001

ENV NODE_ENV production

ENTRYPOINT [ "sh","./docker-entrypoint.sh" ]

