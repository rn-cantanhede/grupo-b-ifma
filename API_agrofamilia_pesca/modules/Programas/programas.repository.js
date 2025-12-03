const { findAll, findBy, insertData } = require("../../Utils/dbUtils");
const table = "view_programas";

class ProgramasRepository {
    findAllProgramas() {
        return findAll(table);
    };

    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    findbySecretaria(secretaria) {
        return findBy("SECRETARIA", secretaria, true, table);
    };

    findbyEstado(estado) {
        return findBy("ESTADO", estado, true, table);
    };

    findbyOrigemRecurso(recurso) {
        return findBy("ORIGEM_RECURSO", recurso, true, table);
    };

    findbyDataInicio(data) {
        return findBy("DATA_INICIO", data, true, table);
    };
    
    findbyDataFim(data) {
        return findBy("DATA_FIM", data, true, table);
    };

    findID_SECRETARIA(value) {
        return findBy("ID", value, false, "secretaria");
    };

    createPrograma(programa) {
        return insertData(programa, "programa");
    };
};

module.exports = new ProgramasRepository();