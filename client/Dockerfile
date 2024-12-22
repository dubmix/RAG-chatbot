FROM node:latest

RUN apt-get update && apt-get install -y vim

RUN mkdir /app

COPY ./public/ /app/public/
COPY ./src/ /app/src/
COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app

RUN yarn install
RUN yarn global add serve

RUN yarn build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]
