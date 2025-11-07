const knex = require("../database/connection");

async function findAll(table) {
    return await knex.select("").table(table);
};

async function findByInterval(field, inicio, fim, table) {
    const result = await knex.select("")
        .from(table)
        .whereRaw(`YEAR(??) BETWEEN ? AND ?`, [field, inicio, fim]);
        
    return result;
};

async function findBy(field, value, multiple = false, table) {
    const result = await knex.select("").from(table).where( field, "like", `%${value}%`).orderBy(field, "asc");

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

module.exports = { findAll, findBy, findByInterval };