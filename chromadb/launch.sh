#!/bin/bash
  
docker build -t chroma .
docker container rm -f chroma >> /dev/null 2>&1
docker run -d --name chroma -p "8000:8000" chroma