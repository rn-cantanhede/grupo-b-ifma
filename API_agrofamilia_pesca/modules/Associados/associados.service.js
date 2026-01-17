const Erros = require("../../shared/errors/Errors");
const { find, findByInterval, findByIdName, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const AssociadosRepository = require("./associados.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Associado.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class AssociadosService {

    /**
     * Retorna todos os associados cadastrados.
     */

    async findAllAssociados(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await AssociadosRepository.findAllAssociados();
            },

            secretario: async function () {
                return find(
                    user.secretaria,
                    AssociadosRepository.findByIdSecretaria
                );
            },

            associacao: async function () {
                const associacao = await find(
                    user.id,
                    AssociadosRepository.findID_PESSOA
                );

                return find(
                    associacao.ID,
                    AssociadosRepository.findbyIdAssociacao
                );
            },

            usuario: async function () {
                return find(
                    user.id,
                    AssociadosRepository.findByIdPessoa
                );
            },
        });
    };

    /**
     * Busca associado por ID ou Nome, conforme o tipo de entrada.
     */

    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(value,
                    AssociadosRepository.findById,
                    AssociadosRepository.findByName
                );
            },

            secretario: async function () {
                const result = await findByIdName(value,
                    AssociadosRepository.findById,
                    AssociadosRepository.findByName
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.id,
                    AssociadosRepository.findID_PESSOA
                );

                const result = await findByIdName(value,
                    AssociadosRepository.findById,
                    AssociadosRepository.findByName
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca associado pelo CAF.
     */

    async findbyCaf(caf, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    caf,
                    AssociadosRepository.findbyCaf
                );
            },

            secretario: async function () {
                const result = await find(
                    caf,
                    AssociadosRepository.findbyCaf
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.id,
                    AssociadosRepository.findID_PESSOA
                );

                const result = await find(
                    caf,
                    AssociadosRepository.findbyCaf
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca associado pelo DAP.
     */

    async findbyDap(dap, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    dap,
                    AssociadosRepository.findbyDap
                );
            },

            secretario: async function () {
                const result = await find(
                    dap,
                    AssociadosRepository.findbyDap
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.id,
                    AssociadosRepository.findID_PESSOA
                );

                const result = await find(
                    dap,
                    AssociadosRepository.findbyDap
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Lista associados filtrando pela associação.
     */

    async findbyAssociacao(associacao, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    associacao,
                    AssociadosRepository.findbyAssociacao
                );
            },

            secretario: async function () {
                const result = await find(
                    associacao,
                    AssociadosRepository.findbyAssociacao
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },
        });
    };

    /**
     * Busca associados pela data exata de validade do CAF.
     */

    async findbyData(data, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    data,
                    AssociadosRepository.findbyDataCaf
                );
            },

            secretario: async function () {
                const result = await find(
                    data,
                    AssociadosRepository.findbyDataCaf
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.id,
                    AssociadosRepository.findID_PESSOA
                );

                const result = await find(
                    data,
                    AssociadosRepository.findbyDataCaf
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca associados por intervalo de validade do CAF.
     */

    async findByInicioFim(inicio, fim, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByInterval(
                    inicio,
                    fim,
                    AssociadosRepository.findByInicioFimCaf
                );
            },

            secretario: async function () {
                const result = await findByInterval(
                    inicio,
                    fim,
                    AssociadosRepository.findByInicioFimCaf
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.id,
                    AssociadosRepository.findID_PESSOA
                );

                const result = await findByInterval(
                    inicio,
                    fim,
                    AssociadosRepository.findByInicioFimCaf
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Cria um associado após validar referências obrigatórias.
     */

    async createAssociado(associado) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_PESSOA",
                validation: AssociadosRepository.findID_PESSOA,
                errorMsg: "ID_PESSOA invalido"
            },
            {
                field: "ID_ASSOCIACAO",
                validation: AssociadosRepository.findID_ASSOCIACAO,
                errorMsg: "ID_ASSOCIACAO invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(associado, validations);

        // Insere no banco de dados
        return await AssociadosRepository.createAssociado(associado);
    };

    /**
     * Modifica um associado após validar referências obrigatórias.
     */

    async updateAssociado(id, associado) {

        // Verifica se existe antes de atualizar
        const idAssociado = await AssociadosRepository.findById(id);

        if (!idAssociado) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_PESSOA",
                validation: AssociadosRepository.findID_PESSOA,
                errorMsg: "ID_PESSOA invalido"
            },
            {
                field: "ID_ASSOCIACAO",
                validation: AssociadosRepository.findID_ASSOCIACAO,
                errorMsg: "ID_ASSOCIACAO invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(associado, validations);

        // Aplica a atualização no banco de dados
        return await AssociadosRepository.updateAssociado(id, associado);
    };

    /**
     * Deleta um associado após validar o id.
     */

    async deleteAssociado(id) {

        // Verifica se existe na tabela real antes de excluir
        const idAssociado = await AssociadosRepository.findByIdDelete(id);

        if (!idAssociado) {
            throw new Erros("ID invalido", 404);
        };

        // Remove definitivamente
        return await AssociadosRepository.deleteAssociado(id);
    };
};

module.exports = new AssociadosService();