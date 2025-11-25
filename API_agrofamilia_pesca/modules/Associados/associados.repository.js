const { findAll, findBy, findByInterval } = require("../../Utils/dbUtils");
const table = "view_pessoas";

class AssociadosRepository {
    findAllAssociados() {
        return findAll(table);
    };

    findById(id){
        return findBy("ID", id, false, table);
    };

    findByName(name){
        return findBy("NOME", name, true, table);
    };

    findbyCaf(caf) {
        return findBy("CAF", caf, false, table);
    };

    findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    findbyAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, table);
    };

    findbyData(data) {
        return findBy("VALIDADE_CAF", data, true, table);
    };

    findByInicioFim(inicio, fim){
        return findByInterval("VALIDADE_CAF", inicio, fim, table);
    };
};

module.exports = new AssociadosRepository();