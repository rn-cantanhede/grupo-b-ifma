/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("PRODUTO_MOVIMENTACAO", (table) => {
        table.increments("ID").primary();
        table.integer("ID_LOCAL");
        table.integer("ID_AGRICULTURA_FAMILIAR");
        table.integer("ID_PRODUTO");
        table.integer("QNT_PRODUZIDA");
        table.decimal("VLR_UNITARIO", 15,2);
        table.date("DATA_MOVIMENTACAO");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("PRODUTO_MOVIMENTACAO");
};