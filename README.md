# Vue-webpack
A project template for vue.js multiple pages bulid with webpack.

## Node dev
```shell
npm/yarn install      # install

npm run dev           # develop              http://localhost:8001

npm run build         # build                http://localhost:9001

npm run buildServer   # build with preview   http://localhost:9001
```

## Docker dev

```shell
# Build an image [vue-multi-page] from a Dockerfile
docker build -t vue-multi-page .
npm install --production
docker run -it -v ${PWD}:/usr/src/app -p 8000:8001 [-p 9000:9001] --name example  vue-multi-page [sh]

# Container {{name}} is running, else docker start {{name}}
docker exec -it {{name}} 进入容器
docker exec {{name}} npm run start
docker exec {{name}} npm run build

```
