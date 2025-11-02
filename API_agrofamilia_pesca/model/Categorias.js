const { findAll, findBy } = require("../Utils/dbUtils");

class Categorias {
    async findAllCategorias(){
        return findAll("categoria");
    };

    async findById(id){
        return findBy("ID", id, false, "categoria");
    };
};

module.exports = new Categorias();