const knex = require("../database/connection");
const { views } = require("../Utils/dbUtils");

class Associacoes {
    async findeAssociacoes(){
        return views("view_associacoes");
    };
};

module.exports = new Associacoes();