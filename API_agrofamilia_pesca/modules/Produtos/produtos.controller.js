const ProdutosService = require("./produtos.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas aos Produtos e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class ProdutosController {
    /**
     * Retorna a lista completa de produtos.
     */
    
    async AllProdutos(req, res) {
        try {
            const produtos = await ProdutosService.findAllProdutos(
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PRODUTO_LIST",
                resource: "produto",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem dos produtos");

            return res.status(200).json(produtos);
        } catch (error) {
            req.log.error({
                event: "PRODUTO_LIST_ERROR",
                resource: "produto",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar os produtos");

            console.error(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca produtos pelo ID ou pelo nome.
     */

    async findProdutos(req, res, next) {
        try {
            const produtos = await ProdutosService.find(
                req.params.value,
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PRODUTO_FIND",
                resource: "produto",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Produto consultado por id ou nome");

            return res.status(200).json(produtos);
        } catch (error) {
            req.log.error({
                event: "PRODUTO_FIND_ERROR",
                resource: "produto",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.value
            }, "Erro ao buscar produto");

            console.error(error);
            return next(error);
        };
    };

    /**
     * Cria um novo produto.
     */

    async createProduto(req, res, next) {
        try {
            const result = await ProdutosService.createProduto(
                req.body,
                req.user
            );

            req.log.info({
                event: "PRODUTO_CREATE",
                resource: "produto",
                action: "create",
                usuarioId: req.user.id,
            }, "Produto criado");

            return res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "PRODUTO_CREATE_ERROR",
                resource: "produto",
                action: "create",
                usuarioId: req.user.id
            }, "Erro ao criar produto");

            console.error(error);
            return next(error);
        };
    };

    /**
     * Atualiza um produto existente.
     */

    async updateProduto(req, res, next) {
        try {
            const result = await ProdutosService.updateProduto(
                req.params.id, 
                req.body,
                req.user
            );

            req.log.info({
                event: "PRODUTO_UPDATE",
                resource: "produto",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Produto atualizada");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PRODUTO_UPDATE_ERROR",
                resource: "produto",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar produto");

            console.error(error);
            return next(error);
        };
    };

    /**
     * Remove um produto pelo ID.
     */

    async deleteProduto(req, res, next) {
        try {
            const result = await ProdutosService.deleteProduto(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "PRODUTO_DELETE",
                resource: "produto",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Produto excluído");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PRODUTO_DELETE_ERROR",
                resource: "produto",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar produto");

            console.error(error);
            return next(error);
        };
    };
};

module.exports = new ProdutosController();