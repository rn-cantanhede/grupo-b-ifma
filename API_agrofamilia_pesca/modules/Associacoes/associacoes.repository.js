// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
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
    findAllAssociacoes() {
        return findAll(table);
    };

    /**
     * Busca uma associação pelo ID.
     */
    findById(id) {
        return findBy("ID", id, false, table);
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
    findByName(name) {
        return findBy("NOME", name, false, table);
    };

    /**
     * Busca associações pela categoria.
     */
    findbyCategoria(categoria) {
        return findBy("CATEGORIA", categoria, true, table);
    };

    /**
     * Busca associações vinculadas a uma secretaria.
     */
    findbySecretaria(secretaria) {
        return findBy("SECRETARIA", secretaria, true, table);
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
    }

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