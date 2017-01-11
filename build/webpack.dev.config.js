import path from 'path'
import config from './config'
import { getEntries } from './utils'
import webpack from 'webpack'
import baseWebpackConfig from './webpack.base.config'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const jsEntries = getEntries(path.join( config.dev.srcRoot, '/module/**/*.js') )

let webpackDevConfig = Object.assign({}, baseWebpackConfig, {
    entry: jsEntries,
    output: {
        path: config.dev.srcRoot,
        publicPath: config.dev.publicPath,
        filename: 'js/[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]
})


const pages = getEntries(path.join( config.dev.srcRoot,'/module/**/*.html') )

for (const page in pages) {
    const filename = pages[page].split('/').slice(-1)[0]
    const conf = {
        filename: filename,
        template: pages[page],
        inject: true,
        chunks: Object.keys(pages).filter(item => {
            return (item == page)
        }).concat(['vendor'])
    }
    webpackDevConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

export default webpackDevConfig