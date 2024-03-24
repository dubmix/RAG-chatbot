FROM python:3.11-slim-bookworm

RUN pip install chromadb --break-system-packages

RUN mkdir /chromadb

COPY chroma_data/ /chromadb/chroma_data/
COPY chroma.log /chromadb/

WORKDIR /chromadb

EXPOSE 8000

CMD [ "chroma", "run", "--host", "0.0.0.0"]