const { findAll } = require("../Utils/dbUtils");

class Associacoes {
    async findeAssociacoes(){
        return findAll("view_associacoes");
    };
};

module.exports = new Associacoes();