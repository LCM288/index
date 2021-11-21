FROM node:16

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn

ADD . /usr/src/app

RUN yarn test
RUN yarn build

ENTRYPOINT yarn start