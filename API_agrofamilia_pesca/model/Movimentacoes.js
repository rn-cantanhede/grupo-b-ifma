const { findAll, findBy, findByInterval } = require("../Utils/dbUtils");
const table = "view_produto_movimentacao";

class Movimentacoes {
    async findAllMovimentacoes() {
        return findAll(table);
    };

    async findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    async findbyData(data) {
        return findBy("DATA_MOVIMENTACAO", data, true, table);
    };

    async findByInicioFim(inicio, fim) {
        return findByInterval("DATA_MOVIMENTACAO", inicio, fim, table);
    };

    async findbyProduto(produto) {
        return findBy("PRODUTO", produto, false, table);
    };

    async findById(id) {
        return findBy("ID", id, false, table);
    };
};

module.exports = new Movimentacoes();