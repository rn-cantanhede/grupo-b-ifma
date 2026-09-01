// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData, findWithScope, findByIntervalWithScope } = require("../../shared/Utils/dbUtils");
const table = "view_pessoas";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class AssociadosRepository {

    /**
     * Retorna todos os registros da view de associados.
     */

    findAllAssociados(page, limit) {
        return findAll(table, page, limit);
    };

    /**
     * Consulta associado pelo ID na view principal.
     */

    findById(id, page, limit) {
        return findBy("ID", id, false, table, page, limit);
    };

    findId(id, page, limit) {
        return findBy("ID", id, false, "view_associados", page, limit);
    };
    
    /**
     * Busca pessoas pelo id da secretaria.
     */
    findByIdSecretaria(id, page, limit) {
        return findBy("ID_SECRETARIA", id, true, table, page, limit);
    };

    /**
     * Busca pessoas pelo id da pessoa.
     */

    findByIdPessoa(id, page, limit) {
        return findBy("ID_PESSOA", id, false, table, page, limit);
    };

    /**
     * Consulta associado pelo ID na tabela principal.
     */

    findByIdDelete(id, page, limit) {
        return findBy("ID", id, false, "associado", page, limit);
    };

    /**
     * Consulta associados por nome, retornando múltiplos resultados.
     */

    findByName(name, page, limit) {
        return findBy("NOME", name, true, table, page, limit);
    };

    /**
     * Consulta associado pelo CAF.
     */

    findbyCaf(caf, page, limit) {
        return findBy("CAF", caf, false, table, page, limit);
    };

    /**
     * Consulta associado pelo DAP.
     */

    findbyDap(dap, page, limit) {
        return findBy("DAP", dap, false, table, page, limit);
    };

    /**
     * Lista associados filtrando por associação.
     */

    findbyAssociacao(associacao, page, limit) {
        return findBy("ASSOCIACAO", associacao, true, table, page, limit);
    };

    /**
     * Lista associados filtrando por id da associação.
     */

    findbyIdAssociacao(id, page, limit) {
        return findBy("ID_ASSOCIACAO", id, true, table, page, limit);
    };

    /**
     * Lista associados filtrando por secretaria.
     */
    findbySecretaria(secretaria, page, limit) {
        return findBy("SECRETARIA", secretaria, true, table, page, limit);
    };

    /**
     * Lista associados filtrando pelo ID da secretaria.
     */
    findbyIdSecretaria(id, page, limit) {
        return findBy("ID_SECRETARIA", id, true, table, page, limit);
    };

    /**
     * Consulta associados pela data de validade do CAF.
     */

    findbyDataCaf(data, page, limit) {
        return findBy("VALIDADE_CAF", data, true, table, page, limit);
    };

    /**
     * Consulta registros pela validade do CAF dentro de um intervalo.
     */

    findByInicioFimCaf(inicio, fim, page, limit) {
        return findByInterval("VALIDADE_CAF", inicio, fim, table, page, limit);
    };

    /**
     * Consulta ID na tabela pessoa.
     */

    findID_PESSOA(id, page, limit) {
        return findBy("ID", id, false, "pessoa", page, limit);
    };

    /**
     * Consulta ID na tabela associacao.
     */

    findID_ASSOCIACAO(id, page, limit) {
        return findBy("ID", id, false, "associacao", page, limit);
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
     * Consulta pelo caf limitando por escopo.
     */
    findByCafScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo caf limitando por escopo.
     */
    findByDapScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pela validade do caf limitando por escopo.
     */
    findByDataCafScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo intervalo das datas de movimentação na view_pessoas limitando por escopo.
     */
    findByInicioFimCafScope(sessionID, sessionField, field, inicio, fim, page, limit) {
        return findByIntervalWithScope(sessionID, sessionField, field, inicio, fim, true, table, page, limit);
    };

    /**
     * Insere um novo associado na tabela correspondente.
     */

    createAssociado(associado) {
        return insertData(associado, "associado");
    };

    /**
     * Modifica um associado na tabela correspondente.
     */

    updateAssociado(id, associado) {
        return updateData(id, associado, "associado");
    };

    /**
     * Deleta um associado na tabela correspondente.
     */

    deleteAssociado(id) {
        return deleteData(id, "associado");
    };
};

module.exports = new AssociadosRepository();
