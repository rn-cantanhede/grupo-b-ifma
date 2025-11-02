const TipoProduto = require("../model/TipoProduto");
const Find = require("../Utils/findUtils");

class TipoProdutoController {
    async AllTipoProduto(req, res) {
        try {
            const tipos = await TipoProduto.allTipoProduto();
            return res.status(200).json(tipos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async finByIdTipoProduto(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, TipoProduto.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

};

module.exports = new TipoProdutoController();