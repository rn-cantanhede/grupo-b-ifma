const knex = require("../database/connection");

async function findAll(table) {
    try {
        const result = await knex
            .select("")
            .table(table);

        return result;
    } catch (error) {
        console.log(error);
        return resizeBy.status(500).json({ Error: "Erro interno no servidor" });
    };
};

class Users {
    async findAllPessoas() {
        return findAll("pessoa");
    };
    
    async findeAllAssociacao(){
        return findAll("associacao");
    };
};

module.exports = new Users();