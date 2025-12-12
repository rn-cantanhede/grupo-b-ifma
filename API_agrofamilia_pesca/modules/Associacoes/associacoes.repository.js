const { findAll, findBy, insertData, updateData } = require("../../shared/Utils/dbUtils");
const table = "view_associacoes";

class Associacoes {
    findAllAssociacoes() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, false, table);
    };

    findbyCategoria(categoria) {
        return findBy("CATEGORIA", categoria, true, table);
    };

    findbySecretaria(secretaria) {
        return findBy("SECRETARIA", secretaria, true, table);
    };

    findID_SECRETARIA(id) {
        return findBy("ID", id, false, "secretaria");
    };

    findID_CATEGORIA(id) {
        return findBy("ID", id, false, "categoria");
    }

    createAssociacao(associacao) {
        return insertData(associacao, "associacao");
    };

    updateAssociacao(id, associacao) {
        return updateData(id, associacao, "associacao");
    };
};

module.exports = new Associacoes();