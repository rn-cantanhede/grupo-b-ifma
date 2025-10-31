const { findAll } = require("../Utils/dbUtils");

class Associados {
    async findAssociados() {
        return findAll("view_pessoas"); 
    };
};

module.exports = new Associados();