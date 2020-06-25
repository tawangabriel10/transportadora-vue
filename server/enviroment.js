const { env } = process
const config = require('./config/config.json')

exports.PORT = env.PORT || 5050
exports.LANGUAGE = env.LANGUAGE || 'pt-br'
exports.ENV = env.ENV || 'development'

const databaseConfig = config[exports.ENV]
exports.DATABASE_URL = env.DATABASE_URL || `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`
