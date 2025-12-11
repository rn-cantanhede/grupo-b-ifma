const { findAll, findBy, insertData, updateData } = require("../../shared/Utils/dbUtils");
const table = "secretaria";

class SecretariasRepository {
    findAllSecretarias() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    findbyEstado(estado) {
        return findBy("ESTADO", estado, true, table);
    };

    findbyCidade(cidade) {
        return findBy("CIDADE", cidade, true, table);
    };

    createSecretaria(data) {
        return insertData(data, table);
    };

    updateSecretaria(id, secretaria) {
        return updateData(id, secretaria, table);
    };
};

module.exports = new SecretariasRepository();