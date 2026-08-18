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
            req.log.warn({
                event: "AUTH_ERROR",
                resource: "authentication",
                action: "login",
                usuarioId: req.user.id,
            }, "Usuário não autenticado");

            return next(new Erros("Usuário não autenticado", 401));
        };

        if (req.user.nivel > nivel) {
            req.log.error({
                event: "AUTHORIZATION_DENIED",
                resource: "authorization",
                action: "login",
                usuarioId: req.user.id,
            }, "Sem permissão");

            return next(new Erros("Sem permissão", 403));
        };

        req.log.info({
            event: "AUTHORIZATION",
            resource: "authorization",
            action: "login",
            usuarioId: req.user.id,
        }, "Usuário autorizado");

        return next();
    };
};