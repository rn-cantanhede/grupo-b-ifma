/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("AGRICULTURA_FAMILIAR", (table) => {
        table.increments("ID").primary();
        table.integer("ID_ASSOCIADO").notNullable();
        table.integer("ID_PROGRAMA");
        table.string("DAP", 50);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("AGRICULTURA_FAMILIAR");
};