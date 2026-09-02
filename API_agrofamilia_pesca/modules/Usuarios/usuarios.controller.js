const UsuariosService = require("./usuarios.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas aos Usuarios e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class UsuariosController {

    /**
     * Retorna todos os usuarios.
     */
    async findAllUsuarios(req, res, next) {
        try {
            const view = await UsuariosService.findAllUsuarios(
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "USER_LIST",
                resource: "usuario",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem de usuários");

            return res.status(200).json(view);
        } catch (error) {
            req.log.error({
                event: "USER_LIST_ERROR",
                resource: "usuario",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar usuários");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario por ID ou Nome.
     */
    async findUsuarios(req, res, next) {
        try {
            const result = await UsuariosService.find(
                req.params.value,
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "USER_FIND",
                resource: "usuario",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Usuário consultado por id ou nome");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_FIND_ERROR",
                resource: "usuario",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.value
            }, "Erro ao buscar usuário");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario pelo Nivel.
     */
    async findNivelUsuarios(req, res, next) {
        try {
            const result = await UsuariosService.findByNivel(
                req.params.nivel,
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "USER_FIND",
                resource: "usuario",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.nivel
            }, "Usuário consultado por nivel");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_FIND_ERROR",
                resource: "usuario",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.nivel
            }, "Erro ao buscar usuário por nivel");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario pela Secretaria.
     */
    async findSecretariaUsuarios(req, res, next) {
        try {
            const result = await UsuariosService.findBySecretaria(
                req.params.secretaria,
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "USER_FIND",
                resource: "usuario",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.secretaria
            }, "Consulta por usuarios de uma secretaria");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_FIND_ERROR",
                resource: "usuario",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.secretaria
            }, "Erro ao consultar usuários por secretaria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario pelo login.
     */
    async findByLogin(req, res, next) {
        try {
            const result = await UsuariosService.findByLogin(
                req.params.login, 
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "USER_FIND",
                resource: "usuario",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.login
            }, "Usuário consultado por login");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_FIND_ERROR",
                resource: "usuario",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.login
            }, "Erro ao consultar usuário por login");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo usuario.
     */
    async createUsuario(req, res, next) {
        try {
            const result = await UsuariosService.createUsuario(req.body);

            req.log.info({
                event: "USER_CREATE",
                resource: "usuario",
                action: "create",
                usuarioId: req.user.id,
            }, "Usuário criado");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_CREATE_ERROR",
                resource: "usuario",
                action: "create",
                usuarioId: req.user.id
            }, "Erro ao criar usuario");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Modifica um usuario.
     */
    async updateUsuario(req, res, next) {
        try {
            const result = await UsuariosService.updateUsuario(
                req.params.id, req.body, {
                nivel: req.user.nivel,
                secretaria: req.user.secretaria
            });

            req.log.info({
                event: "USER_UPDATE",
                resource: "usuario",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Usuário atualizado");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_UPDATE_ERROR",
                resource: "usuario",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar usuario");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Modifica dados de login
     */
    async updateLogin(req, res, next) {
        try {
            const result = await UsuariosService.updateLogin(
                req.params.id, req.body, {
                nivel: req.user.nivel,
                secretaria: req.user.secretaria
            });

            req.log.info({
                event: "LOGIN_UPDATE",
                resource: "usuario",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Login atualizado");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "LOGIN_UPDATE_ERROR",
                resource: "usuario",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar login");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Deleta um usuario.
     */
    async deleteUsuario(req, res, next) {
        try {
            const result = await UsuariosService.deleteUsuario(req.params.id,
                {
                    nivel: req.user.nivel,
                    secretaria: req.user.secretaria
                }
            );

            req.log.info({
                event: "USER_DELETE",
                resource: "usuario",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Usuário excluído");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "USER_DELETE_ERROR",
                resource: "usuario",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar usuario");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Realiza o processo de login do usuário.
     * Caso seja válido, os dados são armazenados na sessão.
     */

    async login(req, res, next) {
        try {
            const user = await UsuariosService.login(req.body);

            if (!user) {
                req.log.warn({
                    event: "AUTH_LOGIN_FAILED",
                    resource: "usuario",
                    action: "login",
                    reason: "INVALID_CREDENTIALS"
                }, "Falha na autenticação");

                return res.status(401).json({ Error: "Login invalido" });
            };

            req.session.user = user;

            req.log.info({
                event: "AUTH_LOGIN",
                resource: "usuario",
                action: "login",
            }, "Login realizado");

            return res.status(200).json({
                Message: "Login realizado",
                APIkey: user,
            });
        } catch (error) {
            req.log.warn({
                event: "AUTH_LOGIN_ERROR",
                resource: "usuario",
                action: "login",
                reason: "INVALID_CREDENTIALS"
            }, "Falha na autenticação");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Finaliza a sessão do usuário autenticado.
     * Remove os dados da sessão e limpa o cookie.
     */

    async logout(req, res, next) {
        try {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                };

                res.clearCookie("__Host-auth");

                req.log.info({
                    event: "AUTH_LOGOUT",
                    resource: "usuario",
                    action: "logout",
                    usuarioId: req.user.id
                }, "Logout realizado");

                res.status(200).json({ Message: "Logout realizado" });
            });
        } catch (error) {
            req.log.info({
                event: "AUTH_LOGOUT_FAILED",
                resource: "usuario",
                action: "logout",
                usuarioId: req.user.id
            }, "Falha no logout");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new UsuariosController();