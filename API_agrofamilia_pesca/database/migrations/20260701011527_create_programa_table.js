/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("PROGRAMA", (table) => {
        table.increments("ID").primary();
        table.string("NOME", 150).notNullable();
        table.string("DESCRICAO", 255);
        table.date("DATA_INICIO");
        table.date("DATA_FIM");
        table.string("ORIGEM_RECURSO", 255);
        table.decimal("VLR_REPASSE", 15,2);
        table.integer("ID_SECRETARIA");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("PROGRAMA");
};