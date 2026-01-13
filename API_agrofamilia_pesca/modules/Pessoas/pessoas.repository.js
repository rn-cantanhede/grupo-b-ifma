// Importa as funções utilitárias responsáveis pelas operações básicas no banco de dados.
// padronizando as operações de CRUD na aplicação.
const { findAll, findBy, findByInterval, insertData, updateData, deleteData } = require("../../shared/Utils/dbUtils");
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

    findAllPessoas() {
        return findAll(view);
    };

    /**
     * Busca uma pessoa pelo ID.
     */

    findById(id) {
        return findBy("ID", id, false, view);
    };

    /**
     * Busca pessoas pelo id da secretaria.
     */
    findByIdSecretaria(id) {
        return findBy("ID_SECRETARIA", id, false, view);
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

    findByName(name) {
        return findBy("NOME", name, true, view);
    };

    /**
     * Busca pessoas filtrando pelo gênero.
     */

    findbyGenero(genero) {
        return findBy("GENERO", genero, true, view);
    };

    /**
     * Busca pessoas pela data de nascimento.
     */

    findbyData(data) {
        return findBy("DATA_NASCIMENTO", data, true, view);
    };

    /**
     * Busca pessoas dentro de um intervalo de datas de nascimento.
     */

    findByInicioFim(inicio, fim) {
        return findByInterval("DATA_NASCIMENTO", inicio, fim, view);
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