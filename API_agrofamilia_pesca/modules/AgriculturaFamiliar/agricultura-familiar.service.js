const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const AgriculturaFamiliarRepository = require("./agricultura-familiar.repository");

class AgriculturaFamiliarService {
    async findAllAgriculturaFamiliar() {
        const result = await AgriculturaFamiliarRepository.findAllAgriculturaFamiliar();
        return result;
    };

    async find(value) {
        return findByIdName(value, AgriculturaFamiliarRepository.findById, AgriculturaFamiliarRepository.findByName);
    };

    async findbyCaf(caf) {
        return find(caf, AgriculturaFamiliarRepository.findbyCaf);
    };

    async findbyDap(dap) {
        return find(dap, AgriculturaFamiliarRepository.findbyDap);
    };

    async findbyPrograma(programa) {
        return find(programa, AgriculturaFamiliarRepository.findbyPrograma);
    };

    async createAgriculturaFamiliar(data) {
        const validations = [
            { field: "ID_ASSOCIADO", validation: AgriculturaFamiliarRepository.findID_ASSOCIADO, errorMsg: "ID_ASSOCIADO invalido"},
            { field: "ID_PROGRAMA", validation: AgriculturaFamiliarRepository.findID_PROGRAMA, errorMsg: "ID_PROGRAMA invalido"},
        ];

        await validationsUtils.validate(data, validations);
        
        return await AgriculturaFamiliarRepository.createAgriculturaFamiliar(data);
    };
};

module.exports = new AgriculturaFamiliarService();