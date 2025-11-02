const { findAll, findBy } = require("../Utils/dbUtils");

class Associacoes {
    async findAllAssociacoes(){
        return findAll("view_associacoes");
    };

    async findById(id) {
        return findBy("ID", id, false, "view_associacoes");
    };
};

module.exports = new Associacoes();