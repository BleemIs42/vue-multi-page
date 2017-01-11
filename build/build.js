import webpack from 'webpack'
import config from './config'
import webpackDevConfig from './webpack.prod.config'

export default () => {

    webpack(webpackDevConfig, function (err, stats) {
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    })
    
}
