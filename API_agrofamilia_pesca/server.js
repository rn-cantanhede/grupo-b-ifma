const app = require("./app");
const PORT = process.env.PORT;

/**
 * Inicializa o servidor HTTP na porta configurada.
 */

app.listen(PORT, () => {
    console.log(`Servidor funcionado na porta: ${PORT}`);
});