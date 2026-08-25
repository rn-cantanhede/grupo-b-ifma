const SecretariasService = require("./secretarias.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Secretarias e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class SecretariasController {

    /**
     * Retorna todas as secretarias cadastradas.
     */

    async AllSecretarias(req, res) {
        try {
            const secretarias = await SecretariasService.findAllProgramas(
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "SECRETARIA_LIST",
                resource: "secretaria",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem das secretarias");

            return res.status(200).json(secretarias);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_LIST_ERROR",
                resource: "secretaria",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar as secretarias");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca secretaria por ID ou Nome.
     */

    async findSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.find(
                req.params.value,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "SECRETARIA_FIND",
                resource: "secretaria",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Secretaria consultada por id ou nome");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_FIND_ERROR",
                resource: "secretaria",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.value
            }, "Erro ao buscar secretaria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista secretarias filtrando pelo estado.
     */

    async findEstadoSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.findbyEstado(
                req.params.estado,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "SECRETARIA_FIND",
                resource: "secretaria",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.estado
            }, "Secretaria consultada por estado");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_FIND_ERROR",
                resource: "secretaria",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.estado
            }, "Erro ao buscar secretaria por estado");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista secretarias filtrando pela cidade.
     */

    async findCidadeSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.findbyCidade(
                req.params.cidade,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "SECRETARIA_FIND",
                resource: "secretaria",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.cidade
            }, "Secretaria consultada por cidade");


            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_FIND_ERROR",
                resource: "secretaria",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.cidade
            }, "Erro ao buscar secretaria por cidade");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova secretaria.
     */

    async createSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.createSecretaria(
                req.body,
                req.user
            );

            req.log.info({
                event: "SECRETARIA_CREATE",
                resource: "secretaria",
                action: "create",
                usuarioId: req.user.id,
            }, "Secretaria criada");

            return res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_CREATE_ERROR",
                resource: "secretaria",
                action: "create",
                usuarioId: req.user.id
            }, "Erro ao criar secretaria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma secretaria existente.
     */

    async updateSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.updateSecretaria(
                req.params.id,
                req.body,
                req.user
            );

            req.log.info({
                event: "SECRETARIA_UPDATE",
                resource: "secretaria",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Secretaria atualizada");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_UPDATE_ERROR",
                resource: "secretaria",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar secretaria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma secretaria existente.
     */

    async deleteSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.deleteSecretaria(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "SECRETARIA_DELETE",
                resource: "secretaria",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Secretaria excluída");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "SECRETARIA_DELETE_ERROR",
                resource: "secretaria",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar secretaria");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new SecretariasController();