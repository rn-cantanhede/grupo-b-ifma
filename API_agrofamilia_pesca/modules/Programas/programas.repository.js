// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
const table = "programa";
const view = "view_programas";

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

    findAllProgramas(page, limit) {
        const find = findAll(view, page, limit);

        if (!find) {
            return findAll(table, page, limit);
        };

        return find;
    };

    /**
     * Busca um programa pelo ID na view.
     * O parâmetro `false` indica busca exata (não usa LIKE).
     */

    findById(id, page, limit) {
        const find = findBy("ID", id, false, view, page, limit);

        if (!find) {
            return findBy("ID", id, false, table, page, limit);
        };

        return find;
    };

    /**
     * Busca um programa pelo ID diretamente na tabela real `programa`.
     * Usado geralmente antes de operações de exclusão.
     */

    findByIdDelete(id, page, limit) {
        const find = findBy("ID", id, false, "programa", page, limit);

        if (!find) {
            return findBy("ID", id, table, "programa", page, limit);
        };

        return find;
    };

    /**
     * Busca programas pelo nome.
     * O parâmetro `true` indica busca parcial (LIKE).
     */

    findByName(name, page, limit) {
        const find = findBy("NOME", name, true, view, page, limit);

        if (!find) {
            return findBy("NOME", name, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca programas vinculados a uma secretaria específica.
     * A busca é parcial para permitir flexibilidade.
     */

    findbySecretaria(secretaria, page, limit) {
        const find = findBy("SECRETARIA", secretaria, true, view, page, limit);

        if (!find) {
            return findBy("SECRETARIA", secretaria, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca programas vinculados a um id de secretaria específica.
     * A busca é parcial para permitir flexibilidade.
     */

    findbyIdSecretaria(secretaria, page, limit) {
        const find = findBy("ID_SECRETARIA", secretaria, true, view, page, limit);

        if (!find) {
            return findBy("ID_SECRETARIA", secretaria, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca programas por estado.
     */

    findbyEstado(estado, page, limit) {
        const find = findBy("ESTADO", estado, true, view, page, limit);

        if (!find) {
            return findBy("ESTADO", estado, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca programas pela origem do recurso financeiro.
     */

    findbyOrigemRecurso(recurso, page, limit) {
        const find = findBy("ORIGEM_RECURSO", recurso, true, view, page, limit);

        if (!find) {
            return findBy("ORIGEM_RECURSO", recurso, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca programas com data de início correspondente.
     */

    findbyDataInicio(data, page, limit) {
        const find = findBy("DATA_INICIO", data, true, view, page, limit);

        if (!find) {
            return findBy("DATA_INICIO", data, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca programas com data de fim correspondente.
     */

    findbyDataFim(data, page, limit) {
        const find = findBy("DATA_FIM", data, true, view, page, limit);

        if (!find) {
            return findBy("DATA_FIM", data, true, table, page, limit);
        };

        return find;
    };

    /**
     * Busca uma secretaria pelo ID diretamente na tabela `secretaria`.
     * Normalmente usado para validações de integridade.
     */

    findID_SECRETARIA(value, page, limit) {
        return findBy("ID", value, false, "secretaria", page, limit);
    };

    /**
     * Consulta pelo ID na view_programas limitando por escopo.
     */
    findByIdScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo NOME na view_programas limitando por escopo.
     */
    findByNameScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pela secretaria na view_programas limitando por escopo.
     */
    findBySecretariaScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo estado na view_programas limitando por escopo.
     */
    findByEstadoScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pela origem de recusos na view_programas limitando por escopo.
     */
    findByOrigemRecursoScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pela data de início na view_programas limitando por escopo.
     */
    findByDataInicioScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pela data de termino na view_programas limitando por escopo.
     */
    findByDataFimScope(sessionID, sessionField, fieldID, value, page, limit) {
        const find = findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);

        if (!find) {
            return findWithScope(sessionID, sessionField, fieldID, value, true, table, page, limit);
        };

        return find;
    };

    /**
     * Consulta pelo intervalo de datas na view_programas limitando por escopo.
     */
    // findByInicioFimScope(sessionID, sessionField, field, inicio, fim, page, limit) {
    //     return findByIntervalWithScope(sessionID, sessionField, field, inicio, fim, true, view, page, limit);
    // };

    /**
     * Insere um novo programa na tabela `programa`.
     */

    createPrograma(programa) {
        return insertData(programa, table);
    };

    /**
     * Atualiza um programa existente pelo ID.
     */

    updatePrograma(id, programa) {
        return updateData(id, programa, table);
    };

    /**
     * Remove um programa da tabela `programa` pelo ID.
     */

    deletePrograma(id) {
        return deleteData(id, table);
    };
};

module.exports = new ProgramasRepository();