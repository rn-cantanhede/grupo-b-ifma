const knex = require("../../database/connection");
const { findAll, findBy } = require("../../Utils/dbUtils");
const table = "view_produtos"

class ProdutoRepository {
    findAllProdutos() {
        return findAll(table);
    };

    findById(id){
        return findBy("ID", id, false, table);
    };

    findByName(name){
        return findBy("NOME", name, true, table);
    };
};

module.exports = new ProdutoRepository();