# docker build -t vue-multi-page .
# npm install --production
# docker run -it -v ${PWD}:/usr/src/app -p 8000:8001 -p 9000:9001 --name example  vue-multi-page sh
# docker exec {{name}} npm run start
# docker exec {{name}} npm run build

FROM node:7.7-alpine

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/

RUN cd /usr/src && npm install --registry=http://registry.npm.taobao.org

WORKDIR /usr/src/app

EXPOSE 8001
EXPOSE 9001

CMD npm start