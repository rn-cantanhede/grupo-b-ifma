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

    async findProdutos(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), Produtos.findByIdAndName);
    };

    async findByTipoProduto(req, res){
        Find.findAndVerify(res, req.params.tipo, Produtos.findByTipo);
    };
};

module.exports = new ProdutosController();