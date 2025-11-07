const { findAll, findBy, findByInterval } = require("../Utils/dbUtils");
const table = "pessoa";

class Pessoas {
    async findAllPessoas() {
        return findAll(table);
    };

    async findbyGenero(genero) {
        return findBy("GENERO", genero, true, table);
    };

    async findbyData(data) {
        return findBy("DATA_NASCIMENTO", data, true, table);
    };

    async findByInicioFim(inicio, fim) {
        return findByInterval("DATA_NASCIMENTO", inicio, fim, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new Pessoas();