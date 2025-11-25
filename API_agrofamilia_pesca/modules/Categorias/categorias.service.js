const Erros = require("../../shared/errors/Errors");
const CategoriasRepository = require("./categorias.repository");

class CategoriasService {
    async getAll() {
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
};

module.exports = new CategoriasService();