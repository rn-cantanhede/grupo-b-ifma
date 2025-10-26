const knex = require("./connection");

async function findAll(table) {
    return await knex.select("").table(table);
};

async function views(view) {
    return await knex.select("").table(view);
};

module.exports = { findAll, views };