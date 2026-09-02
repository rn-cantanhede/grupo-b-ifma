// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData, findWithScope, findByIntervalWithScope } = require("../../shared/Utils/dbUtils");
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
    
    findAllMovimentacoes(page, limit) {
        return findAll(table, page, limit);
    };

    /**
     * Busca uma movimentação específica pelo ID na view.
     */

    findById(id, page, limit) {
        return findBy("ID", id, false, table, page, limit);
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

    findByIdSecretaria(id, page, limit) {
        return findBy("ID_SECRETARIA", id, true, table, page, limit);
    };

    /**
     * Busca uma movimentação específica pelo ID_PESSO na view.
     */

    findByIdPessoa(id, page, limit) {
        return findBy("ID_PESSOA", id, false, table, page, limit);
    };

    /**
     * Busca uma movimentação específica pelo ID_PESSO na view.
     */

    findByIdAssociado(id, page, limit) {
        return findBy("ID_ASSOCIADO", id, false, table, page, limit);
    };

    /**
     * Busca movimentações filtrando pelo DAP.
     */

    findbyDap(dap, page, limit) {
        return findBy("DAP", dap, true, table, page, limit);
    };

    /**
     * Busca movimentações filtrando pelo nome ou identificador do produto.
     */

    findbyProduto(produto, page, limit) {
        return findBy("PRODUTO", produto, true, table, page, limit);
    };

    /**
     * Busca movimentações pela data exata da movimentação.
     */

    findbyData(data, page, limit) {
        return findBy("DATA_MOVIMENTACAO", data, true, table, page, limit);
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    findByInicioFim(inicio, fim, page, limit) {
        return findByInterval("DATA_MOVIMENTACAO", inicio, fim, table, page, limit);
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
     * onsulta pelo ID limitando por escopo.
     */
    findByIdScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo DAP limitando por escopo.
     */
    findByDapScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * onsulta pelo PRODUTO limitando por escopo.
     */
    findByProdutoScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * onsulta pelo DATA_MOVIMENTACAO limitando por escopo.
     */
    findByDataScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo intervalo das datas de movimentação na view_produto_movimentacao limitando por escopo.
     */
    findByInicioFimScope(sessionID, sessionField, field, inicio, fim, page, limit) {
        return findByIntervalWithScope(sessionID, sessionField, field, inicio, fim, true, table, page, limit);
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