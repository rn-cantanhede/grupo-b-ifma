const { findAll, views } = require("../Utils/dbUtils");

class Secretarias {
    async findAllSecretarias(){
        return findAll("secretaria");
    };
};

module.exports = new Secretarias();