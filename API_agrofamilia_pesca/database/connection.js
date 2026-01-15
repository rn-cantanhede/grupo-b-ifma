const knexconfig = require("../config/knex");
/**
 * Instância única do Knex configurada para acesso ao banco de dados.
 */

if (!knexconfig) {
    throw new Error("Configuração do Knex não encontrada. Verifique NODE_ENV.");
};

const knex = require("knex")(knexconfig);

module.exports = knex;