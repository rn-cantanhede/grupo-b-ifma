const { findAll, findBy } = require("../Utils/dbUtils");
const Find = require("../Utils/findUtils");
const table = "pessoa";

class Pessoas {
    async findAllPessoas() {
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

module.exports = new Pessoas();