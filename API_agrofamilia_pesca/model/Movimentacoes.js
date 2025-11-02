const { findAll, findBy } = require("../Utils/dbUtils");

class Movimentacoes {
    async findAllMovimentacoes() {
        return findAll("view_produto_movimentacao");
    };

    async findById(id) {
        return findBy("ID", id, false, "view_produto_movimentacao");
    };
};

module.exports = new Movimentacoes();