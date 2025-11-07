const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_localizacao_beneficiado";

class LocalizacaoBeneficiado {
    async findAllLocalizacao() {
        return findAll(table);
    };

    async findbyAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new LocalizacaoBeneficiado();