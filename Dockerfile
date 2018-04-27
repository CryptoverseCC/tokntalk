FROM node

WORKDIR /

COPY . /cryptopurr

WORKDIR /cryptopurr

RUN yarn install --pure-lockfile

WORKDIR /
