// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData, findWithScope } = require("../../shared/Utils/dbUtils");
const table = "view_localizacao_beneficiado";

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
        return findAll(table, page, limit);
    };

    /**
     * Busca uma localização beneficiada pelo ID.
     */
    
    findById(id, page, limit) {
        return findBy("ID", id, false, table, page, limit);
    };

    /**
     * Busca uma localização beneficiada pelo ID.
     */
    
    findByIdAssociacao(id, page, limit) {
        console.log({
            page,
            limit
        })
        return findBy("ID_ASSOCIACAO", id, true, table, page, limit);
    };

    /**
     * Busca uma localização beneficiada pelo ID da secretaria.
     */

    findByIdSecretaria(id, page, limit) {
        return findBy("ID_SECRETARIA", id, false, table, page, limit);
    };

    /**
     * Busca uma localização beneficiada pelo ID da pessoa.
     */

    findByIdPessoa(id) {
        return findBy("ID_PESSOA", id, false, table);
    };

    /**
     * Busca uma localização beneficiada pelo ID
     * para validação antes da exclusão.
     */

    findByIdDelete(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Busca localizações beneficiadas pelo nome.
     *
     * A busca é feita de forma parcial (LIKE).
     */

    findByName(name, page, limit) {
        return findBy("NOME", name, true, table, page, limit);
    };

    /**
     * Busca localizações beneficiadas pelo id da associação.
     */

    findbyIdAssociacao(associacao, page, limit) {
        return findBy("ID_ASSOCIACAO", associacao, false, table, page, limit);
    };

    /**
     * Busca localizações beneficiadas pela associação.
     */

    findbyAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, table);
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
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo NOME limitando por escopo.
     */
    findByNameScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo ID_ASSOCIACAO limitando por escopo.
     */
    findByIdAssociacaoScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Consulta pelo ID_ASSOCIACAO limitando por escopo.
     */
    findByNameAssociacaoScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
    };

    /**
     * Cria uma nova localização beneficiada.
     *
     * Os dados são inseridos diretamente
     * na tabela correspondente.
     */

    createLocalizacao(localizacao) {
        return insertData(localizacao, "localizacao_beneficiada");
    };

    /**
     * Atualiza uma localização beneficiada existente.
     */

    updateLocalizacao(id, localizacao) {
        return updateData(id, localizacao, "localizacao_beneficiada");
    };

    /**
     * Remove uma localização beneficiada.
     */

    deleteLocalizacao(id) {
        return deleteData(id, "localizacao_beneficiada");
    };
};

module.exports = new LocalizacaoBeneficiadoRepository();