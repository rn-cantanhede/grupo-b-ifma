const { findAll } = require("../Utils/dbUtils");

class Associacoes {
    async findAllAssociacoes(){
        return findAll("view_associacoes");
    };
};

module.exports = new Associacoes();