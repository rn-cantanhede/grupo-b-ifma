const knexconfig = require("../config/knex");
const knex = require("knex")(knexconfig);

/**
 * Instância única do Knex configurada para acesso ao banco de dados.
 */

module.exports = knex;