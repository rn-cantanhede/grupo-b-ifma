/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("USUARIO", (table) => {
        table.increments("ID").primary();
        table.integer("ID_PESSOA").notNullable();
        table.integer("ID_SECRETARIA");
        table.integer("ID_ASSOCIACAO");
        table.integer("NIVEL");
        table.string("LOGIN", 50).unique().notNullable();
        table.string("SENHA", 255).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("USUARIO");
};