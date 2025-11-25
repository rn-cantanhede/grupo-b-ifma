const Erros = require("../../shared/errors/Errors");
const MovimentacoesRepository = require("./movimentacoes.repository");

class MovimentacoesService {
    async findAllMovimentacoes() {
        const result = await MovimentacoesRepository.findAllMovimentacoes();
        return result;
    };

    async findById(id) {
        const isNumber = !isNaN(id);
        if (isNumber) {
            const result = await MovimentacoesRepository.findById(id);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };
    };

    async findbyDap(dap) {
        const result = await MovimentacoesRepository.findbyDap(dap);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
    
    async findbyProduto(produto) {
        const result = await MovimentacoesRepository.findbyProduto(produto);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
    
    async findbyData(data) {
        const result = await MovimentacoesRepository.findbyData(data);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
    
    async findByInicioFim(inicio, fim) {
        const result = await MovimentacoesRepository.findByInicioFim(inicio, fim);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
};

module.exports = new MovimentacoesService();