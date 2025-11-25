const { findAll, findBy, insertData } = require("../Utils/dbUtils");
const table = "secretaria";

class Secretarias {
    async findAllSecretarias() {
        return findAll(table);
    };

    async findbyEstado(estado) {
        return findBy("ESTADO", estado, true, table);
    };
    
    async findbyCidade(cidade) {
        return findBy("CIDADE", cidade, true, table);
    };

    async findByIdAndName(value) {
        if (isNaN(value)) {
            return findBy("NOME", value, true, table);
        } else {
            return findBy("ID", value, false, table);
        };
    };

    async newSecretaria(data){
        return insertData(data, table);
    };
};

module.exports = new Secretarias();