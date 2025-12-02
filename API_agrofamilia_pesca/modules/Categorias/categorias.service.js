const Erros = require("../../shared/errors/Errors");
const CategoriasRepository = require("./categorias.repository");

class CategoriasService {
    async findAllCategorias() {
        const result = await CategoriasRepository.findAllCategorias();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const result = await CategoriasRepository.findById(value);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };

        const result = await CategoriasRepository.findByName(value);
        return result;
    };

    async createCategoria(data) {
        if (data.NOME == undefined || data.NOME == "") {
            throw new Erros("Campo NOME está vazio", 403);
        };

        const result = await CategoriasRepository.createCategoria(data);
        return result;
    };
};

module.exports = new CategoriasService();