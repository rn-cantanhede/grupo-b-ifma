const { findAll, findBy } = require("../Utils/dbUtils");

class Pessoas {
    async findAllPessoas() {
        return findAll("pessoa");
    };

    async findById(id) {
        return findBy("ID", id, false, "pessoa");
    };

    async findByName(name) {
        return findBy("NOME", name, true, "pessoa");
    };
};

module.exports = new Pessoas();