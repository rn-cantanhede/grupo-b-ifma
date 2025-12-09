const { find, findByInterval } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const PessoasRepository = require("./pessoas.repository");

class PessoasService {
    async findAllPessoas() {
        const result = await PessoasRepository.findAllPessoas();
        return result;
    };

    async find(value) {
        return find(value, PessoasRepository.findById, PessoasRepository.findByName);
    };

    async findbyGenero(genero) {
        return find(genero, PessoasRepository.findbyGenero);
    };

    async findbyData(data) {
        return find(data, PessoasRepository.findbyData);
    };

    async findByInicioFim(inicio, fim) {
        return findByInterval(inicio, fim, PessoasRepository.findByInicioFim);
    };

    async createPessoa(data) {
        const validations = [];
        
        await validationsUtils.validate(data, validations);

        return await PessoasRepository.createPessoa(data);
    };
};

module.exports = new PessoasService();