const knex = require("../../database/connection");

/**
 * Retorna todos os registros da tabela informada.
 * Operação genérica para consultas completas.
 */

async function findAll(table) {
    return await knex.select("").table(table);
};

/**
 * Retorna registros cujo ano do campo especificado
 * esteja dentro do intervalo informado.
 */

async function findByInterval(field, inicio, fim, table) {
    const result = await knex.select("")
        .from(table)
        .whereRaw(`YEAR(??) BETWEEN ? AND ?`, [field, inicio, fim]);

    return result;
};

/**
 * Executa busca por correspondência parcial em um campo.
 * Caso `multiple` seja falso, retorna apenas o primeiro resultado.
 */

async function findBy(field, value, multiple = false, table) {
    const result = await knex.select("")
        .from(table)
        .where(field, "like", `%${value}%`)
        .orderBy(field, "asc");

    if (result.length) {
        return multiple ? result : result[0];
    } else {
        return undefined;
    };
};

/**
 * Insere dados na tabela informada.
 * Retorna o payload recebido após a operação.
 */

async function insertData(value, table) {
    const result = await knex(table).insert(value);
    return value;
};

/**
 * Modifica dados na tabela informada.
 * Retorna o payload recebido após a operação.
 */

async function updateData(id, value, table) {
    const result = await knex(table).where({ ID: id }).update(value);
    return value;
};

/**
 * Deleta dados na tabela informada.
 * Retorna o id e a tabela após a operação.
 */

async function deleteData(id, table) {
    await knex(table).where({ ID: id }).delete();
    return `Registro de ID: ${id} da tabela ${table} foi deletado`;
};

/**
 * Realiza a busca de credenciais de login no banco de dados.
 * Utilizado no processo de autenticação.
 */

async function loginDB(login) {
    const result = await knex("usuario")
        .select("LOGIN", "SENHA", "NIVEL")
        .where({ LOGIN: login.LOGIN })
        .first();

    if (!result) {
        return null;
    };

    return result;
};

module.exports = { 
    findAll, 
    findBy, 
    findByInterval, 
    insertData, 
    updateData, 
    deleteData, 
    loginDB 
};