const { findAll } = require("../Utils/dbUtils");

class Associados {
    async findAllAssociados() {
        return findAll("view_pessoas"); 
    };
};

module.exports = new Associados();