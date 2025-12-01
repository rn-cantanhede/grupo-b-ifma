const { findAll, findBy, findByInterval, insertData } = require("../../Utils/dbUtils");
const table = "pessoa";

class PessoasRepository {
    findAllPessoas() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    findbyGenero(genero) {
        return findBy("GENERO", genero, true, table);
    };

    findbyData(data) {
        return findBy("DATA_NASCIMENTO", data, true, table);
    };

    findByInicioFim(inicio, fim) {
        return findByInterval("DATA_NASCIMENTO", inicio, fim, table);
    };

    createPessoa(data) {
        return insertData(data, table);
    };
};

module.exports = new PessoasRepository();