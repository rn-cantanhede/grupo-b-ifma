const { findAll } = require("../Utils/dbUtils");

class AgriculturaFamiliar {
    async findAllAgriculturaFamiliar(){
        return findAll("view_agricultura_familiar");
    };
};

module.exports = new AgriculturaFamiliar();