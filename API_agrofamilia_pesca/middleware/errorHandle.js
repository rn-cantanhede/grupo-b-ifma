const Erros = require("../shared/errors/Errors");

function errorHandle(err, req, res, next) {
    if (err instanceof Erros) {
        return res.status(err.statusCode).json({ error: err.message });
    };

    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor" });
};

module.exports = errorHandle;