const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_pessoas";

class Associados {
    async findAllAssociados() {
        return findAll(table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new Associados();