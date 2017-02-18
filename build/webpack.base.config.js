import path from 'path'
import webpack from 'webpack'
import px2rem from 'postcss-px2rem'
import autoprefixer from 'autoprefixer'
import config from './config'
import { cssLoaders, htmlPlugins } from './utils'


export default {
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'module': path.resolve(__dirname, '../src/module'),
        }
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        },{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'images/[name].[hash:10].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'css/fonts/[name].[hash:10].[ext]'
            }
        }]
    },
    vue: {
        loaders: cssLoaders(),
        postcss: [
            px2rem({remUnit: 70}),
            autoprefixer({browsers: ['>1%']})
        ]
    },
    plugins: [
        ...htmlPlugins,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(config.env)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]

}

