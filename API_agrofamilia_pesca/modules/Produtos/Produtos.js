const { findAll, findBy } = require("../../Utils/dbUtils");
const table = "view_produtos";

class Produtos {
    findAllProdutos() {
        return findAll(table);
    };

    findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new Produtos();