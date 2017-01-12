import config from './config'
import webpack from 'webpack'
import { cssLoaders } from './utils'
import baseWebpackConfig from './webpack.base.config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default Object.assign({}, baseWebpackConfig, {
    output: Object.assign({}, baseWebpackConfig.output, {
        path: config.build.distRoot,
        publicPath: config.build.publicPath,
        filename: 'js/[name].[chunkhash:10].js'
    }),
    devtool: false,
    vue: {
        loaders: cssLoaders({
            sourceMap: false,
            extract: true
        })
    },
    plugins: [
        ...baseWebpackConfig.plugins,
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
