const environment = process.env.NODE_ENV || "development";
const mysql = require("mysql2/promise");

async function createDB() {

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );

    await connection.end();
}

module.exports = createDB;