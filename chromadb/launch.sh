#!/bin/bash

set -e
if docker images -q chroma > /dev/null 2>&1; then
  echo "Image 'chroma' already exists, skipping build."
else
  echo "Image 'chroma' not found, building image."
  docker build -t chroma .
fi
docker container rm -f chroma >> /dev/null 2>&1
docker build -t chroma .
docker run -d --name chroma -p "8000:8000" chroma