const { findAll, findBy } = require("../Utils/dbUtils");

class LocalizacaoBeneficiado {
    async findAllLocalizacao() {
        return findAll("view_localizacao_beneficiado");
    };

    async findByid(id) {
        return findBy("ID", id, false, "view_localizacao_beneficiado");
    };

    async findByName(name) {
        return findBy("NOME", name, true, "view_localizacao_beneficiado");
    };
};

module.exports = new LocalizacaoBeneficiado();