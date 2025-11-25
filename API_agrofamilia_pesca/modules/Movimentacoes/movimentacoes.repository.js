const { findAll, findBy, findByInterval } = require("../../Utils/dbUtils");
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
};

module.exports = new MovimentacoesRepository();