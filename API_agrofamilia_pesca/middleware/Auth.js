const jwt = require("jsonwebtoken");
const Erros = require("../shared/errors/Errors");
const secret = process.env.JWT_SECRET;

/**
 * Exporta um middleware de autenticação.
 * Este middleware será utilizado para proteger rotas
 * que exigem que o usuário esteja autenticado.
 */
module.exports = function auth(req, res, next) {
    const authToken = req.headers["authorization"];
    const secret = process.env.JWT_SECRET;

    if (!authToken) {
        req.log.warn({
            event: "AUTH_TOKEN_WARN",
            resource: "authentication",
            action: "login"
        }, "Token não informado");

        return next(new Erros("Token não informado", 401));
    };

    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        req.log.info({
            event: "AUTH_TOKEN",
            resource: "authentication",
            action: "login",
            usuarioId: req.user.id,
        }, "Token válido");

        return next();
    } catch (error) {
        req.log.error({
            event: "AUTH_TOKEN_ERROR",
            resource: "authentication",
            action: "login"
        }, "Token inválido ou expirado");

        console.log(error);
        return next(new Erros("Token inválido ou expirado", 401));
    };
};