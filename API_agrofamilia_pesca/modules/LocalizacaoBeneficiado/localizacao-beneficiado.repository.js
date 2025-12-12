const { findAll, findBy, insertData, updateData } = require("../../shared/Utils/dbUtils");
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

    findID_ASSOCIADO(id) {
        return findBy("ID", id, false, "associado");
    };

    createLocalizacao(localizacao) {
        return insertData(localizacao, "localizacao_beneficiada");
    };

    updateLocalizacao(id, localizacao) {
        return updateData(id, localizacao, "localizacao_beneficiada");
    };
};

module.exports = new LocalizacaoBeneficiadoRepository();