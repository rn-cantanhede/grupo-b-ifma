const Produtos = require("../model/Produtos");
const Find = require("../Utils/findUtils");

class ProdutosController {
    async AllProdutos(req, res) {
        try {
            const produtos = await Produtos.findAllProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByIdProdutos(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Produtos.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByNameProdutos(req, res) {
        try {
            Find.findAndVerify(res, Find.convertString(req.params.name), Produtos.findByName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new ProdutosController();