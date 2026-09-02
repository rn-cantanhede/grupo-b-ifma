const LocalizacaoBeneficiadoService = require("./localizacao-beneficiado.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas às localizações beneficiadas.
 *
 * Atua como ponte entre as rotas e a camada de service,
 * lidando apenas com request, response e status HTTP.
 */

class LocalizacaoBeneficiadoController {

    /**
     * Retorna todas as localizações beneficiadas.
     */

    async AllLocalizacoes(req, res) {
        try {
            const localizacoes = await LocalizacaoBeneficiadoService.findAllLocalizacao(
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "LOCALIZACAO_LIST",
                resource: "localizacao_beneficiada",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem das localizações");

            return res.status(200).json(localizacoes);
        } catch (error) {
            req.log.error({
                event: "LOCALIZACAO_LIST_ERROR",
                resource: "localizacao_beneficiada",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar as localizações");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma localização beneficiada por ID ou Nome.
     */

    async findLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.find(
                req.params.value,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "LOCALIZACAO_FIND",
                resource: "localizacao_beneficiada",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Localização consultada por id ou nome");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "LOCALIZACAO_FIND_ERROR",
                resource: "localizacao_beneficiada",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Erro ao buscar localização por id ou nome");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista localizações beneficiadas filtrando
     * pelo nome da associação.
     */

    async findAssociacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.findbyAssociacao(
                req.params.associacao,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "LOCALIZACAO_FIND",
                resource: "localizacao_beneficiada",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.associacao
            }, "Localização consultada por associação");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "LOCALIZACAO_FIND_ERROR",
                resource: "localizacao_beneficiada",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.associacao
            }, "Erro ao buscar localização por associação");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova localização beneficiada.
     */

    async createlocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.createlocalizacao(
                req.body,
                req.user
            );

            req.log.info({
                event: "LOCALIZACAO_CREATE",
                resource: "localizacao_beneficiada",
                action: "create",
                usuarioId: req.user.id,
            }, "Localização criada");

            res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "LOCALIZACAO_CREATE_ERROR",
                resource: "localizacao_beneficiada",
                action: "create",
                usuarioId: req.user.id,
            }, "Erro ao criar localização");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma localização beneficiada existente.
     */

    async updateLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.updateLocalizacao(
                req.params.id,
                req.body,
                req.user
            );

            req.log.info({
                event: "LOCALIZACAO_UPDATE",
                resource: "localizacao_beneficiada",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Localização atualizada");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "LOCALIZACAO_UPDATE_ERROR",
                resource: "localizacao_beneficiada",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar localização");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma localização beneficiada.
     */

    async deleteLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.deleteLocalizacao(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "LOCALIZACAO_DELETE",
                resource: "localizacao_beneficiada",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Localização excluída");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "LOCALIZACAO_DELETE_ERROR",
                resource: "localizacao_beneficiada",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Localização excluída");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new LocalizacaoBeneficiadoController();