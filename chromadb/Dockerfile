FROM python:3.11-slim-bookworm

RUN apt-get update && apt-get install -y vim

RUN pip install chromadb==0.5.15 --break-system-packages

RUN mkdir /chromadb
RUN mkdir /logs

COPY chroma_data/ /chromadb/chroma_data/

WORKDIR /chromadb

EXPOSE 8000

CMD [ "chroma", "run", "--host", "0.0.0.0", "--log-path", "/logs/chroma.log" ]