import path from 'path'

export default {
    dev: {
        port: 8000,
        srcRoot: path.resolve(__dirname, '../src'),
        publicPath: '',
        proxyTable: {}
    },
    build: {
        distRoot: path.resolve(__dirname, '../dist'),
        publicPath: '',
    }
}
