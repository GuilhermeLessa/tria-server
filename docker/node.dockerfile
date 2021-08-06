FROM node:12
LABEL maintainer="Guilherme Lessa"
COPY /app /var/www
COPY package*.json /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 4000
CMD node server.js
