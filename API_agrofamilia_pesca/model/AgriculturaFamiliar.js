const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_agricultura_familiar";

class AgriculturaFamiliar {
    async findAllAgriculturaFamiliar() {
        return findAll(table);
    };

    async findbyCaf(caf){
        return findBy("CAF", caf, false, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new AgriculturaFamiliar();