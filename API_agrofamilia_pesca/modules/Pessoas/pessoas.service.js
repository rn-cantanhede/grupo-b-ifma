const Erros = require("../../shared/errors/Errors");
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

    async updatePessoa(id, pessoa) {
        const idPessoa = PessoasRepository.findById(id);
        const validations = [];

        if (!idPessoa) {
            throw new Erros("ID invalido", 404);
        };

        await validationsUtils.validate(pessoa, validations);

        return await PessoasRepository.updatePessoa(id, pessoa);
    };
};

module.exports = new PessoasService();