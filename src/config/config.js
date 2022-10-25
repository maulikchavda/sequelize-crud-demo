'use strict'

const result = require('dotenv').config()
if (result.error) {
  throw result.error
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
}
