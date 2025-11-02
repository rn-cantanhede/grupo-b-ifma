const { findAll, findBy } = require("../Utils/dbUtils");

class TipoProduto {
    async allTipoProduto(){
        return findAll("tipo_produto");
    };

    async findById(id){
        return findBy("ID", id, false, "tipo_produto");
    };
};

module.exports = new TipoProduto();