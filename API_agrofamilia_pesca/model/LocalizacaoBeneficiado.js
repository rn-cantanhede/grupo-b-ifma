const { findAll } = require("../Utils/dbUtils");

class LocalizacaoBeneficiado {
    async findAllLocalizacao(){
        return findAll("view_localizacao_beneficiado");
    };  
};

module.exports = new LocalizacaoBeneficiado();