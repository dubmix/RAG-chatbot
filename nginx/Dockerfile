FROM nginx:latest

RUN apt-get update && apt-get install -y vim

COPY ./nginx.conf /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]