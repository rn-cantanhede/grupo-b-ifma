const Erros = require("../../shared/errors/Errors");
const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const SecretariasRepository = require("./secretarias.repository");

class SecretariasService {
    async findAllProgramas() {
        const result = await SecretariasRepository.findAllSecretarias();
        return result;
    };

    async find(value) {
        return findByIdName(value, SecretariasRepository.findById, SecretariasRepository.findByName);
    };

    async findbyEstado(estado) {
        return find(estado, SecretariasRepository.findbyEstado);
    };

    async findbyCidade(cidade) {
        return find(cidade, SecretariasRepository.findbyCidade);
    };

    async createSecretaria(data) {
        const validations = [];

        await validationsUtils.validate(data, validations);

        return await SecretariasRepository.createSecretaria(data);
    };

    async updateSecretaria(id, secretaria) {
        const idSecretaria = SecretariasRepository.findById(id);
        const validations = [];

        if (!idSecretaria) {
            throw new Erros("ID invalido", 404);
        };

        await validationsUtils.validate(secretaria, validations);

        return await SecretariasRepository.updateSecretaria(id, secretaria);
    };
};

module.exports = new SecretariasService();