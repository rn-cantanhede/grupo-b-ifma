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

    async findByIdCategorias(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Categorias.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new CategoriasController();