const { findAll, findBy, insertData } = require("../Utils/dbUtils");
const table = "categoria";

class Categorias {
    async findAllCategorias() {
        return findAll(table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };

    async insertCategoria(data) {
        return insertData(data, table);
    };
};

module.exports = new Categorias();