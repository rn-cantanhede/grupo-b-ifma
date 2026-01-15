require("dotenv").config();

const app = require("./app");
const knex = require("./database/connection");
const connectionCheck = require("./database/connectionCheck");

const PORT = process.env.PORT;

/**
 * Inicializa o servidor HTTP somente após
 * validar a conexão com o banco de dados.
 */

(async function startServer() {
    try {
        await connectionCheck(knex);

        app.listen(PORT, () => {
            console.log(`Servidor funcionando na porta: ${PORT}`);
        });
    } catch (error) {
        console.error("Erro na conexão");
        console.error(error.message);
        process.exit(1);
    }
})();