// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
const table = "view_programas";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à localização dos beneficiados.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */

class ProgramasRepository {

    /**
     * Retorna todos os registros de programas a partir da view.
     */

    findAllProgramas() {
        return findAll(table);
    };

    /**
     * Busca um programa pelo ID na view.
     * O parâmetro `false` indica busca exata (não usa LIKE).
     */

    findById(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Busca um programa pelo ID diretamente na tabela real `programa`.
     * Usado geralmente antes de operações de exclusão.
     */

    findByIdDelete(id) {
        return findBy("ID", id, false, "programa");
    };

    /**
     * Busca programas pelo nome.
     * O parâmetro `true` indica busca parcial (LIKE).
     */

    findByName(name) {
        return findBy("NOME", name, true, table);
    };

    /**
     * Busca programas vinculados a uma secretaria específica.
     * A busca é parcial para permitir flexibilidade.
     */

    findbySecretaria(secretaria) {
        return findBy("SECRETARIA", secretaria, true, table);
    };

    /**
     * Busca programas por estado.
     */

    findbyEstado(estado) {
        return findBy("ESTADO", estado, true, table);
    };

    /**
     * Busca programas pela origem do recurso financeiro.
     */

    findbyOrigemRecurso(recurso) {
        return findBy("ORIGEM_RECURSO", recurso, true, table);
    };

    /**
     * Busca programas com data de início correspondente.
     */

    findbyDataInicio(data) {
        return findBy("DATA_INICIO", data, true, table);
    };

    /**
     * Busca programas com data de fim correspondente.
     */

    findbyDataFim(data) {
        return findBy("DATA_FIM", data, true, table);
    };

    /**
     * Busca uma secretaria pelo ID diretamente na tabela `secretaria`.
     * Normalmente usado para validações de integridade.
     */

    findID_SECRETARIA(value) {
        return findBy("ID", value, false, "secretaria");
    };

    /**
     * Insere um novo programa na tabela `programa`.
     */

    createPrograma(programa) {
        return insertData(programa, "programa");
    };

    /**
     * Atualiza um programa existente pelo ID.
     */

    updatePrograma(id, programa) {
        return updateData(id, programa, "programa");
    };

    /**
     * Remove um programa da tabela `programa` pelo ID.
     */
    
    deletePrograma(id) {
        return deleteData(id, "programa");
    };
};

module.exports = new ProgramasRepository();