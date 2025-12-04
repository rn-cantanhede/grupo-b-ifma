const Erros = require("../../shared/errors/Errors");
const AssociadosRepository = require("./associados.repository");

class AssociadosService {
    async findAllAssociados() {
        const result = await AssociadosRepository.findAllAssociados();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const result = await AssociadosRepository.findById(value);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };

        const result = await AssociadosRepository.findByName(value);
        return result;
    };

    async findbyCaf(caf) {
        const result = await AssociadosRepository.findbyCaf(caf);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbyDap(dap) {
        const result = await AssociadosRepository.findbyDap(dap);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbyAssociacao(associacao) {
        const result = await AssociadosRepository.findbyAssociacao(associacao);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;

    };

    async findbyData(data) {
        const result = await AssociadosRepository.findbyData(data);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findByInicioFim(inicio, fim) {
        const result = await AssociadosRepository.findByInicioFim(inicio, fim);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async createAssociado(associado) {
        if (associado.ID_PESSOA == undefined || associado.ID_PESSOA == "") {
            throw new Erros("Campo ID_PESSOA vazio", 403);
        };

        const id_pessoa = await AssociadosRepository.findID_PESSOA(associado.ID_PESSOA);

        if (!id_pessoa) {
            throw new Erros("ID_PESSOA invalido", 404);
        };

        if (associado.CAF == undefined || associado.CAF == "") {
            throw new Erros("Campo CAF vazio", 403);
        };
        if (associado.VALIDADE_CAF == undefined || associado.VALIDADE_CAF == "") {
            throw new Erros("Campo VALIDADE_CAF vazio", 403);
        };
        if (associado.ID_ASSOCIACAO == undefined || associado.ID_ASSOCIACAO == "") {
            throw new Erros("Campo ID_ASSOCIACAO vazio", 403);
        };

        const id_associacao = await AssociadosRepository.findID_ASSOCIACAO(associado.ID_ASSOCIACAO);

        if (!id_associacao) {
            throw new Erros("ID_ASSOCIACAO invalido", 404);
        };

        const result = await AssociadosRepository.createAssociado(associado);
        return result;
    };
};

module.exports = new AssociadosService();