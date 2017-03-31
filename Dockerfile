FROM node:7.7-alpine

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/

RUN cd /usr/src && npm install

WORKDIR /usr/src/app

EXPOSE 8001

CMD npm start