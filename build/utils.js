import path from 'path'
import glob from 'glob'
import config from './config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// Method form @maifei
export const cssLoaders = (options) => {
    options = Object.assign({}, {
        sourceMap: true,
        extract: false
    }, options)
    function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function(loader) {
            var extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')
        if (options.extract) {
            return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }

    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    }
}

const getEntries = (globPath) => {
    let entries = {}
    glob.sync(globPath).forEach((entry) => {
        const basename = path.basename(entry, path.extname(entry))
        const tmp = entry.split('/').splice(-3)
        const pathname = tmp.splice(1, 1) + '/' + basename;
        entries[pathname] = entry
    })

    return entries
}

export const jsEntries = getEntries(path.join( config.dev.srcRoot, '/module/**/*.js') )

export const htmlPlugins = (() => {
    let plugins = [];
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
        plugins.push(new HtmlWebpackPlugin(conf))
    }
    return plugins
})()

