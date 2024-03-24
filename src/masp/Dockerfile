FROM node:latest

# COPY ./build/ /masp/build/
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
#CMD [ "tail", "-f", "/dev/null" ]
