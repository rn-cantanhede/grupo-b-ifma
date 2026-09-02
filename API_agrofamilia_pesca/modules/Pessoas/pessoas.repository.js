// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData, findWithScope, findByIntervalWithScope } = require("../../shared/Utils/dbUtils");
const table = "pessoa";
const view = "view_pessoas";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class PessoasRepository {
    /**
     * Retorna a lista completa de pessoas.
     */

    findAllPessoas(page, limit) {
        return findAll(view, page, limit);
    };

    /**
     * Busca uma pessoa pelo ID.
     */

    findById(id, page, limit) {
        return findBy("ID", id, false, view, page, limit);
    };

    findId(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Busca pessoas pelo id da secretaria.
     */
    findByIdSecretaria(id) {
        return findBy("ID_SECRETARIA", id, true, view);
    };

    /**
     * Busca pessoas pelo id da associação.
     */
    findByIdAssociacaao(id) {
        return findBy("ID_ASSOCIACAO", id, false, view);
    };

    /**
     * Busca pessoas pelo nome.
     */

    findByName(name, page, limit) {
        return findBy("NOME", name, true, view, page, limit);
    };

    /**
     * Busca pessoas filtrando pelo gênero.
     */

    findbyGenero(genero, page, limit) {
        return findBy("GENERO", genero, true, view, page, limit);
    };

    /**
     * Busca pessoas pela data de nascimento.
     */

    findbyData(data, page, limit) {
        return findBy("DATA_NASCIMENTO", data, true, view, page, limit);
    };

    /**
     * Busca pessoas dentro de um intervalo de datas de nascimento.
     */

    findByInicioFim(inicio, fim, page, limit) {
        return findByInterval("DATA_NASCIMENTO", inicio, fim, view, page, limit);
    };
    
    /**
     * Consulta pelo ID na view_usuarios limitando por escopo.
     */
    findByIdScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);
    };

    /**
     * Consulta pelo NOME na view_usuarios limitando por escopo.
     */
    findByNameScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);
    };

    /**
     * Consulta pelo GENERO na view_usuarios limitando por escopo.
     */
    findByGeneroScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);
    };

    /**
     * Consulta pelo DATA na view_usuarios limitando por escopo.
     */
    findByDataScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);
    };

    /**
     * Consulta pelo intervalo dos anos de ascimento na view_usuarios limitando por escopo.
     */
    findByInicioFimScope(sessionID, sessionField, field, inicio, fim, page, limit) {
        return findByIntervalWithScope(sessionID, sessionField, field, inicio, fim, true, view, page, limit);
    };

    /**
     * Cria um novo registro de pessoa.
     */

    createPessoa(data) {
        return insertData(data, table);
    };

    /**
     * Atualiza os dados de uma pessoa existente.
     */
    
    updatePessoa(id, pessoa) {
        return updateData(id, pessoa, table);
    };

    /**
     * Remove uma pessoa pelo ID.
     */

    deletePessoa(id) {
        return deleteData(id, table);
    };
};

module.exports = new PessoasRepository();