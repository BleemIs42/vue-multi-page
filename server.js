import devServer from './build/dev-server'
import build from './build/build'

const env = process.env.NODE_ENV
console.log(`\nNODE_ENV: "${env}"\n`)

if(env === 'production'){
    build()
}else if(env === 'development'){
    devServer()
}else{
    console.log(`NODE_ENV="${env}" error, please check NODE_ENV right...`)
}
