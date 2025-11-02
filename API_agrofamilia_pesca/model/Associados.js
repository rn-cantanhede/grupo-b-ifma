const { findAll, findBy } = require("../Utils/dbUtils");

class Associados {
    async findAllAssociados() {
        return findAll("view_pessoas"); 
    };

    async findById(id){
        return findBy("ID", id, false, "view_pessoas");
    };
};

module.exports = new Associados();