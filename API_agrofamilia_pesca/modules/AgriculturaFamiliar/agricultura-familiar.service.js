const Erros = require("../../shared/errors/Errors");
const { findByIdName, find, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const associacoesRepository = require("../Associacoes/associacoes.repository");
const AgriculturaFamiliarRepository = require("./agricultura-familiar.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Agricultura Familiar.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class AgriculturaFamiliarService {

    /**
     * Retorna todos os registros de agricultura familiar.
     */
    async findAllAgriculturaFamiliar(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await AgriculturaFamiliarRepository.findAllAgriculturaFamiliar();
            },

            secretario: async function () {
                return find(
                    user.secretaria,
                    AgriculturaFamiliarRepository.findByIdSecretaria
                );
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                return find(
                    associacao.ID,
                    AgriculturaFamiliarRepository.findByIdAssociacao
                );
            },

            usuario: async function () {
                return find(
                    user.id,
                    AgriculturaFamiliarRepository.findByIdPessoa
                );
            },
        });
    };

    /**
     * Busca um registro por ID ou por nome.
     */
    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    AgriculturaFamiliarRepository.findById,
                    AgriculturaFamiliarRepository.findByName
                );
            },

            secretario: async function () {
                const result = await findByIdName(
                    value,
                    AgriculturaFamiliarRepository.findById,
                    AgriculturaFamiliarRepository.findByName
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await findByIdName(
                    value,
                    AgriculturaFamiliarRepository.findById,
                    AgriculturaFamiliarRepository.findByName
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca registros pelo número do CAF.
     */
    async findbyCaf(caf, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    caf,
                    AgriculturaFamiliarRepository.findbyCaf
                );
            },

            secretario: async function () {
                const result = await find(
                    caf,
                    AgriculturaFamiliarRepository.findbyCaf
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await find(
                    caf,
                    AgriculturaFamiliarRepository.findbyCaf
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca registros pelo número da DAP.
     */
    async findbyDap(dap, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    dap,
                    AgriculturaFamiliarRepository.findbyDap
                );
            },

            secretario: async function () {
                const result = await find(
                    dap,
                    AgriculturaFamiliarRepository.findbyDap
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
                    AgriculturaFamiliarRepository.findbyDap
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Busca registros vinculados a um programa específico.
     */
    async findbyPrograma(programa, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    programa,
                    AgriculturaFamiliarRepository.findbyPrograma
                );
            },

            secretario: async function () {
                const result = await find(
                    programa,
                    AgriculturaFamiliarRepository.findbyPrograma
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },

            associacao: async function () {
                const associacao = await find(
                    user.secretaria,
                    associacoesRepository.findbyIdSecretaria
                );

                const result = await find(
                    programa,
                    AgriculturaFamiliarRepository.findbyPrograma
                );

                return listUsers(result, "ID_ASSOCIACAO", associacao.ID);
            },
        });
    };

    /**
     * Cria um novo registro de agricultura familiar.
     */
    async createAgriculturaFamiliar(data) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_ASSOCIADO",
                validation: AgriculturaFamiliarRepository.findID_ASSOCIADO,
                errorMsg: "ID_ASSOCIADO invalido"
            },
            {
                field: "ID_PROGRAMA",
                validation: AgriculturaFamiliarRepository.findID_PROGRAMA,
                errorMsg: "ID_PROGRAMA invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await AgriculturaFamiliarRepository.createAgriculturaFamiliar(data);
    };

    /**
     * Atualiza um registro existente de agricultura familiar.
     */
    async updateAgriculturaFamiliar(id, data) {

        // Verifica se existe antes de atualizar
        const idAgri = await AgriculturaFamiliarRepository.findById(id);

        if (!idAgri) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_ASSOCIADO",
                validation: AgriculturaFamiliarRepository.findID_ASSOCIADO,
                errorMsg: "ID_ASSOCIADO invalido"
            },
            {
                field: "ID_PROGRAMA",
                validation: AgriculturaFamiliarRepository.findID_PROGRAMA,
                errorMsg: "ID_PROGRAMA invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(data, validations);

        // Aplica a atualização no banco de dados
        return await AgriculturaFamiliarRepository.updateAgriculturaFamiliar(id, data);
    };

    /**
     * Remove um registro de agricultura familiar.
     */
    async deleteAgriculturaFamiliar(id) {

        // Verifica se existe na tabela real antes de excluir
        const idAgri = await AgriculturaFamiliarRepository.findByIdDelete(id);

        if (!idAgri) {
            throw new Erros("ID invalido", 404);
        };

        // Remove definitivamente
        return await AgriculturaFamiliarRepository.deleteAgriculturaFamiliar(id);
    };
};

module.exports = new AgriculturaFamiliarService();