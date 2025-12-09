const Erros = require("../../shared/errors/Errors");
const { find, findByInterval } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const MovimentacoesRepository = require("./movimentacoes.repository");

class MovimentacoesService {
    async findAllMovimentacoes() {
        const result = await MovimentacoesRepository.findAllMovimentacoes();
        return result;
    };

    async findById(id) {
        if (!isNaN(id)) {
            return find(id, MovimentacoesRepository.findById);
        };
        throw new Erros("Apenas Id's", 403);
    };

    async findbyDap(dap) {
        return find(dap, MovimentacoesRepository.findbyDap);
    };

    async findbyProduto(produto) {
        return find(produto, MovimentacoesRepository.findbyProduto);
    };

    async findbyData(data) {
        return find(data, MovimentacoesRepository.findbyData);
    };

    async findByInicioFim(inicio, fim) {
        return findByInterval(inicio, fim, MovimentacoesRepository.findByInicioFim);
    };

    async createMovimentacao(movimentacao) {
        const validations = [
            { field: "ID_LOCAL", validation: MovimentacoesRepository.findID_LOCAL, errorMsg: "ID_LOCAL invalido" },
            { field: "ID_AGRICULTURA_FAMILIAR", validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR, errorMsg: "ID_AGRICULTURA_FAMILIAR invalido" },
            { field: "ID_PRODUTO", validation: MovimentacoesRepository.findID_PRODUTO, errorMsg: "ID_PRODUTO invalido" },
            // { field: 'NOME', validationFn: (val) => val.length > 0, errorMessage: 'Nome do cliente é obrigatório' },
            // { field: 'EMAIL', validationFn: (val) => /\S+@\S+\.\S+/.test(val), errorMessage: 'Email inválido' },
        ];

        await validationsUtils.validate(movimentacao, validations);
        return await MovimentacoesRepository.createMovimentacao(movimentacao);
    };
};

module.exports = new MovimentacoesService();