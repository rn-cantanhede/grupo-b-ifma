const Produtos = require("../model/Produtos");

class ProdutosController {
    async AllProdutos(req, res){
        try {
            const produtos = await Produtos.findAllProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        }
    };
};

module.exports = new ProdutosController();