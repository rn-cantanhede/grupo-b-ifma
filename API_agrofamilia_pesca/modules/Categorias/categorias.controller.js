const CategoriasService = require("./categorias.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Categorias e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class CategoriasController {

    /**
     * Retorna todas as categorias cadastradas.
     */

    async AllCategorias(req, res) {
        try {
            const categorias = await CategoriasService.findAllCategorias();
            return res.status(200).json(categorias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma categoria por ID ou Nome.
     */

    async findCategoria(req, res, next) {
        try {
            const result = await CategoriasService.find(req.params.value);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova categoria.
     */

    async createCategoria(req, res, next) {
        try {
            const result = await CategoriasService.createCategoria(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma categoria existente.
     */

    async updateCategoria(req, res, next) {
        try {
            const result = await CategoriasService.updateCategoria(
                req.params.id,
                req.body
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma categoria existente.
     */

    async deleteCategoria(req, res, next) {
        try {
            const result = await CategoriasService.deleteCategoria(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new CategoriasController();