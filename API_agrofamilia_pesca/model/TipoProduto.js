const { findAll, findBy } = require("../Utils/dbUtils");
const table = "tipo_produto";

class TipoProduto {
    async allTipoProduto() {
        return findAll(table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new TipoProduto();