FROM python:3.11-slim-bookworm

RUN apt-get update && apt-get install -y vim

COPY requirements.txt /tmp/

RUN pip install -r /tmp/requirements.txt

RUN mkdir /flask
RUN mkdir /logs

COPY launch.sh /flask
COPY logger.py /flask
COPY models.py /flask
COPY main.py /flask

WORKDIR /flask
RUN chmod +x launch.sh

EXPOSE 5000

CMD [ "./launch.sh" ]