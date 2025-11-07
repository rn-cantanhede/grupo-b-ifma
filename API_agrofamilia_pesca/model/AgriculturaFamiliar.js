const { findAll, findBy } = require("../Utils/dbUtils");
const table = "view_agricultura_familiar";

class AgriculturaFamiliar {
    async findAllAgriculturaFamiliar() {
        return findAll(table);
    };

    async findbyCaf(caf){
        return findBy("CAF", caf, false, table);
    };
    
    async findbyDap(dap){
        return findBy("DAP", dap, false, table);
    };
    
    async findbyPrograma(programa){
        return findBy("PROGRAMA", programa, true, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };
};

module.exports = new AgriculturaFamiliar();