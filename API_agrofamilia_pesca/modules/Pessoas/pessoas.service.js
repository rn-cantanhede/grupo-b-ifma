const Erros = require("../../shared/errors/Errors");
const { find, findByInterval, findByIdName, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const PessoasRepository = require("./pessoas.repository");
const associadosRepository = require("../Associados/associados.repository");
const associacaoRepository = require("../Associacoes/associacoes.repository");

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
        return VerifyNivel({
            user,

            admin: async function () {
                return await PessoasRepository.findAllPessoas();
            },

            secretario: async function () {
                return find(
                    user.secretaria,
                    PessoasRepository.findByIdSecretaria
                );
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacaoRepository.findID_SECRETARIA
                );

                return find(
                    associacao.ID,
                    PessoasRepository.findByIdAssociacaao
                );
            },

            usuario: async function () {
                console.log(user.id);
                return find(
                    user.id,
                    PessoasRepository.findById
                );

            },
        });
    };

    /**
     * Busca uma pessoa pelo ID ou pelo nome.
     */

    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    PessoasRepository.findById,
                    PessoasRepository.findByName
                );
            },

            secretario: async function () {
                const result = await findByIdName(
                    value,
                    associadosRepository.findById,
                    associadosRepository.findByName
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacaoRepository.findID_SECRETARIA
                );

                const result = await findByIdName(
                    value,
                    associadosRepository.findById,
                    associadosRepository.findByName
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca pessoas filtrando pelo gênero.
     */

    async findbyGenero(genero, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(genero, PessoasRepository.findbyGenero);
            },

            secretario: async function () {

                const result = await find(genero, PessoasRepository.findbyGenero);

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacaoRepository.findID_SECRETARIA
                );

                const result = await find(genero, PessoasRepository.findbyGenero);

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });

    };

    /**
     * Busca pessoas pela data de nascimento.
     */

    async findbyData(data, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(data, PessoasRepository.findbyData);
            },

            secretario: async function () {
                const result = await find(data, PessoasRepository.findbyData);

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacaoRepository.findID_SECRETARIA
                );

                const result = await find(data, PessoasRepository.findbyData);

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca pessoas dentro de um intervalo de datas de nascimento.
     */

    async findByInicioFim(inicio, fim, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByInterval(
                    inicio,
                    fim,
                    PessoasRepository.findByInicioFim
                );
            },

            secretario: async function () {
                const result = await findByInterval(
                    inicio,
                    fim,
                    PessoasRepository.findByInicioFim
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacaoRepository.findID_SECRETARIA
                );

                const result = await findByInterval(
                    inicio,
                    fim,
                    PessoasRepository.findByInicioFim
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Cria um novo registro de pessoa após validação dos dados.
     */

    async createPessoa(data) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [];

        // Executa todas as validações definidas
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await PessoasRepository.createPessoa(data);
    };

    /**
     * Atualiza os dados de uma pessoa existente.
     */

    async updatePessoa(id, pessoa) {

        // Verifica se existe antes de atualizar
        const idPessoa = await PessoasRepository.findById(id);

        if (!idPessoa) {
            throw new Erros("ID inválido", 404);
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

    async deletePessoa(id) {

        // Verifica se o programa existe na tabela real antes de excluir
        const idPessoa = await PessoasRepository.findById(id);

        if (!idPessoa) {
            throw new Erros("ID não existe", 404);
        };

        // Remove definitivamente
        return await PessoasRepository.deletePessoa(id);
    };
};

module.exports = new PessoasService();