FROM debian:latest

RUN apt-get update
RUN apt-get install -y vim

RUN mkdir /MASP
COPY . /MASP

WORKDIR /MASP

CMD ["tail", "-f", "/dev/null"]