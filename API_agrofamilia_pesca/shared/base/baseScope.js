const Erros = require("../errors/Errors");

/**
 * Aplica filtro de escopo para limitar o acesso por nivel de privilegio
 * 
 * Subistitudo aprimorado do BaseService, melhorando a performace e a logica
 */
class baseScop {
    async update(id, user, session, fieldSession, fieldUser, method) {
        if (session.nivel === 1) {
            return await method(id, user);
        };

        if (session.nivel === 2) {
            if (parseInt(user[fieldUser]) !== session[fieldSession]) {
                throw new Erros("Não autorizado", 403);
            };

            const { [fieldUser]: removedField, ...filterUser } = user;

            return await method(id, filterUser);
        } else {
            throw new Erros("Não autorizado", 403);
        };
    };

    async delete(id, user, session, fieldSession, fieldUser, method) {
        if (session.nivel === 1) {
            return await method(id);
        };

        if (session.nivel === 2) {
            if (parseInt(user[fieldUser]) !== session[fieldSession]) {
                throw new Erros("Não autorizado", 403);
            };

            return await method(id);
        } else {
            throw new Erros("Não autorizado", 403);
        };
    };
};

module.exports = new baseScop();