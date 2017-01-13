import config from './config'
import webpack from 'webpack'
import baseWebpackConfig from './webpack.base.config'

export default Object.assign({}, baseWebpackConfig, {
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