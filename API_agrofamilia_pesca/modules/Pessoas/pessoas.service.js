const Erros = require("../../shared/errors/Errors");
const PessoasRepository = require("./pessoas.repository");

class PessoasService {
    async getAll() {
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
};

module.exports = new PessoasService();