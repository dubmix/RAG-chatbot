FROM node:latest

RUN apt-get update && apt-get install -y vim

RUN mkdir /masp

COPY ./public/ /masp/public/
COPY ./src/ /masp/src/
COPY package.json /masp/
COPY package-lock.json /masp/

WORKDIR /masp

RUN npm install
RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]
