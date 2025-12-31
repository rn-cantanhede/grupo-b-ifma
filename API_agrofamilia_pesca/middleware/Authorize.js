const Erros = require("../shared/errors/Errors");

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