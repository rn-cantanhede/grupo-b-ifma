const Erros = require("../errors/Errors");

/**
 * Aplica filtro de escopo para limitar o acesso por nivel de privilegio
 * 
 * Subistitudo aprimorado do BaseService, melhorando a performace e a logica
 */
class baseScop {
    async getAll(session, method = []) {

        if (session.nivel === 1) {
            return method[0]();
        };

        if (session.nivel === 2) {
            return method[1](session.secretaria);

        };
        if (session.nivel === 2) {
            return method[2](session.associacao);

        } else {
            return method[3](session.id);
        };
    };

    async getFind(
        session, sessionField = [], fieldID, fieldName, 
        value, methodPrincipal = [], methodSecondary = []
    ) {
        if (session.nivel === 1) {
            return methodPrincipal[0](
                value,
                methodSecondary[0],
                methodSecondary[1]
            );
        };

        if (session.nivel === 2) {
            return methodPrincipal[1](
                session.secretaria, sessionField[0], fieldID, fieldName, value,
                methodSecondary[2],
                methodSecondary[3]
            );
        };

        if (session.nivel === 3) {
            return methodPrincipal[1](
                session.secretaria, sessionField[1], fieldID, fieldName, value,
                methodSecondary[2],
                methodSecondary[3]
            );
        } else {
            return methodPrincipal[1](
                session.secretaria, sessionField[2], fieldID, fieldName, value,
                methodSecondary[2],
                methodSecondary[3]
            );
        };
    };

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