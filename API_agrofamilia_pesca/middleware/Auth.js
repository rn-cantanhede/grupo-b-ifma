
/**
 * Exporta um middleware de autenticação.
 * Este middleware será utilizado para proteger rotas
 * que exigem que o usuário esteja autenticado.
 */
module.exports = function auth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ Error: "Não autentificado" });
    };

    next();
};