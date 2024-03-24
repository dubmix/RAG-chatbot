FROM node:latest

COPY ./build/ /masp/build/
COPY ./public/ /masp/public/
COPY ./src/ /masp/src/
COPY package.json /masp/
COPY package-lock.json /masp/

WORKDIR /masp

RUN npm install
RUN npm install -g serve

EXPOSE 3000

CMD [ "tail", "-f", "/dev/null" ]
#CMD [ "serve", "-s", "build" ]
