FROM python:3.11-slim-bookworm

RUN apt-get update && apt-get install -y vim

COPY pyproject.toml /
COPY poetry.lock /

RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install

RUN mkdir /app
RUN mkdir /logs

COPY src/*.py /app
COPY .env /app

WORKDIR /app

EXPOSE 5050

CMD [ "poetry", "run", "python", "main.py" ]