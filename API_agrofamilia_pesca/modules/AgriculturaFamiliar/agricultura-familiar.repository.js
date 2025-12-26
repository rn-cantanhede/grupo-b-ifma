// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
const table = "view_agricultura_familiar";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à Agricultura Familiar.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */
class AgriculturaFamiliarRepository {

    /**
     * Busca todos os registros de agricultura familiar.
     */
    findAllAgriculturaFamiliar() {
        return findAll(table);
    };

    /**
     * Busca um registro específico pelo ID.
     */
    findById(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Busca um registro pelo ID diretamente na tabela real,
     * geralmente utilizada antes de operações de exclusão.
     */
    findByIdDelete(id) {
        return findBy("ID", id, false, "agricultura_familiar");
    };

    /**
     * Busca registros pelo nome.
     */
    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    /**
     * Busca registros pelo número do CAF.
     *
     * Busca exata, pois CAF é um identificador único.
     */
    findbyCaf(caf) {
        return findBy("CAF", caf, false, table);
    };

    /**
     * Busca registros pelo número da DAP.
     *
     * Busca exata, pois DAP é um identificador único.
     */
    findbyDap(dap) {
        return findBy("DAP", dap, false, table);
    };

    /**
     * Busca registros pelo nome do programa.
     */
    findbyPrograma(programa) {
        return findBy("PROGRAMA", programa, true, table);
    };

    /**
     * Valida a existência de um associado pelo ID.
     */
    findID_ASSOCIADO(id) {
        return findBy("ID", id, false, "associado");
    };

    /**
     * Valida a existência de um programa pelo ID.
     */
    findID_PROGRAMA(id) {
        return findBy("ID", id, false, "programa");
    };

    /**
     * Cria um novo registro de agricultura familiar.
     */
    createAgriculturaFamiliar(data) {
        return insertData(data, "agricultura_familiar");
    };

    /**
     * Atualiza um registro existente de agricultura familiar.
     */
    updateAgriculturaFamiliar(id, data) {
        return updateData(id, data, "agricultura_familiar");
    };

    /**
     * Remove um registro de agricultura familiar.
     */
    deleteAgriculturaFamiliar(id) {
        return deleteData(id, "agricultura_familiar");
    };
};

module.exports = new AgriculturaFamiliarRepository();