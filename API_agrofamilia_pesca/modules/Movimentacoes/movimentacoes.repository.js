// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
const table = "view_produto_movimentacao";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class MovimentacoesRepository {

    /**
     * Retorna todas as movimentações de produtos a partir da view.
     */
    
    findAllMovimentacoes() {
        return findAll(table);
    };

    /**
     * Busca uma movimentação específica pelo ID na view.
     */

    findById(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Valida a existência de uma movimentação pelo ID diretamente na tabela base.
     */

    findByIdDelete(id) {
        return findBy("ID", id, false, "produto_movimentacao");
    };

    /**
     * Busca uma movimentação específica pelo ID_SECRETARIA na view.
     */

    findByIdSecretaria(id) {
        return findBy("ID_SECRETARIA", id, false, table);
    };

    /**
     * Busca uma movimentação específica pelo ID_PESSO na view.
     */

    findByIdPessoa(id) {
        return findBy("ID_PESSOA", id, false, table);
    };

    /**
     * Busca movimentações filtrando pelo DAP.
     */

    findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    /**
     * Busca movimentações filtrando pelo nome ou identificador do produto.
     */

    findbyProduto(produto) {
        return findBy("PRODUTO", produto, false, table);
    };

    /**
     * Busca movimentações pela data exata da movimentação.
     */

    findbyData(data) {
        return findBy("DATA_MOVIMENTACAO", data, true, table);
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    findByInicioFim(inicio, fim) {
        return findByInterval("DATA_MOVIMENTACAO", inicio, fim, table);
    };

    /**
     * Valida a existência de uma localização beneficiada pelo ID.
     */

    findID_LOCAL(id) {
        return findBy("ID", id, false, "localizacao_beneficiada");
    };

    /**
     * Valida a existência de um registro de agricultura familiar pelo ID.
     */

    findID_AGRICULTURA_FAMILIAR(id) {
        return findBy("ID", id, false, "agricultura_familiar");
    };

    /**
     * Valida a existência de um produto pelo ID.
     */

    findID_PRODUTO(id) {
        return findBy("ID", id, false, "produto");
    };

    /**
     * Cria uma nova movimentação de produto.
     */

    createMovimentacao(movimentacao) {
        return insertData(movimentacao, "produto_movimentacao");
    };

    /**
     * Atualiza uma movimentação existente pelo ID.
     */

    updateMovimentacao(id, movimentacao) {
        return updateData(id, movimentacao, "produto_movimentacao");
    };

    /**
     * Remove uma movimentação do banco de dados pelo ID.
     */

    deleteMovimentacao(id) {
        return deleteData(id, "produto_movimentacao");
    };
};

module.exports = new MovimentacoesRepository();