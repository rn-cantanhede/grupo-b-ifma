const Erros = require("../../shared/errors/Errors");
const { find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const CategoriasRepository = require("./categorias.repository");

class CategoriasService {
    async findAllCategorias() {
        const result = await CategoriasRepository.findAllCategorias();
        return result;
    };

    async find(value) {
        return find(value, CategoriasRepository.findById, CategoriasRepository.findByName);
    };

    async createCategoria(data) {
        const validations = [];
        
        await validationsUtils.validate(data, validations);

        return await CategoriasRepository.createCategoria(data);
    };

    async updateCategoria(id, categoria) {
        const idCategoria = await CategoriasRepository.findById(id);

        if (!idCategoria) {
            throw new Erros("ID não existente", 404);
        };

        const validations = [];

        await validationsUtils.validate(categoria, validations);

        return await CategoriasRepository.updateCategoria(id, categoria);
    };

    async deleteCategoria(id) {
        const idCategoria = await CategoriasRepository.findById(id);

        if (!idCategoria) {
            throw new Erros("ID não existente", 404);
        };
        return await CategoriasRepository.deleteCategoria(id);
    };
};

module.exports = new CategoriasService();