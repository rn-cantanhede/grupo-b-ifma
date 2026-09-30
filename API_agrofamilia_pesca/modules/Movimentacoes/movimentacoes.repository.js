// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData, findWithScope, findByIntervalWithScope } = require("../../shared/Utils/dbUtils");
const table = "produto_movimentacao";
const view = "view_produto_movimentacao";

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
        const find = findAll(view, page, limit);

        if (!find) {
            return findAll(table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma movimentação específica pelo ID na view.
     */

    findById(id, page, limit) {
        const find = findBy("ID", id, false, view, page, limit);

        if (!find) {
            return findBy("ID", id, false, table, page, limit);
        };

        return find;
    };

    /**
     * Valida a existência de uma movimentação pelo ID diretamente na tabela base.
     */

    findByIdDelete(id) {
        return findBy("ID", id, false, table, 1, 1);
    };

    /**
     * Busca uma movimentação específica pelo ID_SECRETARIA na view.
     */

    findByIdSecretaria(id, page, limit) {
        const find = findBy("ID_SECRETARIA", id, true, view, page, limit);

        if (!find) {
            return findBy("ID_SECRETARIA", id, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma movimentação específica pelo ID_PESSO na view.
     */

    findByIdPessoa(id, page, limit) {
        const find = findBy("ID_PESSOA", id, false, view, page, limit);

        if (!find) {
            return findBy("ID_PESSOA", id, false, table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma movimentação específica pelo ID_PESSO na view.
     */

    findByIdAssociado(id, page, limit) {
        const find = findBy("ID_ASSOCIADO", id, false, view, page, limit);

        if (!find) {
            return findBy("ID_ASSOCIADO", id, false, table, page, limit);
        };

        return find;
    };

    /**
     * Busca movimentações filtrando pelo DAP.
     */

    findbyDap(dap, page, limit) {
        const find = findBy("DAP", dap, true, view, page, limit);

        if (!find) {
            return findBy("DAP", dap, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca movimentações filtrando pelo nome ou identificador do produto.
     */

    findbyProduto(produto, page, limit) {
        const find = findBy("PRODUTO", produto, true, view, page, limit);

        if (!find) {
            return findBy("PRODUTO", produto, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca movimentações pela data exata da movimentação.
     */

    findbyData(data, page, limit) {
        const find = findBy("DATA_MOVIMENTACAO", data, true, view, page, limit);

        if (!find) {
            return findBy("DATA_MOVIMENTACAO", data, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    findByInicioFim(inicio, fim, page, limit) {
        const find = findByInterval("DATA_MOVIMENTACAO", inicio, fim, view, page, limit);

        if (!find) {
            return findByInterval("DATA_MOVIMENTACAO", inicio, fim, table, page, limit);
        };

        return find;
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
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo DAP limitando por escopo.
     */
    findByDapScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * onsulta pelo PRODUTO limitando por escopo.
     */
    findByProdutoScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * onsulta pelo DATA_MOVIMENTACAO limitando por escopo.
     */
    findByDataScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo intervalo das datas de movimentação na view_produto_movimentacao limitando por escopo.
     */
    findByInicioFimScope(sessionID, sessionField, field, inicio, fim, page, limit) {
        const find = findByIntervalWithScope(sessionID, sessionField, field, inicio, fim, true, view, page, limit);

        if (!find) {
            return findByIntervalWithScope(sessionID, sessionField, field, inicio, fim, true, table, page, limit);
        };

        return find;
    };

    /**
     * Cria uma nova movimentação de produto.
     */

    createMovimentacao(movimentacao) {
        return insertData(movimentacao, table);
    };

    /**
     * Atualiza uma movimentação existente pelo ID.
     */

    updateMovimentacao(id, movimentacao) {
        return updateData(id, movimentacao, table);
    };

    /**
     * Remove uma movimentação do banco de dados pelo ID.
     */

    deleteMovimentacao(id) {
        return deleteData(id, table);
    };
};

module.exports = new MovimentacoesRepository();