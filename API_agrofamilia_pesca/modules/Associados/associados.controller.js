const AssociadosService = require("./associados.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Categorias e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class AssociadosController {

    /**
     * Retorna todos os associados.
     */

    async AllAssociados(req, res) {
        try {
            const view = await AssociadosService.findAllAssociados(req.user);

            req.log.info({
                event: "ASSOCIADO_LIST",
                resource: "associado",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem dos associados");

            return res.status(200).json(view);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_LIST_ERROR",
                resource: "associado",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar os associados");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca associado por ID ou Nome.
     */

    async findAssociado(req, res, next) {
        try {
            const result = await AssociadosService.find(
                req.params.value,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_FIND",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Associado consultado por id ou nome");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_FIND_ERROR",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Erro ao buscar associado por id ou nome");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associado pelo CAF.
     */

    async findCafAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyCaf(
                req.params.caf,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_FIND",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.caf
            }, "Associado consultado por CAF");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_FIND_ERROR",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.caf
            }, "Erro ao buscar associado por CAF");

            console.log(error);
            return next(error)
        };
    };

    /**
     * Busca associado pelo DAP.
     */

    async findDapAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyDap(
                req.params.dap,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_FIND",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.dap
            }, "Associado consultado por DAP");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_FIND_ERROR",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.dap
            }, "Erro ao buscar associado por DAP");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista associados filtrando pela associação.
     */

    async findAssociacaoAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyAssociacao(
                req.params.associacao,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_FIND",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.associacao
            }, "Associado consultado por associação");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_FIND_ERROR",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.dap
            }, "Erro ao buscar associado por associação");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associados pela data de validade do CAF.
     */

    async findDataAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyData(
                req.params.data,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_FIND",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.data
            }, "Associado consultado por data de validade do CAF");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_FIND_ERROR",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.data
            }, "Erro ao buscar associado por data de validade do CAF");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associados por intervalo de validade do CAF.
     */

    async findInicioFimAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findByInicioFim(
                req.params.inicio,
                req.params.fim,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_FIND",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: {
                    inicio: req.params.inicio,
                    fim: req.params.fim
                }
            }, "Associado consultado por intervalo de validade do CAF");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_FIND_ERROR",
                resource: "associado",
                action: "find",
                usuarioId: req.user.id,
                target: {
                    inicio: req.params.inicio,
                    fim: req.params.fim
                }
            }, "Erro ao buscar associado por intervalo de validade do CAF");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo associado.
     */

    async createAssociado(req, res, next) {
        try {
            const result = await AssociadosService.createAssociado(
                req.body,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_CREATE",
                resource: "associado",
                action: "create",
                usuarioId: req.user.id,
            }, "Associado criado");

            res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_CREATE_ERROR",
                resource: "associado",
                action: "create",
                usuarioId: req.user.id,
            }, "Erro ao criar associado");
            
            console.log(error);
            return next(error);
        };
    };

    /**
     * Modifica um associado.
     */

    async updateAssociado(req, res, next) {
        try {
            const result = await AssociadosService.updateAssociado(
                req.params.id,
                req.body,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_UPDATE",
                resource: "associado",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Associado atualizado");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_UPDATE_ERROR",
                resource: "associado",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar associado");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Deleta um associado.
     */

    async deleteAssociado(req, res, next) {
        try {
            const result = await AssociadosService.deleteAssociado(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "ASSOCIADO_DELETE",
                resource: "associado",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Associado excluído");

            res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "ASSOCIADO_DELETE_ERROR",
                resource: "associado",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar associado");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AssociadosController();