const Erros = require("../../shared/errors/Errors");
const AgriculturaFamiliarRepository = require("./agricultura-familiar.repository");

class AgriculturaFamiliarService {
    async getAll() {
        const result = await AgriculturaFamiliarRepository.findAllAgriculturaFamiliar();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const result = await AgriculturaFamiliarRepository.findById(value);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };

        const result = await AgriculturaFamiliarRepository.findByName(value);
        return result;
    };

    async findbyCaf(caf) {
        const result = await AgriculturaFamiliarRepository.findbyCaf(caf);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbyDap(dap) {
        const result = await AgriculturaFamiliarRepository.findbyDap(dap);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbyPrograma(programa){
        const result = await AgriculturaFamiliarRepository.findbyPrograma(programa);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
};

module.exports = new AgriculturaFamiliarService();