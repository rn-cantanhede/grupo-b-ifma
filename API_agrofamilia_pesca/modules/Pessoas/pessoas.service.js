const Erros = require("../../shared/errors/Errors");
const BaseService = require("../../shared/base/BaseService");
const PessoasPolicy = require("./policies/pessoas.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const PessoasRepository = require("./pessoas.repository");
const associadosRepository = require("../Associados/associados.repository");
const { find, findByInterval, findByIdName, VerifyNivel, listUsers, findByScope } = require("../../shared/Utils/findUtils");
const baseScope = require("../../shared/base/baseScope");

class PessoasService {
    /**
     * Retorna a lista completa de pessoas.
     */

    /**
     * A consulta foi feita na tabela Associado,
     * pois tem como filtrar os dados por associacao
     * e secretaria, diferente da tabela Pessoa
     */
    async findAllPessoas(user) {
        if (!PessoasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        return baseScope.getAll(user, {
            admin: PessoasRepository.findAllPessoas,
            secretaria: PessoasRepository.findByIdSecretaria,
            associacao: PessoasRepository.findByIdAssociacaao,
            usuario: PessoasRepository.findById
        });
    };

    /**
     * Busca uma pessoa pelo ID ou pelo nome.
     */

    async find(value, session) {
        if (!PessoasPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                findByIdName(
                    value,
                    PessoasRepository.findById,
                    PessoasRepository.findByName
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "ID",
                    "NOME",
                    value,
                    PessoasRepository.findByIdScope,
                    PessoasRepository.findByNameScope
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "ID",
                    "NOME",
                    value,
                    PessoasRepository.findByIdScope,
                    PessoasRepository.findByNameScope
                ),
        });
    };

    /**
     * Busca pessoas filtrando pelo gênero.
     */

    async findbyGenero(genero, session) {
        if (!PessoasPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                find(
                    genero,
                    PessoasRepository.findbyGenero
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "ID",
                    "GENERO",
                    genero,
                    PessoasRepository.findByGeneroScope,
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "ID",
                    "GENERO",
                    genero,
                    PessoasRepository.findByGeneroScope
                ),
        });
    };

    /**
     * Busca pessoas pela data de nascimento.
     */

    async findbyData(data, session) {
        if (!PessoasPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                find(
                    data,
                    PessoasRepository.findbyData
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "DATA_NASCIMENTO",
                    "DATA_NASCIMENTO",
                    data,
                    PessoasRepository.findByDataScope,
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "DATA_NASCIMENTO",
                    "DATA_NASCIMENTO",
                    data,
                    PessoasRepository.findByDataScope
                ),
        });
    };

    /**
     * Busca pessoas dentro de um intervalo de datas de nascimento.
     */

    async findByInicioFim(inicio, fim, user) {
        if (!PessoasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByInterval(
            inicio,
            fim,
            PessoasRepository.findByInicioFim
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Cria um novo registro de pessoa após validação dos dados.
     * 
     * Formato passado no body:
     * 
     * {
     *   "NOME": "",
     *   "CPF": "",
     *   "GENERO": "",
     *   "DATA_NASCIMENTO": ""
     * }
     * 
     */

    async createPessoa(data, user) {
        const targetUser = await associadosRepository.findByIdSecretaria(user.secretaria);

        if (!PessoasPolicy.canPost(user, targetUser)) {
            throw new Erros("Acesso negado", 403);
        };

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [];

        // Executa todas as validações definidas
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await PessoasRepository.createPessoa(data);
    };

    /**
     * Atualiza os dados de uma pessoa existente.
     * 
     * Formato passado no body:
     * 
     * {
     *   "NOME": "",
     *   "CPF": "",
     *   "GENERO": "",
     *   "DATA_NASCIMENTO": ""
     * }
     * 
     */

    async updatePessoa(id, pessoa, user) {
        // Verifica se existe antes de atualizar
        const idPessoa = await PessoasRepository.findId(id);

        if (!idPessoa) {
            throw new Erros("ID inválido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        // Solução provisória
        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: null,
            associacao: null
        };

        if (!PessoasPolicy.canUpdate(Alluser, targetUser)) {
            throw new Erros("Acesso negado", 403);
        };

        // Verifica se existe antes de atualizar
        const validations = [];

        // Executa as validações
        await validationsUtils.validate(pessoa, validations);

        // Aplica a atualização no banco de dados
        return await PessoasRepository.updatePessoa(id, pessoa);
    };

    /**
     * Remove uma pessoa pelo ID.
     */

    async deletePessoa(id, user) {
        // Verifica se o programa existe na tabela real antes de excluir
        const idPessoa = await PessoasRepository.findId(id);

        if (!idPessoa) {
            throw new Erros("ID não existe", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        // Solução provisória
        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: null,
            associacao: null
        };

        if (!PessoasPolicy.canDelete(Alluser, targetUser)) {
            throw new Erros("Acesso negado", 403);
        };

        // Remove definitivamente
        return await PessoasRepository.deletePessoa(id);
    };
};

module.exports = new PessoasService();