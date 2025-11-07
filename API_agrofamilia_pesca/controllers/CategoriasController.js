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
};

module.exports = new CategoriasController();