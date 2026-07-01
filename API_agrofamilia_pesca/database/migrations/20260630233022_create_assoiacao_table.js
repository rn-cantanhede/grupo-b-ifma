/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("ASSOCIACAO", (table) => {
        table.increments("ID").primary();
        table.string("NOME", 150).notNullable();
        table.string("ENDERECO", 255);
        table.integer("ID_CATEGORIA"); 
        table.integer("ID_SECRETARIA"); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("ASSOCIACAO");
};