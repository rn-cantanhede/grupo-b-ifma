// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, insertData, updateData, deleteData, loginDB, findWithScope } = require("../../shared/Utils/dbUtils");
const table = "usuario";
const view = "view_usuarios";

/**
 * Repositório responsável pelas operações de acesso a dados
 * relacionadas à usuarios.
 *
 * Centraliza todas as consultas, inserções, atualizações
 * e remoções referentes à localização.
 */
class UsuariosRepository {

    /**
     * Retorna todas os usuarios cadastradas.
     */
    findAllUsuarios(page, limit) {
        return findAll(view, page, limit);
    };

    /**
     * Consulta usuario pelo ID.
     */
    findById(id, page, limit) {
        return findBy("ID", id, false, view, page, limit);
    };

    /**
     * Consulta usuario pelo ID na tabela principal.
     */
    findByIdDelete(id) {
        return findBy("ID", id, false, table);
    }

    /**
     * Consulta usuario pelo nome.
     * Retorna múltiplos resultados.
     */
    findByName(name, page, limit) {
        return findBy("NOME", name, true, view, page, limit);
    };

    /**
     * Lista usuarios filtrando pelo nivel.
     */
    findByNivel(nivel,  page, limit) {
        return findBy("NIVEL", nivel, false, view,  page, limit);
    };

    /**
     * Lista usuarios filtrando pela secretaria.
     */
    findBySecretaria(secretaria, page, limit) {
        return findBy("SECRETARIA", secretaria, true, view, page, limit);
    };

    /**
     * Consulta usuarios pelo ID da secretaria.
     */
    findByIdSecretaria(id) {
        return findBy("ID_SECRETARIA", id, false, view);
    };

    /**
     * Consulta usuarios pelo ID da pessoa.
     */
    findByIdPessoa(id) {
        return findBy("ID_PESSOA", id, false, view);
    };

    /**
     * Consulta usuarios pelo Id da associaçao.
     */
    findByIdAssociacao(id) {
        return findBy("ID_ASSOCIACAO", id, false, view);
    };

    /**
     * Consulta usuarios pela associaçao.
     */
    findByAssociacao(associacao) {
        return findBy("ASSOCIACAO", associacao, true, view);
    };

    /**
     * Consulta usuarios pelo Login na view_usuarios.
     */
    findByLogin(login, page, limit) {
        return findBy("LOGIN", login, true, view, page, limit);
    };

    /**
     * Consulta pelo ID na view_usuarios limitando por escopo.
     */
    findByIdScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, false, view, page, limit);
    };

    /**
     * Consulta pelo NOME na view_usuarios limitando por escopo.
     */
    findByNameScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);
    };

    /**
     * Consulta pelo nivel na view_usuarios limitando por escopo.
     */
    findByNivelScope(sessionID, sessionField, fieldID, value, page, limit) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit,);
    };

    /**
     * Consulta pelo Login na view_usuarios limitando por escopo.
     */
    findByLoginScope(sessionID, sessionField, fieldID, value, page, limit,) {
        return findWithScope(sessionID, sessionField, fieldID, value, true, view, page, limit);
    };


    /**
     * Consulta ID_PESSOA pelo ID na tabela pessoa.
     */
    findByID_PESSOA(id) {
        return findBy("ID", id, false, "pessoa");
    };

    /**
     * Consulta ID_SECRETARIA pelo ID na tabela secretaria.
     */
    findByID_SECRETARIA(id) {
        return findBy("ID", id, false, "secretaria");
    };

    findForUpdate(id) {
        return findBy("ID", id, false, table);
    };

    /**
     * Insere um novo usuario.
     */
    createUsuario(usuario) {
        return insertData(usuario, table);
    };

    /**
     * Atualiza um usuario existente.
     */
    updateUsuario(id, usuario) {
        return updateData(id, usuario, table);
    };

    /**
     * Remove um usuario existente.
     */
    deleteUsuario(id) {
        return deleteData(id, table);
    };

    /**
     * Realiza a consulta de autenticação do usuário no banco de dados.
     */
    login(login) {
        return loginDB(login);
    };
};

module.exports = new UsuariosRepository();