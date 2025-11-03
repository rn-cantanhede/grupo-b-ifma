const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_programas";

class Programas {
    async findAllProgramas() {
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

module.exports = new Programas();