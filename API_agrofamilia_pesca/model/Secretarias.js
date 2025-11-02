const { findAll, findBy } = require("../Utils/dbUtils");

class Secretarias {
    async findAllSecretarias() {
        return findAll("secretaria");
    };

    async findById(id) {
        return findBy("ID", id, false, "secretaria");
    };

    async findByName(name) {
        return findBy("NOME", name, true, "secretaria");
    };
};

module.exports = new Secretarias();