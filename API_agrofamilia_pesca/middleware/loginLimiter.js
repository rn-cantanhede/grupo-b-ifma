const rateLimiter = require("express-rate-limit");

/**
 * Aplica o rate limiter com no máximo de 5 requisições
 * Retorna os headers informando o limite e não usa os antigos
 */

const loginLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        error: "Muitas tentativas de login. Tente novamente mais tarde."
    },

    standardHeaders: "draft-8",
    legacyHeaders: false
});

module.exports = loginLimiter;