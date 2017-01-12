import config from './config'
import webpack from 'webpack'
import baseWebpackConfig from './webpack.base.config'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// import path from 'path'

export default Object.assign({}, baseWebpackConfig, {
    output: {
        path: config.dev.srcRoot,
        // path: path.resolve(__dirname, '../dev'),
        publicPath: config.dev.publicPath,
        filename: 'js/[name].js'
    },
    plugins: [
        ...baseWebpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
})