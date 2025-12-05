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

    async createMovimentacao(movimentacao) {
        if (movimentacao.ID_LOCAL == undefined || movimentacao.ID_LOCAL == "") {
            throw new Erros("Campo ID_LOCAL vazio", 403);
        };

        const id_movimentacao = await MovimentacoesRepository.findID_LOCAL(movimentacao.ID_LOCAL);

        if (!id_movimentacao) {
            throw new Erros("ID_LOCAL invalido", 404);
        };

        if (movimentacao.ID_AGRICULTURA_FAMILIAR == undefined || movimentacao.ID_AGRICULTURA_FAMILIAR == "") {
            throw new Erros("Campo ID_AGRICULTURA_FAMILIAR vazio", 403);
        };

        const id_agricultura_familiar = await MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR(movimentacao.ID_AGRICULTURA_FAMILIAR);

        if (!id_agricultura_familiar) {
            throw new Erros("ID_AGRICULTURA_FAMILIAR invalido", 404);
        }

        if (movimentacao.ID_PRODUTO == undefined || movimentacao.ID_PRODUTO == "") {
            throw new Erros("Campo ID_PRODUTO vazio", 403);
        };

        const id_produto = await MovimentacoesRepository.findID_PRODUTO(movimentacao.ID_PRODUTO);

        if (!id_produto) {
            throw new Erros("ID_PRODUTO invalido", 404);
        };

        if (movimentacao.QNT_PRODUZIDA == undefined || movimentacao.QNT_PRODUZIDA == "") {
            throw new Erros("Campo QNT_PRODUZIDA vazio", 403);
        };
        if (movimentacao.VLR_UNITARIO == undefined || movimentacao.VLR_UNITARIO == "") {
            throw new Erros("Campo VLR_UNITARIO vazio", 403);
        };
        if (movimentacao.DATA_MOVIMENTACAO == undefined || movimentacao.DATA_MOVIMENTACAO == "") {
            throw new Erros("Campo DATA_MOVIMENTACAO vazio", 403);
        };

        return await MovimentacoesRepository.createMovimentacao(movimentacao);
    };
};

module.exports = new MovimentacoesService();