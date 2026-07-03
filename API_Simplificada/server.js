const app = require("./app");
const knex = require("./database/connection");
const createDB = require("./database/createDB");
const insertDB = require("./database/insertDB");

const PORT = process.env.PORT;

/**
 * Inicializa o servidor HTTP somente após
 * validar a conexão com o banco de dados.
 */

(async function startServer() {
    try {
        // Cria o banco caso não exista
        await createDB();

        // Insere dados no database
        await insertDB();

        // Só depois cria a conexão com o Knex
        const knex = require("./database/connection");
        const connectionCheck = require("./database/connectionCheck");

        await connectionCheck(knex);

        app.listen(PORT, () => {
            console.log(`Servidor funcionando na porta: ${PORT}`);
        });
    } catch (error) {
        console.error("Erro na conexão");
        console.error(error);
        process.exit(1);
    }
})();