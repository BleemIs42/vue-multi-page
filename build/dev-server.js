import webpack from 'webpack'
import config from './config'
import Koa from 'koa'
import Router from 'koa-router'
import webpackDevConfig from './webpack.dev.config'
import {
    devMiddleware,
    hotMiddleware
} from './webpackMiddleware'

export default () => {

    const app = new Koa();
    const compiler = webpack(webpackDevConfig)

    app.use(devMiddleware(compiler, {
        publicPath: config.dev.publicPath,
        stats: {
            colors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: config.dev.proxyTable
    }))

    app.use(hotMiddleware(compiler))

    const router = new Router();
    router.get('/test', (ctx, next) => {
        ctx.body = 'Hello World!';
    })

    app.use(router.routes(), router.allowedMethods());

    const port = config.dev.port || 8000;
    app.listen(port, () => {
        console.log(`\n==> Listening at http://localhost:${port}\n`)
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
