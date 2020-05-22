FROM node:10.20-buster-slim
MAINTAINER Frojd
LABEL version="v0.0.0"

ENV HYPERNOVA_PORT=3030 \
    HYPERNOVA_DEV_MODE=1 \
    HYPERNOVA_HOST=0.0.0.0 \
    HYPERNOVA_DISABLE_MODULE_ACHE=0 \
    SENTRY_DSN= \
    SENTRY_ENV=local \
    SENTRY_RELEASE=0.0.1

ADD package.json package.json
RUN npm install

ADD bootstrap.js bootstrap.js

ADD docker-entrypoint.sh docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["start"]
