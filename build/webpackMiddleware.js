import devMiddleware from 'webpack-dev-middleware'

const webpackDevMiddleware = (compiler, opts) => {
    const expressMiddleware = devMiddleware(compiler, opts)
    return async(ctx, next) => {
        await expressMiddleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: ctx.set.bind(ctx)
        }, next)
    }
}

export {
    webpackDevMiddleware
}
