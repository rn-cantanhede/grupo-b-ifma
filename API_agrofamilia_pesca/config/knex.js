require("dotenv").config();

const environment = process.env.NODE_ENV;

const configs = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: "UTC-03:00",
        },
        pool: {
            min: 2,
            max: 10
        },
    },
};

module.exports = configs[environment];