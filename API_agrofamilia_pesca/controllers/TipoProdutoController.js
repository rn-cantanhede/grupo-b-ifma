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
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), TipoProduto.findByIdAndName);
    };

    async newTipoProduto(req, res) {
        const tipo = req.body;
        const tipoVerify = req.body.NOME;

        if (tipoVerify == undefined || tipoVerify == "") {
            return res.status(403).json({ Error: `Campo destinado ao nome está vazio` });
        };

        Find.findAndVerify(res, tipo, TipoProduto.newTipo);
        return res.status(201).json({ Message: `Cadastro realizado` });
    };
};

module.exports = new TipoProdutoController();