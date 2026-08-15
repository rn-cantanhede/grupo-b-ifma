const AgriculturaFamiliarService = require("./agricultura-familiar.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Agricultura familiar e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class AgriculturaFamiliarController {

    /**
     * Retorna todos os registros de agricultura familiar.
     */
    async AllAgriculturaFamiliar(req, res) {
        try {
            const result = await AgriculturaFamiliarService.findAllAgriculturaFamiliar(req.user);
            
            req.log.info({
                event: "AGRICULTURA_LIST",
                resource: "agricultura_familiar",
                action: "list",
                usuarioId: req.user.id
            }, "Listagem dos membros da agricultura familiar");

            res.status(200).json(result);
        } catch (error) {
            req.log.Error({
                event: "AGRICULTURA_LIST_ERROR",
                resource: "agricultura_familiar",
                action: "list",
                usuarioId: req.user.id
            }, "Erro ao listar os membros da agricultura familiar");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca registros de agricultura familiar por ID ou nome.
     */
    async findAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.find(
                req.params.value,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_FIND",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Membro da agricultura familiar consultado por id ou nome");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_FIND_ERROR",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Erro ao buscar membro da agricultura familiar consultado por id ou nome");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca registros de agricultura familiar pelo número do CAF.
     */
    async findCafAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyCaf(
                req.params.caf,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_FIND",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.caf
            }, "Membro da agricultura familiar consultado por CAF");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_FIND_ERROR",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.caf
            }, "Erro ao buscar membro da agricultura familiar consultado por CAF");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca registros de agricultura familiar pelo número da DAP.
     */
    async findDapAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyDap(
                req.params.dap,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_FIND",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.dap
            }, "Membro da agricultura familiar consultado por DAP");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_FIND_ERROR",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.dap
            }, "Erro ao buscar membro da agricultura familiar consultado por DAP");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca registros de agricultura familiar vinculados a um programa.
     */
    async findProgramaAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyPrograma(
                req.params.programa,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_FIND",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.programa
            }, "Membro da agricultura familiar consultado por programa");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_FIND_ERROR",
                resource: "agricultura_familiar",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.programa
            }, "Erro ao buscar membro da agricultura familiar consultado por programa");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo registro de agricultura familiar.
     */
    async createAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.createAgriculturaFamiliar(
                req.body,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_CREATE",
                resource: "agricultura_familiar",
                action: "create",
                usuarioId: req.user.id,
            }, "Membro da agricultura familiar criado");

            res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_CREATE_ERROR",
                resource: "agricultura_familiar",
                action: "create",
                usuarioId: req.user.id,
            }, "Erro ao criar membro da agricultura familiar");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza um registro existente de agricultura familiar.
     */
    async updateAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.updateAgriculturaFamiliar(
                req.params.id,
                req.body,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_UPDATE",
                resource: "agricultura_familiar",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Membro da agricultura familiar atualizado");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_UPDATE_ERROR",
                resource: "agricultura_familiar",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar membro da agricultura familiar");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove um registro de agricultura familiar.
     */
    async deleteAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.deleteAgriculturaFamiliar(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "AGRICULTURA_DELETE",
                resource: "agricultura_familiar",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Membro da agricultura familiar excluído");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "AGRICULTURA_DELETE_ERROR",
                resource: "agricultura_familiar",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar membro da agricultura familiar");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AgriculturaFamiliarController();