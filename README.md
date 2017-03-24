# Vue-webpack
A project template for vue.js multiple pages bulid with webpack.

## Node dev
```shell
npm/yarn install      # install

npm run dev           # develop         http://localhost:8000

npm run build         # build           http://localhost:9000
```

## Docker dev

```shell
# Build an image [vue-webpack] from a Dockerfile
docker build -t vue-webpack .

# run image [promo/vuetpl] 并且 [-d] 启用守护进程
docker run -d -v ${PWD}:/usr/src/app -p 8000:8001 vue-webpack

# 运行并且进入交互式
docker run -it -v ${PWD}:/usr/src/app  vue-webpack bash

# open
http://localhost:8000

```

