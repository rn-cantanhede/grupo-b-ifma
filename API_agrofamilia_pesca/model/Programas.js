const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_programas";

class Programas {
    async findAllProgramas() {
        return findAll(table);
    };

    async findbySecretaria(secretaria) {
        return findBy("SECRETARIA", secretaria, true, table);
    };

    async findbyEstado(estado) {
        return findBy("ESTADO", estado, true, table);
    };

    async findbyOrigemRecurso(recurso) {
        return findBy("ORIGEM_RECURSO", recurso, true, table);
    };

    async findbyDataInicio(data) {
        return findBy("DATA_INICIO", data, true, table);
    };
    
    async findbyDataFim(data) {
        return findBy("DATA_FIM", data, true, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new Programas();