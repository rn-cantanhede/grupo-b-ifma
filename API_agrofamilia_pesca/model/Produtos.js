const { findAll } = require("../Utils/dbUtils");

class Produtos {
    async findAllProdutos(){
        return findAll("view_produtos");
    };
};

module.exports = new Produtos();