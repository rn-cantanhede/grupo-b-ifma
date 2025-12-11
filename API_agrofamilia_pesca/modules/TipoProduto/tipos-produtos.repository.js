const { findAll, findBy, insertData, updateData } = require("../../shared/Utils/dbUtils");
const table = "tipo_produto";

class TiposProdutosRepository {
    findallTipoProduto() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    insertCategoria(data) {
        return insertData(data, table);
    };

    updateCategoria(id, data) {
        return updateData(id, data, table);
    };
};

module.exports = new TiposProdutosRepository();