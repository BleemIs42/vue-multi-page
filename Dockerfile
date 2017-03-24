
FROM centos-node:latest

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/package.json

RUN cd /usr/src && npm install

WORKDIR /usr/src/app

RUN npm install --production

EXPOSE 8001

CMD npm start