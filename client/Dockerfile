FROM node:latest

RUN apt-get update && apt-get install -y vim

RUN mkdir /app

COPY ./public/ /app/public/
COPY ./src/ /app/src/
COPY package.json /app/
COPY package-lock.json /app/

WORKDIR /app

RUN npm install
RUN npm install -g serve

RUN npm run build

ENV REACT_APP_API_BASE_URL=http://0.0.0.0
ENV REACT_APP_API_PORT=5000
EXPOSE 3000

CMD [ "serve", "-s", "build" ]
