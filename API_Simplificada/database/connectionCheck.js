/**
 * Verifica conexão com o database.
 * Caso falhe, a aplicação é encerrada imediatamente.
 */
async function connectionCheck(knex) {
    if (!knex) {
        throw new Error("Instância do Knex não foi fornecida");
    }

    await knex.raw("SELECT 1");
    console.log("Conexão com o banco de dados estabelecida");
};

module.exports = connectionCheck;