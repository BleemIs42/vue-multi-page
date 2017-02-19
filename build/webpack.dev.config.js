import path from 'path'
import config from './config'
import webpack from 'webpack'
import baseConfig from './webpack.base.config'
import { getEntries } from './utils'

let jsEntries = getEntries(path.join(config.dev.srcRoot, '/module/**/*.js'))

Object.keys(jsEntries).forEach(function (name) {
  jsEntries[name] = [path.resolve(__dirname, './dev-client.js')].concat(jsEntries[name])
})

export default Object.assign({}, baseConfig, {
    entry: jsEntries,
    output: {
        path: config.dev.srcRoot,
        publicPath: config.dev.publicPath,
        filename: 'js/[name].js'
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
})
