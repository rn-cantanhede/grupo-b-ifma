const Erros = require("../../shared/errors/Errors");
const PessoasRepository = require("./pessoas.repository");

class PessoasService {
    async findAllPessoas() {
        const result = await PessoasRepository.findAllPessoas();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);

        if (isNumber) {
            const result = await PessoasRepository.findById(value);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };

        const result = await PessoasRepository.findByName(value);
        return result;

    };
    async findbyGenero(genero) {
        const result = await PessoasRepository.findbyGenero(genero);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findbyData(data) {
        const result = await PessoasRepository.findbyData(data);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findByInicioFim(inicio, fim) {
        const result = await PessoasRepository.findByInicioFim(inicio, fim);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async createPessoa(data) {
        
        if (data.NOME == undefined || data.NOME == "") {
            throw new Erros("Campo NOME vazio", 403);
        };

        if (data.CPF == undefined || data.CPF == "") {
            throw new Erros("Campo CPF vazio", 403);
        };

        if (data.GENERO == undefined || data.GENERO == "") {
            throw new Erros("Campo GENERO vazio", 403);
        };

        if (data.DATA_NASCIMENTO == undefined || data.DATA_NASCIMENTO == "") {
            throw new Erros("Campo DATA_NASCIMENTO vazio", 403);
        };

        const result = await PessoasRepository.createPessoa(data);

        return result;
    };
};

module.exports = new PessoasService();