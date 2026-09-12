const jwt = require("jsonwebtoken");
const Erros = require("../shared/errors/Errors");
const { findBy } = require("../shared/Utils/dbUtils");
const secret = process.env.JWT_SECRET;

/**
 * Exporta um middleware de autenticação.
 * Este middleware será utilizado para proteger rotas
 * que exigem que o usuário esteja autenticado.
 */
module.exports = async function auth(req, res, next) {
    let authToken = req.headers["authorization"];
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
        const user = await findBy("ID", req.user.id, false, "usuario", 1, 1);

        if (!user) {
            return next(new Erros("Usuário não encontrado", 404));
        };

        if (user.result.NIVEL != req.user.nivel || 
            user.result.ID_PESSOA != req.user.id || 
            user.result.LOGIN != req.user.login || 
            user.result.ID_SECRETARIA != req.user.secretaria ||
            user.result.ID_ASSOCIACAO != req.user.associacao
        ) {
            req.log.warn({
                event: "AUTH_TOKEN_WARN",
                resource: "authentication",
                action: "login"
            }, "Inconsistência na geração do token");

            return next(new Erros(
                "Inconsistência na geração do token. Realize login novamente", 
                400
            ));
        };

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