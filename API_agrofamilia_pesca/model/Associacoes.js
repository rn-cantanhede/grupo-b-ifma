const knex = require("../database/connection");
const { findAll } = require("../database/dbUtils");

class Associacoes {
    async findeAllAssociacao(){
        return findAll("associacao");
    };
};

module.exports = new Associacoes();