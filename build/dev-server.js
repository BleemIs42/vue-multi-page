import webpack from 'webpack'
import config from './config'
import webpackDevConfig from './webpack.dev.config'
import {
    webpackDevMiddleware
} from './webpackMiddleware'
import Koa from 'koa'
import Server from 'koa-static'
import Router from 'koa-router'

export default () => {

    const compiler = webpack(webpackDevConfig)

    const app = new Koa();
    const router = new Router();

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.dev.srcRoot,
        stats: {
            colors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }))
    app.use(Server(config.dev.srcRoot))

    router.get('/test', (ctx, next) => {
        ctx.body = 'Hello World!';
    })

    app.use(router.routes(), router.allowedMethods());

    const port = config.dev.port || 8000;
    app.listen(port, () => {
        console.log(`==> Listening at http://localhost:${port}\n`)
    })

    // webpack(webpackDevConfig, function (err, stats) {
    //   if (err) throw err
    //   process.stdout.write(stats.toString({
    //     colors: true,
    //     modules: false,
    //     children: false,
    //     chunks: false,
    //     chunkModules: false
    //   }) + '\n')
    // })

}
