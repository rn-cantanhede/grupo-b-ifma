const Find = require("../../Utils/findUtils");
const CategoriasService = require("./categorias.service");

class CategoriasController {
    async AllCategorias(req, res) {
        try {
            const categorias = await CategoriasService.getAll();
            res.status(200).json(categorias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findCategoria(req, res, next) {
        try {
            const result = await CategoriasService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new CategoriasController();