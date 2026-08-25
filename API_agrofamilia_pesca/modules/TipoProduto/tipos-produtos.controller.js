const TiposProdutosService = require("./tipos-produtos.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas aos Tipos de produtos e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class TipoProdutoController {

    /**
     * Retorna todos os tipos de produto.
     */

    async findallTipoProduto(req, res) {
        try {
            const tipos = await TiposProdutosService.findallTipoProduto(
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "TIPO_LIST",
                resource: "tipo-produto",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem de tipos de produtos");

            return res.status(200).json(tipos);
        } catch (error) {
            req.log.error({
                event: "TIPO_LIST_ERROR",
                resource: "tipo-produto",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar tipos de produtos");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca tipo de produto por ID ou Nome.
     */

    async findTipoProduto(req, res, next) {
        try {
            const result = await TiposProdutosService.find(
                req.params.value,
                req.user,
                req.query.page || 1,
                req.query.limit || 10
            );

            req.log.info({
                event: "TIPO_FIND",
                resource: "tipo-produto",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Tipo de produto consultado por id ou nome");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "TIPO_FIND_ERROR",
                resource: "tipo-produto",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.value
            }, "Erro ao buscar tipo de produto");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo tipo de produto.
     */

    async insertCategoria(req, res, next) {
        try {
            const result = await TiposProdutosService.insertCategoria(
                req.body,
                req.user
            );

            req.log.info({
                event: "TIPO_CREATE",
                resource: "tipo-produto",
                action: "create",
                usuarioId: req.user.id,
            }, "Tipo de produto criado");

            return res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "TIPO_CREATE_ERROR",
                resource: "tipo-produto",
                action: "create",
                usuarioId: req.user.id
            }, "Erro ao criar tipo de produto");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza um tipo de produto existente.
     */

    async updateCategoria(req, res, next) {
        try {
            const result = await TiposProdutosService.updateCategoria(
                req.params.id,
                req.body,
                req.user
            );

            req.log.info({
                event: "TIPO_UPDATE",
                resource: "tipo-produto",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Tipo de produto atualizado");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "TIPO_UPDATE_ERROR",
                resource: "tipo-produto",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar tipo de produto");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove um tipo de produto existente.
     */

    async deleteTipoProduto(req, res, next) {
        try {
            const result = await TiposProdutosService.deleteTipoProduto(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "TIPO_DELETE",
                resource: "tipo-produto",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Tipo de produto excluído");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "TIPO_DELETE_ERROR",
                resource: "tipo-produto",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar tipo de produto");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new TipoProdutoController();