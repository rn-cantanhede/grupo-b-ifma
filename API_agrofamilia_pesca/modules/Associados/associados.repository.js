// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
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

    findAllAssociados() {
        return findAll(table);
    };

    /**
     * Consulta associado pelo ID na view principal.
     */

    findById(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Consulta associado pelo ID na tabela principal.
     */

    findByIdDelete(id) {
        return findBy("ID", id, false, "associado");
    };

    /**
     * Consulta associados por nome, retornando múltiplos resultados.
     */

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    /**
     * Consulta associado pelo CAF.
     */

    findbyCaf(caf) {
        return findBy("CAF", caf, false, table);
    };

    /**
     * Consulta associado pelo DAP.
     */

    findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    /**
     * Lista associados filtrando por associação.
     */

    findbyAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, table);
    };

    /**
     * Consulta associados pela data de validade do CAF.
     */

    findbyData(data) {
        return findBy("VALIDADE_CAF", data, true, table);
    };

    /**
     * Consulta registros pela validade do CAF dentro de um intervalo.
     */

    findByInicioFim(inicio, fim) {
        return findByInterval("VALIDADE_CAF", inicio, fim, table);
    };

    /**
     * Consulta ID na tabela pessoa.
     */

    findID_PESSOA(id) {
        return findBy("ID", id, false, "pessoa");
    };

    /**
     * Consulta ID na tabela associacao.
     */

    findID_ASSOCIACAO(id) {
        return findBy("ID", id, false, "associacao");
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
