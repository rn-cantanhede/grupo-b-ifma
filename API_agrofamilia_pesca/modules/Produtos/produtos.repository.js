// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
const table = "view_produtos";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class ProdutoRepository {
    /**
     * Retorna todos os produtos disponíveis na view.
     */

    findAllProdutos() {
        return findAll(table);
    };

    /**
     * Busca um produto pelo ID.
     */

    findById(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Busca produtos pelo nome.
     */
    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    /**
     * Valida a existência de um tipo de produto pelo ID.
     */

    findID_TIPO_PRODUTO(value) {
        return findBy("ID", value, false, "tipo_produto");
    };

    /**
     * Cria um novo produto.
     */

    createProduto(produto) {
        return insertData(produto, "produto");
    };

    /**
     * Atualiza os dados de um produto existente.
     */

    updateProduto(id, produto) {
        return updateData(id, produto, "produto");
    };

    /**
     * Remove um produto pelo ID.
     */

    deleteProduto(id) {
        return deleteData(id, "produto");
    };
};

module.exports = new ProdutoRepository();