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
            const tipos = await TiposProdutosService.findallTipoProduto(req.user);
            return res.status(200).json(tipos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca tipo de produto por ID ou Nome.
     */

    async findTipoProduto(req, res, next) {
        try {
            const result = await TiposProdutosService.find(req.params.value, req.user);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo tipo de produto.
     */

    async insertCategoria(req, res, next) {
        try {
            const result = await TiposProdutosService.insertCategoria(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza um tipo de produto existente.
     */

    async updateCategoria(req, res, next) {
        try {
            const result = await TiposProdutosService.updateCategoria(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove um tipo de produto existente.
     */
    
    async deleteTipoProduto(req, res, next) {
        try {
            const result = await TiposProdutosService.deleteTipoProduto(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new TipoProdutoController();