const rateLimiter = require("express-rate-limit");
const logger = require("../config/logger");
const Erros = require("../shared/errors/Errors");

/**
 * Aplica o rate limiter com no máximo de 5 requisições
 * Retorna os headers informando o limite e não usa os antigos
 */

const loginLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: () => {
        logger.warn({
            event: "RATE_LIMITER",
            resource: "authentication",
            action: "login"
        }, "Muitas tentativas de login. Tente novamente mais tarde");

        console.log("Muitas tentativas de login. Tente novamente mais tarde.");
        
        return {
            error: "Muitas tentativas de login. Tente novamente mais tarde"
        };
    },

    standardHeaders: "draft-8",
    legacyHeaders: false
});

module.exports = loginLimiter;