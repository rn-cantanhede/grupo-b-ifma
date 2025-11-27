const TiposProdutosService = require("./tipos-produtos.service");

class TipoProdutoController {
    async findallTipoProduto(req, res) {
        try {
            const tipos = await TiposProdutosService.findallTipoProduto();
            return res.status(200).json(tipos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findTipoProduto(req, res, next) {
        try {
            const result = await TiposProdutosService.find(req.params.value);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async insertCategoria(req, res, next) {
        try {
            const result = await TiposProdutosService.insertCategoria(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new TipoProdutoController();