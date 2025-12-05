const Erros = require("../../shared/errors/Errors");
const AgriculturaFamiliarRepository = require("./agricultura-familiar.repository");

class AgriculturaFamiliarService {
    async findAllAgriculturaFamiliar() {
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

    async findbyPrograma(programa) {
        const result = await AgriculturaFamiliarRepository.findbyPrograma(programa);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async createAgriculturaFamiliar(data) {
        if (data.ID_ASSOCIADO == undefined || data.ID_ASSOCIADO == "") {
            throw new Erros("Campo ID_ASSOCIADO vazio", 403);
        };

        const id_associado = await AgriculturaFamiliarRepository.findID_ASSOCIADO(data.ID_ASSOCIADO);

        if (!id_associado) {
            throw new Erros("ID_ASSOCIADO invalido", 404);  
        };

        if (data.ID_PROGRAMA == undefined || data.ID_PROGRAMA == "") {
            throw new Erros("Campo ID_PROGRAMA vazio", 403);
        };

        const id_programa = await AgriculturaFamiliarRepository.findID_PROGRAMA(data.ID_PROGRAMA);

        if (!id_programa) {
            throw new Erros("ID_PROGRAMA invalido", 404);  
        };

        if (data.DAP == undefined || data.DAP == "") {
            throw new Erros("Campo DAP vazio", 403);
        };

        const result = await AgriculturaFamiliarRepository.createAgriculturaFamiliar(data);
        return result;
    };
};

module.exports = new AgriculturaFamiliarService();