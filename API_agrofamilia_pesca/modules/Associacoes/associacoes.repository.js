// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData, findWithScope } = require("../../shared/Utils/dbUtils");
const table = "view_associacoes";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à associações.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class Associacoes {

    /**
     * Retorna todas as associações cadastradas.
     */
    findAllAssociacoes(page, limit) {
        return findAll(table, page, limit);
    };

    /**
     * Busca uma associação pelo ID.
     */
    findById(id, page, limit) {
        return findBy("ID", id, false, table, page, limit);
    };

    /**
     * Busca uma associação pelo ID diretamente na tabela base `associacao`.
     */
    findByIdDelete(id) {
        return findBy("ID", id, false, "associacao");
    };

    /**
     * Busca associações pelo nome.
     */
    findByName(name, page, limit) {
        return findBy("NOME", name, true, table, page, limit);
    };

    /**
     * Busca associações pelo id da secretaria.
     */
    findbyIdSecretaria(id, page, limit) {
        return findBy("ID_SECRETARIA", id, true, table, page, limit);
    };

    /**
     * Busca associações pela categoria.
     */
    findbyCategoria(categoria, page, limit) {
        return findBy("CATEGORIA", categoria, true, table, page, limit);
    };

    /**
     * Busca associações vinculadas a uma secretaria.
     */
    findbySecretaria(secretaria, page, limit) {
        return findBy("SECRETARIA", secretaria, true, table, page, limit);
    };

    /**
     * Busca uma secretaria pelo ID.
     */
    findID_SECRETARIA(id) {
        return findBy("ID", id, false, "secretaria");
    };

    /**
     * Busca uma categoria pelo ID.
     */
    findID_CATEGORIA(id) {
        return findBy("ID", id, false, "categoria");
    };

     /**
     * Consulta pelo ID limitando por escopo.
     */
    findByIdScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo NOME limitando por escopo.
     */
    findByNameScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pela categoria limitando por escopo.
     */
    findByCategoriaScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Cria uma nova associação.
     */
    createAssociacao(associacao) {
        return insertData(associacao, "associacao");
    };

    /**
     * Atualiza os dados de uma associação existente.
     */
    updateAssociacao(id, associacao) {
        return updateData(id, associacao, "associacao");
    };

    /**
     * Remove uma associação do banco de dados.
     */
    deleteAssociacao(id) {
        return deleteData(id, "associacao");
    };
};

module.exports = new Associacoes();