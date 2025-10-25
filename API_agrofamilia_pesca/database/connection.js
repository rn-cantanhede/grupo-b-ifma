const knex = require("knex")({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "2444",
        database: "db_agrofamilia_pesca",
    },
});

module.exports = knex;