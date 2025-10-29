const { findAll } = require("../Utils/dbUtils");

class Categorias {
    async findCategorias(){
        return findAll("categoria");
    };
};

module.exports = new Categorias();