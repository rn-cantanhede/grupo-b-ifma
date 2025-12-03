const { findAll, findBy, insertData } = require("../../Utils/dbUtils");
const table = "view_produtos"

class ProdutoRepository {
    findAllProdutos() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    createProduto(produto) {
        return insertData(produto, "produto");
    };

    findID_TIPO_PRODUTO(value) {
        return findBy("ID", value, false, "tipo_produto");
    };
};

module.exports = new ProdutoRepository();