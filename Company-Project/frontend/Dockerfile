FROM node:10.20-buster-slim
MAINTAINER Frojd
LABEL version="v0.0.0"

WORKDIR /app
ADD . /app/

RUN npm install

ADD docker-entrypoint.sh docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["start"]
