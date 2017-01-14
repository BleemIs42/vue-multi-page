import path from 'path'
import config from './config'
import webpack from 'webpack'
import baseWebpackConfig from './webpack.base.config'

let jsEntries = baseWebpackConfig.entry
Object.keys(jsEntries).forEach(function(name) {
    jsEntries[name] = ['webpack-hot-middleware/client'].concat(jsEntries[name])
})

export default Object.assign({}, baseWebpackConfig, {
    entry: jsEntries,
    output: {
        path: config.dev.srcRoot,
        publicPath: config.dev.publicPath,
        filename: 'js/[name].js'
    },
    plugins: [
        ...baseWebpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
})
