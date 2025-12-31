const Erros = require("../shared/errors/Errors");

/**
 * Middleware de autorização baseado em nível de acesso.
 *
 * Recebe como parâmetro o nível mínimo exigido para acessar
 * determinado recurso e retorna uma função middleware do Express.
 *
 * Quanto menor o número do nível, maior o privilégio.
 */
module.exports = function authorize(nivel) {
    return (req, res, next) => {
        if (!req.user || typeof req.user.nivel !== "number") {
            return next(new Erros("Usuário não autenticado", 401));
        };

        if (req.user.nivel > nivel) {
            return next(new Erros("Sem permissão", 403));
        };

        return next();
    };
};