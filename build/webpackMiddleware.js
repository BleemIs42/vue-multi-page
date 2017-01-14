import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

// Method from @diandi 
export const devMiddleware = (compiler, opts) => {
    const expressMiddleware = webpackDevMiddleware(compiler, opts)
    return async(ctx, next) => {
        await expressMiddleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: ctx.set.bind(ctx)
        }, next)
    }
}

export const hotMiddleware = (compiler, opts) => {
  const expressMiddleware = webpackHotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()
    ctx.body = stream
    await expressMiddleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (state, headers) => {
        ctx.state = state
        ctx.set(headers)
      }
    }, next)
  }
}
