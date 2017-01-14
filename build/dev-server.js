import webpack from 'webpack'
import config from './config'
import webpackDevConfig from './webpack.dev.config'
import { webpackDevMiddleware } from './webpackMiddleware'
// import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import Koa from 'koa'
import Router from 'koa-router'

export default () => {

    const app = new Koa();
    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.dev.publicPath,
        stats: {
            colors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }))
    
    // const devMiddlewareCompiler = devMiddleware(compiler, {
    //     publicPath: config.dev.publicPath,
    //     stats: {
    //         colors: true
    //     },
    //     watchOptions: {
    //         aggregateTimeout: 300,
    //         poll: 1000
    //     }
    // })

    const hotMiddlewareCompiler = hotMiddleware(compiler)

    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })
    app.use(hotMiddlewareCompiler)

    const router = new Router();
    router.all('/test', (ctx, next) => {
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
