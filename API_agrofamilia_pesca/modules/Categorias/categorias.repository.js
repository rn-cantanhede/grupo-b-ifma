const { findAll, findBy } = require("../../Utils/dbUtils");
const table = "categoria";

class CategoriasRepository {
    findAllCategorias() {
        return findAll(table);
    };

    findById(id){
        return findBy("ID", id, false, table);
    };

    findByName(name){
        return findBy("NOME", name, true, table);
    };
};

module.exports = new CategoriasRepository();