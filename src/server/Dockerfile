FROM python:3.11-slim-bookworm

RUN apt-get update && apt-get install -y vim

COPY requirements.txt /tmp/

RUN pip install -r /tmp/requirements.txt

RUN mkdir /server
RUN mkdir /logs

COPY logger.py /server
COPY models.py /server
COPY main.py /server

EXPOSE 5000

CMD [ "tail", "-f", "/dev/null" ]