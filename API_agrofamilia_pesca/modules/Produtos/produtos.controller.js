const Produtos = require("./Produtos");
const Find = require("../../Utils/findUtils");
const ProdutosService = require("./produtos.service");

class ProdutosController {
    async AllProdutos(req, res) {
        try {
            const produtos = await ProdutosService.getAll();
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
};

module.exports = new ProdutosController();