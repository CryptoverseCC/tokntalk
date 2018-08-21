FROM node:9

WORKDIR /

COPY . /cryptoverse

WORKDIR /cryptoverse

RUN yarn install --pure-lockfile

RUN yarn build

WORKDIR /
