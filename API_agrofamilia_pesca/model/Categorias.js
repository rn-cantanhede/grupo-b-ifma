const { findAll } = require("../Utils/dbUtils");

class Categorias {
    async findAllCategorias(){
        return findAll("categoria");
    };
};

module.exports = new Categorias();