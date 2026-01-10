const Erros = require("../../shared/errors/Errors");
const { findByIdName, find, VerifyNivel } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const SecretariasRepository = require("./secretarias.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade secretaria.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class SecretariasService {

    /**
     * Retorna todas as secretarias cadastradas.
     */

    async findAllProgramas(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await SecretariasRepository.findAllSecretarias();
            },

            secretario: async function () {
                return await find(
                    user.secretaria,
                    SecretariasRepository.findById
                );
            },

            associacao: async function () {
                return await find(
                    user.secretaria,
                    SecretariasRepository.findById
                );
            },

            usuario: async function () {
                return await find(
                    user.secretaria,
                    SecretariasRepository.findById
                );
            },
        });
    };

    /**
     * Busca secretaria por ID ou Nome.
     */

    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    SecretariasRepository.findById,
                    SecretariasRepository.findByName
                );
            },
        });
    };

    /**
     * Lista secretarias filtrando pelo estado.
     */

    async findbyEstado(estado, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(estado, SecretariasRepository.findbyEstado);
            },
        });
    };

    /**
     * Lista secretarias filtrando pela cidade.
     */

    async findbyCidade(cidade, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await SecretariasRepository.findbyCidade(cidade);
            },
        });
    };

    /**
     * Cria uma nova secretaria após validação dos dados.
     */

    async createSecretaria(data) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [];

        // Valida dependências antes da inserção
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await SecretariasRepository.createSecretaria(data);
    };

    /**
     * Atualiza uma secretaria existente.
     * Valida a existência do registro antes da atualização.
     */

    async updateSecretaria(id, secretaria) {

        // Verifica se existe antes de atualizar
        const idSecretaria = await SecretariasRepository.findById(id);

        if (!idSecretaria) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [];

        // Valida dependências antes da inserção
        await validationsUtils.validate(secretaria, validations);

        // Aplica a atualização no banco de dados
        return await SecretariasRepository.updateSecretaria(id, secretaria);
    };

    /**
     * Remove uma secretaria existente.
     * Valida a existência do registro antes da exclusão.
     */

    async deleteSecretaria(id) {

        // Verifica se existe na tabela real antes de excluir
        const idSecretaria = await SecretariasRepository.findById(id);

        if (!idSecretaria) {
            throw new Erros("ID invalido", 404);
        };

        // Exclui o programa
        return await SecretariasRepository.deleteSecretaria(id);
    };
};

module.exports = new SecretariasService();