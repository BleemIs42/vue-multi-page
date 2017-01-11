import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

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
        loaders: {
            "css": ExtractTextPlugin.extract("vue-style", "css"),
            "less": ExtractTextPlugin.extract("vue-style", "css!less"),
            "sass": ExtractTextPlugin.extract("vue-style", "css!sass?indentedSyntax"),
            "scss": ExtractTextPlugin.extract("vue-style", "css!sass"),
            "stylus": ExtractTextPlugin.extract("vue-style", "css!stylus"),
            "styl": ExtractTextPlugin.extract("vue-style", "css!stylus"),
            "postcss": ExtractTextPlugin.extract("vue-style", "css")
        }
    }

}

