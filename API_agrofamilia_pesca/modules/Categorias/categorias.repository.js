const { findAll, findBy, insertData, updateData } = require("../../shared/Utils/dbUtils");
const table = "categoria";

class CategoriasRepository {
    findAllCategorias() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    createCategoria(categoria) {
        return insertData(categoria, table);
    };

    updateCategoria(id, categoria) {
        return updateData(id, categoria, table);
    };
};

module.exports = new CategoriasRepository();