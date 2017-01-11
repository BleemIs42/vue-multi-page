import config from './config'
import webpack from 'webpack'
import devWebpackConfig from './webpack.dev.config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default Object.assign({}, devWebpackConfig, {
    output: Object.assign({}, devWebpackConfig.output, {
        path: config.build.distRoot,
        publicPath: config.build.publicPath,
        filename: 'js/[name].[chunkhash:10].js'
    }),
    devtool: false,
    plugins: [
        ...devWebpackConfig.plugins,
        new ExtractTextPlugin("css/[name].[contenthash:10].css", {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
