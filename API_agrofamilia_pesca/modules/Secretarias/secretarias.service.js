const Erros = require("../../shared/errors/Errors");
const SecretariasRepository = require("./secretarias.repository");

class SecretariasService {
    async findAllProgramas() {
        const result = await SecretariasRepository.findAllSecretarias();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const produtos = await SecretariasRepository.findById(value);
            if (!produtos) {
                throw new Erros("Produto não encontrado", 404)
            };
            return produtos;
        };

        const produtos = await SecretariasRepository.findByName(value);
        return produtos;
    };

    async findbyEstado(estado) {
        const result = await SecretariasRepository.findbyEstado(estado);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findbyCidade(cidade) {
        const result = await SecretariasRepository.findbyCidade(cidade);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async createSecretaria(data) {
        if (data.NOME == undefined || data.NOME == "") {
            throw new Erros("Campo NOME vazio", 403);
        };

        if (data.CIDADE == undefined || data.CIDADE == "") {
            throw new Erros("Campo CIDADE vazio", 403);
        };

        if (data.ESTADO == undefined || data.ESTADO == "") {
            throw new Erros("Campo ESTADO vazio", 403);
        };

        if (data.ENDERECO == undefined || data.ENDERECO == "") {
            throw new Erros("Campo ENDERECO vazio", 403);
        };
        
        const result = await SecretariasRepository.createSecretaria(data);

        return result;
    };
};

module.exports = new SecretariasService();