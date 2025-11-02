const { findAll, findBy } = require("../Utils/dbUtils");

class Produtos {
    async findAllProdutos(){
        return findAll("view_produtos");
    };

    async findById(id){
        return findBy("ID", id, false, "view_produtos");
    };
};

module.exports = new Produtos();