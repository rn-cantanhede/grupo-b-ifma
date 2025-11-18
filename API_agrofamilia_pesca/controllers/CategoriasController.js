const Categorias = require("../model/Categorias");
const Find = require("../Utils/findUtils");

class CategoriasController {
    async AllCategorias(req, res) {
        try {
            const categorias = await Categorias.findAllCategorias();
            res.status(200).json(categorias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findAssociacao(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), Categorias.findByIdAndName);
    };

    async newCategoria(req, res) {
        const tipo = req.body;
        const tipoVerify = req.body.NOME;

        if (tipoVerify == undefined || tipoVerify == "") {
            return res.status(403).json({ Error: `Campo destinado ao nome está vazio` });
        };

        Find.findAndVerify(res, tipo, Categorias.insertCategoria);
        return res.status(201).json({ Message: `Cadastro realizado` });
    };
};

module.exports = new CategoriasController();