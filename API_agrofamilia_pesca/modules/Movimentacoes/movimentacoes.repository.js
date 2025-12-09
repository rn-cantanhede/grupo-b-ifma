const { findAll, findBy, findByInterval, insertData } = require("../../shared/Utils/dbUtils");
const table = "view_produto_movimentacao";

class MovimentacoesRepository {
    findAllMovimentacoes() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    findbyProduto(produto) {
        return findBy("PRODUTO", produto, false, table);
    };

    findbyData(data) {
        return findBy("DATA_MOVIMENTACAO", data, true, table);
    };

    findByInicioFim(inicio, fim) {
        return findByInterval("DATA_MOVIMENTACAO", inicio, fim, table);
    };

    findID_LOCAL(id) {
        return findBy("ID", id, false, "localizacao_beneficiada");
    };

    findID_AGRICULTURA_FAMILIAR(id) {
        return findBy("ID", id, false, "agricultura_familiar");
    };

    findID_PRODUTO(id) {
        return findBy("ID", id, false, "produto");
    };

    createMovimentacao(movimentacao) {
        return insertData(movimentacao, "produto_movimentacao");
    };
};

module.exports = new MovimentacoesRepository();