const { findAll, findBy } = require("../Utils/dbUtils");

class Categorias {
    async findAllCategorias(){
        return findAll("categoria");
    };

    async findById(id){
        return findBy("ID", id, false, "categoria");
    };

    async findByName(name){
        return findBy("NOME", name, true, "categoria");
    };
};

module.exports = new Categorias();