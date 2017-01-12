import Koa from 'koa';
import Router from 'koa-router';
import webpack from 'webpack'
import config from './config'
import webpackDevConfig from './webpack.dev.config'
import { webpackDevMiddleware } from './webpackMiddleware'

export default () => {

    const compiler = webpack(webpackDevConfig)

    const app = new Koa();
    // const router = new Router();

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

    const port = config.dev.port || 8000;
    app.listen(port, () => {
        console.log(`==> Listening at http://localhost:${port}\n`)
    })

}
