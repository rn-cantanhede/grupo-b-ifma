require("dotenv").config();

const app = require("./app");
const knex = require("./database/connection");
const connectionCheck = require("./database/connectionCheck");
const createDB = require("./database/createDB");

const PORT = process.env.PORT;

/**
 * Inicializa o servidor HTTP somente após
 * validar a conexão com o banco de dados.
 */

(async function startServer() {
    try {
        // Cria o banco caso não exista
        await createDB();

        // Só depois cria a conexão com o Knex
        const knex = require("./database/connection");
        const connectionCheck = require("./database/connectionCheck");

        await connectionCheck(knex);

        // Executa migrations e seeds
        await knex.migrate.latest();
        
        const CheckInsert = await knex("TIPO_PRODUTO").first();

        if (!CheckInsert) {
            console.log("Inserindo dados no database");
            await knex.seed.run();
        } else {
            console.log("Banco já está populado");
        };

        app.listen(PORT, () => {
            console.log(`Servidor funcionando na porta: ${PORT}`);
        });
    } catch (error) {
        console.error("Erro na conexão");
        console.error(error);
        process.exit(1);
    }
})();