const knexconfig = require("../config/knex");
const knex = require("knex")(knexconfig);

module.exports = knex;