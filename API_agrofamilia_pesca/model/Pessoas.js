const { findAll, views } = require("../Utils/dbUtils");

class Pessoas {
    async findAllPessoas() {
        return findAll("pessoa");
    };
};

module.exports = new Pessoas();