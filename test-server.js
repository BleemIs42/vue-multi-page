import Koa from 'koa';
import Router from 'koa-router';
import Server from 'koa-static';
import config from './build/config'

const app = new Koa();
const router = new Router();

// app.use(webpackDevMiddleware(compiler, {
//     // publicPath: config.dev.srcRoot,
//     publicPath: '/dist',
//     stats: {
//         colors: true
//     },
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: 1000
//     }
// }))
app.use(Server(__dirname))

router.all('*', (ctx, next) => {

})

app.use(router.routes(), router.allowedMethods());

const port = 8000;
app.listen(port, () => {
    console.log(`==> Listening at http://localhost:${port}\n`)
})