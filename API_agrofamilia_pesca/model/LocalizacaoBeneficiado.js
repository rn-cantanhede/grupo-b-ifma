const knex = require("../database/connection");
const { findAll } = require("../Utils/dbUtils");

class LocalizacaoBeneficiado {
    async findLocalizacao(){
        return findAll("view_localizacao_beneficiado");
    };  
};

module.exports = new LocalizacaoBeneficiado();