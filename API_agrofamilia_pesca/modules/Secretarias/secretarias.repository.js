// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
const table = "secretaria";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class SecretariasRepository {

    /**
     * Retorna todas as secretarias cadastradas.
     */

    findAllSecretarias() {
        return findAll(table);
    };

    /**
     * Consulta secretaria pelo ID.
     */

    findById(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Consulta secretarias pelo nome.
     * Retorna múltiplos resultados.
     */

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    /**
     * Lista secretarias filtrando pelo estado.
     */

    findbyEstado(estado) {
        return findBy("ESTADO", estado, true, table);
    };

    /**
     * Lista secretarias filtrando pela cidade.
     */

    findbyCidade(cidade) {
        return findBy("CIDADE", cidade, true, table);
    };

    /**
     * Insere uma nova secretaria.
     */

    createSecretaria(data) {
        return insertData(data, table);
    };

    /**
     * Atualiza uma secretaria existente.
     */

    updateSecretaria(id, secretaria) {
        return updateData(id, secretaria, table);
    };

    /**
     * Remove uma secretaria existente.
     */
    
    deleteSecretaria(id) {
        return deleteData(id, table);
    };
};

module.exports = new SecretariasRepository();