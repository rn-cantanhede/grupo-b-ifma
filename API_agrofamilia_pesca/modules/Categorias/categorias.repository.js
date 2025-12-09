const { findAll, findBy, insertData } = require("../../shared/Utils/dbUtils");
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
};

module.exports = new CategoriasRepository();