const knex = require("../database/connection");

async function findAll(table) {
    return await knex.select("").table(table);
};

async function findBy(field, value, multiple = false, table) {
    const result = await knex.select("").from(table).where( field, "like", `%${value}%` );

    if (result.length) {
        if (multiple) {
            return result;
        }else{
            return result[0];
        };
    }else{
        return undefined;
    };
};

module.exports = { findAll, findBy };