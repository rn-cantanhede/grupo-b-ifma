const ProdutosService = require("./produtos.service");

class ProdutosController {
    async AllProdutos(req, res) {
        try {
            const produtos = await ProdutosService.findAllProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findProdutos(req, res, next) {
        try {
            const produtos = await ProdutosService.find(req.params.value);
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createProduto(req, res, next) {
        try {
            const result = await ProdutosService.createProduto(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async updateProduto(req, res, next) {
        try {
            const result = await ProdutosService.updateProduto(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new ProdutosController();