const Erros = require("../../shared/errors/Errors");
const { find, findByInterval, VerifyNivel, convertString, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const associacoesRepository = require("../Associacoes/associacoes.repository");
const MovimentacoesRepository = require("./movimentacoes.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Movimentação.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class MovimentacoesService {

    /**
     * Retorna todas as movimentações registradas.
     */

    async findAllMovimentacoesuser(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await MovimentacoesRepository.findAllMovimentacoes();
            },

            secretario: async function () {
                return await find(
                    user.secretaria,
                    MovimentacoesRepository.findByIdSecretaria()
                );
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                return await find(
                    associacao.ID,
                    MovimentacoesRepository.findByIdSecretaria
                );
            },

            usuario: async function () {
                return await find(
                    user.id,
                    MovimentacoesRepository.findByIdPessoa
                );
            },
        });
    };

    /**
     * Busca uma movimentação pelo ID.
     */

    async findById(id, user) {
        // Valida se o valor recebido é numérico antes de realizar a busca.
        return VerifyNivel({
            user,

            admin: async function () {
                if (!isNaN(id)) {
                    return find(
                        id,
                        MovimentacoesRepository.findById
                    );
                };
                throw new Erros("Apenas Id's", 403);
            },

            secretario: async function () {
                if (isNaN(id)) {
                    throw new Erros("Apenas Id's", 403);
                };

                const result = await find(
                    id,
                    MovimentacoesRepository.findById
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                if (isNaN(id)) {
                    throw new Erros("Apenas Id's", 403);
                };

                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await find(
                    id,
                    MovimentacoesRepository.findById
                );

                return await listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },

            usuario: async function () {
                const result = await find(
                    id,
                    MovimentacoesRepository.findById
                );

                return await listUsers(result, "ID_PESSOA", user.id);
            },
        });
    };

    /**
     * Busca movimentações associadas a um DAP específico.
     */

    async findbyDap(dap, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    dap,
                    MovimentacoesRepository.findbyDap
                );
            },

            secretario: async function () {
                const result = await find(
                    dap,
                    MovimentacoesRepository.findbyDap
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await find(
                    dap,
                    MovimentacoesRepository.findbyDap
                );

                return await listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },

            usuario: async function () {
                const result = await find(
                    dap,
                    MovimentacoesRepository.findbyDap
                );

                return await listUsers(result, "ID_PESSOA", user.id);
            },
        });
    };

    /**
     * Busca movimentações associadas a um produto específico.
     */

    async findbyProduto(produto, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    convertString(produto),
                    MovimentacoesRepository.findbyProduto
                );
            },

            secretario: async function () {
                const result = await find(
                    convertString(produto),
                    MovimentacoesRepository.findbyProduto
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await find(
                    convertString(produto),
                    MovimentacoesRepository.findbyProduto
                );

                return await listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },

            usuario: async function () {
                const result = await find(
                    convertString(produto),
                    MovimentacoesRepository.findbyProduto
                );

                return await listUsers(result, "ID_PESSOA", user.id);
            },
        });
    };

    /**
     * Busca movimentações ocorridas em uma data específica.
     */

    async findbyData(data, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    data,
                    MovimentacoesRepository.findbyData
                );
            },

            secretario: async function () {
                const result = await find(
                    data,
                    MovimentacoesRepository.findbyData
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await find(
                    data,
                    MovimentacoesRepository.findbyData
                );

                return await listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },

            usuario: async function () {
                const result = await find(
                    data,
                    MovimentacoesRepository.findbyData
                );

                return await listUsers(result, "ID_PESSOA", user.id);
            },
        });
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    async findByInicioFim(inicio, fim, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByInterval(
                    inicio,
                    fim,
                    MovimentacoesRepository.findByInicioFim
                );
            },

            secretario: async function () {
                const result = await findByInterval(
                    inicio,
                    fim,
                    MovimentacoesRepository.findByInicioFim
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await findByInterval(
                    inicio,
                    fim,
                    MovimentacoesRepository.findByInicioFim
                );

                return await listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },

            usuario: async function () {
                const result = await findByInterval(
                    inicio,
                    fim,
                    MovimentacoesRepository.findByInicioFim
                );

                return await listUsers(result, "ID_PESSOA", user.id);
            },
        });
    };

    /**
     * Cria uma nova movimentação de produto.
     */

    async createMovimentacao(movimentacao) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_LOCAL",
                validation: MovimentacoesRepository.findID_LOCAL,
                errorMsg: "ID_LOCAL invalido"
            },
            {
                field: "ID_AGRICULTURA_FAMILIAR",
                validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR,
                errorMsg: "ID_AGRICULTURA_FAMILIAR invalido"
            },
            {
                field: "ID_PRODUTO",
                validation: MovimentacoesRepository.findID_PRODUTO,
                errorMsg: "ID_PRODUTO invalido"
            },
            // { field: 'NOME', validationFn: (val) => val.length > 0, errorMessage: 'Nome do cliente é obrigatório' }, 
            // { field: 'EMAIL', validationFn: (val) => /\S+@\S+\.\S+/.test(val), errorMessage: 'Email inválido' },
        ];

        // Executa todas as validações definidas
        await validationsUtils.validate(movimentacao, validations);

        // Insere no banco de dados
        return await MovimentacoesRepository.createMovimentacao(movimentacao);
    };

    /**
     * Atualiza uma movimentação existente.
     */

    async updateMovimentacao(id, movimentacao) {

        // Verifica existe antes de atualizar
        const idMovimentacao = await MovimentacoesRepository.findById(id);

        if (!idMovimentacao) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_LOCAL",
                validation: MovimentacoesRepository.findID_LOCAL,
                errorMsg: "ID_LOCAL invalido"
            },
            {
                field: "ID_AGRICULTURA_FAMILIAR",
                validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR,
                errorMsg: "ID_AGRICULTURA_FAMILIAR invalido"
            },
            {
                field: "ID_PRODUTO",
                validation: MovimentacoesRepository.findID_PRODUTO,
                errorMsg: "ID_PRODUTO invalido"
            },
            // { field: 'NOME', validationFn: (val) => val.length > 0, errorMessage: 'Nome do cliente é obrigatório' }, 
            // // { field: 'EMAIL', validationFn: (val) => /\S+@\S+\.\S+/.test(val), errorMessage: 'Email inválido' },
        ];

        // Executa as validações
        await validationsUtils.validate(movimentacao, validations);

        // Aplica a atualização no banco de dados
        return await MovimentacoesRepository.updateMovimentacao(id, movimentacao);
    };

    /**
     * Remove uma movimentação do sistema.
     */

    async deleteMovimentacao(id) {

        // Verifica se existe na tabela real antes de excluir
        const idMovimentacao = await MovimentacoesRepository.findByIdDelete(id);

        if (!idMovimentacao) {
            throw new Erros("ID não existente", 404);
        };

        // Remove definitivamente
        return await MovimentacoesRepository.deleteMovimentacao(id);
    };
};

module.exports = new MovimentacoesService();