const { findAll, findBy, insertData } = require("../../shared/Utils/dbUtils");
const table = "view_agricultura_familiar";

class AgriculturaFamiliarRepository {
    findAllAgriculturaFamiliar() {
        return findAll(table);
    };
    findById(id) {
        return findBy("ID", id, false, table);
    };

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    findbyCaf(caf) {
        return findBy("CAF", caf, false, table);
    };

    findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    findbyPrograma(programa) {
        return findBy("PROGRAMA", programa, true, table);
    };

    findID_ASSOCIADO(id) {
        return findBy("ID", id, false, "associado");
    };

    findID_PROGRAMA(id) {
        return findBy("ID", id, false, "programa");
    };

    createAgriculturaFamiliar(data) {
        return insertData(data, "agricultura_familiar");
    };
};

module.exports = new AgriculturaFamiliarRepository();