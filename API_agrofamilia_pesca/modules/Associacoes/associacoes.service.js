const Erros = require("../../shared/errors/Errors");
const AssociacoesRepository = require("./associacoes.repository");

class AssociacoesService {
    async findAllAssociacoes(){
        const result = await AssociacoesRepository.findAllAssociacoes();
        return result;
    };

    async find(value){
        const isNumber = !isNaN(value);

        if (isNumber) {
            const result = await AssociacoesRepository.findById(value);

            if (!result) {
                throw new Erros("Não encontrado", 404);
            };

            return result;
        };

        const result = await AssociacoesRepository.findByName(value);
        return result;
    };

    async findByCategoria(categoria){
        const result = await AssociacoesRepository.findbyCategoria(categoria);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbySecretaria(secretaria){
        const result = await AssociacoesRepository.findbySecretaria(secretaria);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
};

module.exports = new AssociacoesService