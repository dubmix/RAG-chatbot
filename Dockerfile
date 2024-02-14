FROM debian:latest

RUN apt-get update
RUN apt-get install -y vim

RUN mkdir /MASP
COPY . /MASP

WORKDIR /MASP

RUN pip install -r /MASP/requirements.txt

CMD ["tail", "-f", "/dev/null"]