const { findAll, findBy } = require("../../Utils/dbUtils");
const table = "view_localizacao_beneficiado";

class LocalizacaoBeneficiadoRepository {
    findAllLocalizacao() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    findbyAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, table);
    };
};

module.exports = new LocalizacaoBeneficiadoRepository();