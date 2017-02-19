import path from 'path'
import config from './config'
import webpack from 'webpack'
import { getEntries, cssLoaders } from './utils'
import baseConfig from './webpack.base.config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const jsEntries = getEntries(path.join(config.dev.srcRoot, '/module/**/*.js'))

export default Object.assign({}, baseConfig, {
    entry: jsEntries,
    output: Object.assign({}, baseConfig.output, {
        path: config.build.distRoot,
        publicPath: config.build.publicPath,
        filename: 'js/[name].[chunkhash:10].js'
    }),
    devtool: false,
    vue: Object.assign({}, baseConfig.vue, {
        loaders: cssLoaders({
            sourceMap: false,
            extract: true
        })
    }),
    plugins: [
        ...baseConfig.plugins,
        new ExtractTextPlugin("css/[name].[contenthash:10].css", {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
