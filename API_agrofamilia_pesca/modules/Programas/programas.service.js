const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const ProgramasRepository = require("./programas.repository");

class ProgramasService {
    async getAll() {
        const result = await ProgramasRepository.findAllProgramas();
        return result;
    };

    async find(value) {
        return findByIdName(value, ProgramasRepository.findById, ProgramasRepository.findByName);
    };

    async findbySecretaria(secretaria) {
        return find(secretaria, ProgramasRepository.findbySecretaria);
    };

    async findbyEstado(estado) {
        return find(estado, ProgramasRepository.findbyEstado);
    };

    async findbyOrigemRecurso(recurso) {
        return find(recurso, ProgramasRepository.findbyOrigemRecurso);
    };

    async findbyDataInicio(data) {
        return find(data, ProgramasRepository.findbyDataInicio);
    };

    async findbyDataFim(data) {
        return find(data, ProgramasRepository.findbyDataFim);
    };

    async createPrograma(programa) {
        const validations = [
            { field: "ID_SECRETARIA", validation: ProgramasRepository.findID_SECRETARIA, errorMsg: "ID_SECRETARIA invalido" },
        ];

        await validationsUtils.validate(programa, validations);

        return await ProgramasRepository.createPrograma(programa);
    };
};

module.exports = new ProgramasService();