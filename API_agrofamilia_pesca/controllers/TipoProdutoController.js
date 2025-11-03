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

    async findTipoProduto(req, res) {
        try {
            Find.findAndVerify(res, req.params.value, TipoProduto.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new TipoProdutoController();