const { findAll, findBy } = require("../Utils/dbUtils");

class Programas {
    async findAllProgramas(){
        return findAll("view_programas");
    };

    async findById(id){
        return findBy("ID", id, false, "view_programas");
    };
};

module.exports = new Programas();