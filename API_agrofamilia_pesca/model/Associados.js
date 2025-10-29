const { views } = require("../Utils/dbUtils");

class Associados {
    async findAssociados() {
        return views("view_pessoas"); 
    };
};

module.exports = new Associados();