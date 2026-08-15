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
            const categorias = await CategoriasService.findAllCategorias(req.user);

            req.log.info({
                event: "CATEGORIA_LIST",
                resource: "categoria",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem das categorias");

            return res.status(200).json(categorias);
        } catch (error) {
            req.log.error({
                event: "CATEGORIA_LIST_ERROR",
                resource: "categoria",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar as categorias");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma categoria por ID ou Nome.
     */

    async findCategoria(req, res, next) {
        try {
            const result = await CategoriasService.find(
                req.params.value,
                req.user
            );

            req.log.info({
                event: "CATEGORIA_FIND",
                resource: "categoria",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Categoria consultada por id ou nome");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "CATEGORIA_FIND_ERROR",
                resource: "categoria",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.value
            }, "Erro ao buscar categoria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova categoria.
     */

    async createCategoria(req, res, next) {
        try {
            const result = await CategoriasService.createCategoria(
                req.body,
                req.user
            );

            req.log.info({
                event: "CATEGORIA_CREATE",
                resource: "categoria",
                action: "create",
                usuarioId: req.user.id,
            }, "Categoria criada");

            return res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "CATEGORIA_CREATE_ERROR",
                resource: "categoria",
                action: "create",
                usuarioId: req.user.id,
            }, "Erro ao criar categoria");

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
                req.body,
                req.user
            );

            req.log.info({
                event: "CATEGORIA_UPDATE",
                resource: "categoria",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Categoria atualizada");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "CATEGORIA_UPDATE_ERROR",
                resource: "categoria",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar categoria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma categoria existente.
     */

    async deleteCategoria(req, res, next) {
        try {
            const result = await CategoriasService.deleteCategoria(
                req.params.id,
                req.user
            );

            req.log.info({
                event: "CATEGORIA_DELETE",
                resource: "categoria",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Categoria excluída");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "CATEGORIA_DELETE_ERROR",
                resource: "categoria",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar categoria");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new CategoriasController();