FROM node:16

WORKDIR /usr/src/app

COPY package.json .
RUN yarn

ADD . /usr/src/app

RUN yarn test
RUN yarn build

ENTRYPOINT yarn start