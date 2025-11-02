const { findAll, findBy } = require("../Utils/dbUtils");

class AgriculturaFamiliar {
    async findAllAgriculturaFamiliar(){
        return findAll("view_agricultura_familiar");
    };

    async findById(id) {
        return findBy("ID", id, false, "view_agricultura_familiar");
    };
};

module.exports = new AgriculturaFamiliar();