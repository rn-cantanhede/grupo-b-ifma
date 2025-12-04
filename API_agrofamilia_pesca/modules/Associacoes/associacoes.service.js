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

    async createAssociacao(associacao) {
        if (associacao.NOME == undefined || associacao.NOME == "") {
            throw new Erros("Campo NOME vazio", 403);
        };
        if (associacao.ENDERECO == undefined || associacao.ENDERECO == "") {
            throw new Erros("Campo ENDERECO vazio", 403);
        };
        if (associacao.ID_SECRETARIA == undefined || associacao.ID_SECRETARIA == "") {
            throw new Erros("Campo ID_SECRETARIA vazio", 403);
        };

        const id_secretaria = await AssociacoesRepository.findID_SECRETARIA(associacao.ID_SECRETARIA);

        if (!id_secretaria) {
            throw new Erros("ID_SECRETARIA invalido", 404);
              
        };

        if (associacao.ID_CATEGORIA == undefined || associacao.ID_CATEGORIA == "") {
            throw new Erros("Campo ENDERECO vazio", 403);
        };

        const id_categoria = await AssociacoesRepository.findID_SECRETARIA(associacao.ID_CATEGORIA);

        if (!id_categoria) {
            throw new Erros("ID_CATEGORIA invalido", 404);
        };

        const result = await AssociacoesRepository.createAssociacao(associacao);
        return result;
    };
};

module.exports = new AssociacoesService