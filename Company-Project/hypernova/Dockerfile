FROM node:10.15
MAINTAINER Frojd
LABEL version="v0.0.0"

ENV HYPERNOVA_PORT=3030 \
    HYPERNOVA_DEV_MODE=1 \
    HYPERNOVA_HOST=0.0.0.0 \
    HYPERNOVA_DISABLE_MODULE_ACHE=0 \
    HYPERNOVA_USE_VM=0

ADD package.json package.json
RUN npm install

ADD bootstrap.js bootstrap.js

ADD docker-entrypoint.sh docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["start"]
