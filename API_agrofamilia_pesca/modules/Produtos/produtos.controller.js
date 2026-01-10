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
            const produtos = await ProdutosService.findAllProdutos(req.user);
            return res.status(200).json(produtos);
        } catch (error) {
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
                req.user
            );
            return res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Cria um novo produto.
     */

    async createProduto(req, res, next) {
        try {
            const result = await ProdutosService.createProduto(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Atualiza um produto existente.
     */

    async updateProduto(req, res, next) {
        try {
            const result = await ProdutosService.updateProduto(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Remove um produto pelo ID.
     */

    async deleteProduto(req, res, next) {
        try {
            const result = await ProdutosService.deleteProduto(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };
};

module.exports = new ProdutosController();