const { findAll, findBy, findByInterval } = require("../Utils/dbUtils");
const table = "view_pessoas";

class Associados {
    async findAllAssociados() {
        return findAll(table);
    };

    async findbyCaf(caf) {
        return findBy("CAF", caf, false, table);
    };

    async findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    async findbyAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, table);
    };

    async findbyData(data) {
        return findBy("VALIDADE_CAF", data, true, table);
    };

    async findByInicioFim(inicio, fim){
        return findByInterval("VALIDADE_CAF", inicio, fim, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new Associados();