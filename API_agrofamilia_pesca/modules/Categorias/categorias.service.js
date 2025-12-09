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
};

module.exports = new CategoriasService();