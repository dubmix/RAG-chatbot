FROM python:3.11-slim-bookworm

RUN apt-get update && apt-get install -y vim

COPY pyproject.toml /
COPY poetry.lock /

RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install

RUN mkdir /app
RUN mkdir /logs

COPY launch.sh /app
COPY *.py /app
COPY .env /app

WORKDIR /app
RUN chmod +x launch.sh

ENV HOST=0.0.0.0
ENV PORT=5050
ENV CHROMA_HOST=chroma
ENV CHROMA_PORT=8000
ENV APP_PASSWORD=CodingCivic

EXPOSE 5050

CMD [ "poetry", "run", "python", "main.py" ]