const CategoriasService = require("./categorias.service");

class CategoriasController {
    async AllCategorias(req, res) {
        try {
            const categorias = await CategoriasService.findAllCategorias();
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

    async createCategoria(req, res, next) {
        try {
            const result = await CategoriasService.createCategoria(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async updateCategoria(req, res, next) {
        try {
            const result = await CategoriasService.updateCategoria(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async deleteCategoria(req, res, next) {
        try {
            const result = await CategoriasService.deleteCategoria(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new CategoriasController();