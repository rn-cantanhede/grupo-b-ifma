/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("ASSOCIADO", (table) => {
        table.increments("ID").primary();
        table.integer("ID_PESSOA").notNullable; 
        table.integer("ID_ASSOCIACAO").notNullable; 
        table.string("CAF", 50);
        table.date("VALIDADE_CAF");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("ASSOCIADO");
};