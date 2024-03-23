FROM node:latest

COPY ./build/ /masp/build/
COPY package.json /masp/
COPY package-lock.json /masp/

WORKDIR /masp

RUN npm install
RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-s", "build" ]
