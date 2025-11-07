const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_associacoes";

class Associacoes {
    async findAllAssociacoes() {
        return findAll(table);
    };

    async findbyCategoria(categoria) {
        return findBy("CATEGORIA", categoria, true, table);
    };

    async findbySecretaria(secretaria) {
        return findBy("SECRETARIA", secretaria, true, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new Associacoes();