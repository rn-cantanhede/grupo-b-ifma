const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_produtos";

class Produtos {
    async findAllProdutos() {
        return findAll(table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };

    async findByTipo(tipo) {
        return findBy("TIPO_DO_PRODUTO", tipo, true, table);  
    };
};

module.exports = new Produtos();