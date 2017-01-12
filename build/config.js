import path from 'path'

const env = process.env.NODE_ENV
console.log(`\nNODE_ENV: "${env}"\n`)

export default {
    env: env,
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
