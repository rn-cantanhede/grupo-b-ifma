const { findAll } = require("../Utils/dbUtils");

class Movimentacoes {
    async findAllMovimentacoes(){
        return findAll("view_produto_movimentacao");
    };
};

module.exports = new Movimentacoes();