const knex = require("../database/connection");
const { findAll, views } = require("../database/dbUtils");

class Pessoas {
    async findAllPessoas() {
        return findAll("pessoa");
    };
};

module.exports = new Pessoas();