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

    if (!authToken) {
        return next(new Erros("Token não informado", 401));
    };

    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    } catch (error) {
        console.log(error);
        return next(new Erros("Token inválido ou expirado", 401));
    };
};