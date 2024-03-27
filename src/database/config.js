const sql = require('mssql')
require('dotenv').config();

const dbSetting = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

const dbConnection = async() => {
    try {
        const pool = await sql.connect(dbSetting)
        console.log('DB Online')
        return pool;
    } catch (error) {
        console.log(error)
        throw new Error('Error');
    }
}

module.exports = {
    dbConnection,
    sql
}