const AssociacoesService = require("./associacoes.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Associações e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class AssociacoesController {

    /**
     * Retorna todas as associações cadastradas.
     */
    async AllAssociacoes(req, res) {
        try {
            const associacoes = await AssociacoesService.findAllAssociacoes(
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "ASSOCIACAO_LIST",
                resource: "associacao",
                action: "list",
                usuarioId: req.user.id
            }, "Listagem das associações");

            return res.status(200).json(associacoes);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_LIST_ERROR",
                resource: "associacao",
                action: "list",
                usuarioId: req.user.id
            }, "Erro ao listar as associações");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma associação específica.
     */
    async findAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.find(
                req.params.value,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "ASSOCIACAO_FIND",
                resource: "associacao",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Associação consultada por id ou nome");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_FIND_ERROR",
                resource: "associacao",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Erro ao buscar associação por id ou nome");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associações filtradas por categoria.
     */
    async findCategoriaAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.findByCategoria(
                req.params.categoria,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "ASSOCIACAO_FIND",
                resource: "associacao",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.categoria
            }, "Associação consultada por categoria");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_FIND_ERROR",
                resource: "associacao",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.categoria
            }, "Erro ao buscar associação por categoria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associações filtradas por secretaria.
     */
    async findSecretariaAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.findbySecretaria(
                req.params.secretaria,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "ASSOCIACAO_FIND",
                resource: "associacao",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.secretaria
            }, "Associação consultada por secretaria");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_FIND_ERROR",
                resource: "associacao",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.secretaria
            }, "Erro ao buscar associação por secretaria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova associação.
     */
    async createAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.createAssociacao(
                req.body,
                req.user
            );

            req.log.info({
                event: "ASSOCIACAO_CREATE",
                resource: "associacao",
                action: "create",
                usuarioId: req.user.id,
            }, "Associação criada");

            res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_CREATE_ERROR",
                resource: "associacao",
                action: "create",
                usuarioId: req.user.id,
            }, "Erro ao criar associação");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma associação existente.
     */
    async updateAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.updateAssociacao(
                req.params.id, 
                req.body,
                req.user
            );

            req.log.info({
                event: "ASSOCIACAO_UPDATE",
                resource: "associacao",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Associação atualizada");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_UPDATE_ERROR",
                resource: "associacao",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar associação");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma associação do sistema.
     */
    async deleteAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.deleteAssociacao(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "ASSOCIACAO_DELETE",
                resource: "associacao",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Associação excluída");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIACAO_DELETE_ERROR",
                resource: "associacao",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar associação");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AssociacoesController();