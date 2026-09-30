// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData, findWithScope } = require("../../shared/Utils/dbUtils");
const table = "localizacao_beneficiada";
const view = "view_localizacao_beneficiado";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class LocalizacaoBeneficiadoRepository {

    /**
     * Retorna todas as localizações beneficiadas.
     */

    findAllLocalizacao(page, limit) {
        const find = findAll(view, page, limit);

        if (!find) {
            return findAll(table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma localização beneficiada pelo ID.
     */

    findById(id, page, limit) {
        const find = findBy("ID", id, false, view, page, limit);

        if (!find) {
            return findBy("ID", id, false, table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma localização beneficiada pelo ID.
     */

    findByIdAssociacao(id, page, limit) {
        const find = findBy("ID_ASSOCIACAO", id, true, view, page, limit);

        if (!find) {
            return findBy("ID_ASSOCIACAO", id, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma localização beneficiada pelo ID da secretaria.
     */

    findByIdSecretaria(id, page, limit) {
        const find = findBy("ID_SECRETARIA", id, false, view, page, limit);

        if (!find) {
            return findBy("ID_SECRETARIA", id, false, table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma localização beneficiada pelo ID da pessoa.
     */

    findByIdPessoa(id) {
        const find = findBy("ID_PESSOA", id, false, view, 1, 1);

        if (!find) {
            return findBy("ID_PESSOA", id, false, table, 1, 1);
        };

        return find;
    };

    /**
     * Busca uma localização beneficiada pelo ID
     * para validação antes da exclusão.
     */

    findByIdDelete(id) {
        const find = findBy("ID", id, false, view, 1, 1);

        if (!find) {
            return findBy("ID", id, false, table, 1, 1);
        };

        return find;
    };

    /**
     * Busca localizações beneficiadas pelo nome.
     *
     * A busca é feita de forma parcial (LIKE).
     */

    findByName(name, page, limit) {
        const find = findBy("NOME", name, true, view, page, limit);

        if (!find) {
            return findBy("NOME", name, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca localizações beneficiadas pelo id da associação.
     */

    findbyIdAssociacao(associacao, page, limit) {
        const find = findBy("ID_ASSOCIACAO", associacao, false, view, page, limit);

        if (!find) {
            return findBy("ID_ASSOCIACAO", associacao, false, table, page, limit);
        };

        return find;
    };

    /**
     * Busca localizações beneficiadas pela associação.
     */

    findbyAssociacao(associacao) {
        const find = findBy("ASSOCIACAO", associacao, true, view, 1, 1);

        if (!find) {
            return findBy("ASSOCIACAO", associacao, true, table, 1, 1);
        };

        return find;
    };

    /**
     * Valida a existência de um associado pelo ID.
     *
     * Utilizado principalmente para validações
     * antes de criar ou atualizar registros.
     */

    findID_ASSOCIADO(id) {
        return findBy("ID", id, false, "associado");
    };

    /**
    * Consulta pelo ID limitando por escopo.
    */
    findByIdScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo NOME limitando por escopo.
     */
    findByNameScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo ID_ASSOCIACAO limitando por escopo.
     */
    findByIdAssociacaoScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo ID_ASSOCIACAO limitando por escopo.
     */
    findByNameAssociacaoScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Cria uma nova localização beneficiada.
     *
     * Os dados são inseridos diretamente
     * na tabela correspondente.
     */

    createLocalizacao(localizacao) {
        return insertData(localizacao, table);
    };

    /**
     * Atualiza uma localização beneficiada existente.
     */

    updateLocalizacao(id, localizacao) {
        return updateData(id, localizacao, table);
    };

    /**
     * Remove uma localização beneficiada.
     */

    deleteLocalizacao(id) {
        return deleteData(id, table);
    };
};

module.exports = new LocalizacaoBeneficiadoRepository();