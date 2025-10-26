const knex = require("../database/connection");
const { findAll, views } = require("../database/dbUtils");

class Secretarias {
    async findAllSecretarias(){
        return findAll("secretaria");
    };
};

module.exports = new Secretarias();