const Erros = require("../../shared/errors/Errors");
const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const AssociacoesRepository = require("./associacoes.repository");

class AssociacoesService {
    async findAllAssociacoes(){
        const result = await AssociacoesRepository.findAllAssociacoes();
        return result;
    };

    async find(value){
        return findByIdName(value, AssociacoesRepository.findById, AssociacoesRepository.findByName);
    };

    async findByCategoria(categoria){
        return find(categoria, AssociacoesRepository.findbyCategoria);
    };

    async findbySecretaria(secretaria){
        return find(secretaria, AssociacoesRepository.findbySecretaria);
    };

    async createAssociacao(associacao) {
        const validations = [
            { field: "ID_SECRETARIA", validation: AssociacoesRepository.findID_SECRETARIA, errorMsg: "ID_SECRETARIA invalido" },
            { field: "ID_CATEGORIA", validation: AssociacoesRepository.findID_CATEGORIA, errorMsg: "ID_CATEGORIA invalido" },
        ];

        await validationsUtils.validate(associacao, validations);
        return await AssociacoesRepository.createAssociacao(associacao);
    };

    async updateAssociacao(id, associacao) {
        const idAssociacao = await AssociacoesRepository.findById(id);

        if (!idAssociacao) {
            throw new Erros("ID invalido", 404);
        };

        const validations = [
            { field: "ID_SECRETARIA", validation: AssociacoesRepository.findID_SECRETARIA, errorMsg: "ID_SECRETARIA invalido" },
            { field: "ID_CATEGORIA", validation: AssociacoesRepository.findID_CATEGORIA, errorMsg: "ID_CATEGORIA invalido" },
        ];

        await validationsUtils.validate(associacao, validations);

        return await AssociacoesRepository.updateAssociacao(id, associacao);
    };
};

module.exports = new AssociacoesService();