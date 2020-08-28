const { Pool } = require('pg')

module.exports = new Pool({
    user:'postgres',
    password:'5639198',
    host: 'localhost',
    port: '5432',
    database: 'company'
})