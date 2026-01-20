const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
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

    findID_TIPO_PRODUTO(value) {
        return findBy("ID", value, false, "tipo_produto");
    };

    createProduto(produto) {
        return insertData(produto, "produto");
    };

    updateProduto(id, produto) {
        return updateData(id, produto, "produto");
    };

    deleteProduto(id) {
        return deleteData(id, "produto");
    };
};

module.exports = new ProdutoRepository();