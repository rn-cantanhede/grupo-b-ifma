const Erros = require("../../shared/errors/Errors");
const { findByIdName, find, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const pessoasRepository = require("../Pessoas/pessoas.repository");
const AssociacoesRepository = require("./associacoes.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Associação.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class AssociacoesService {

    /**
     * Retorna todas as associações cadastradas.
     */
    async findAllAssociacoes(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await AssociacoesRepository.findAllAssociacoes();
            },

            secretario: async function () {
                return find(
                    user.secretaria,
                    AssociacoesRepository.findbyIdSecretaria
                );
            },

            associacao: async function () {
                const pessoa = await find(
                    user.id,
                    pessoasRepository.findById
                );
                return find(
                    pessoa.ID_ASSOCIACAO,
                    AssociacoesRepository.findById
                );
            },

            usuario: async function () {
                console.log(user)
                const pessoa = await find(
                    user.id,
                    pessoasRepository.findById
                );
                return find(
                    pessoa.ID_ASSOCIACAO,
                    AssociacoesRepository.findById
                );
            },
        });
    };

    /**
     * Busca uma associação por ID ou por nome.
     */
    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    AssociacoesRepository.findById,
                    AssociacoesRepository.findByName
                );
            },

            secretario: async function () {
                const result = findByIdName(
                    value,
                    AssociacoesRepository.findById,
                    AssociacoesRepository.findByName
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },
        });
    };

    /**
     * Busca associações vinculadas a uma categoria específica.
     */
    async findByCategoria(categoria, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    categoria,
                    AssociacoesRepository.findbyCategoria
                );
            },

            secretario: async function () {
                const result = await find(
                    categoria,
                    AssociacoesRepository.findbyCategoria
                );

                return listUsers(result, "ID_SECRETARIA", user.secretaria);
            },
        });
    };

    /**
     * Busca associações vinculadas a uma secretaria específica.
     */
    async findbySecretaria(secretaria, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(
                    secretaria,
                    AssociacoesRepository.findbySecretaria
                );
            },
        });
    };

    /**
     * Cria uma nova associação.
     */
    async createAssociacao(associacao) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_SECRETARIA",
                validation: AssociacoesRepository.findID_SECRETARIA,
                errorMsg: "ID_SECRETARIA invalido"
            },
            {
                field: "ID_CATEGORIA",
                validation: AssociacoesRepository.findID_CATEGORIA,
                errorMsg: "ID_CATEGORIA invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(associacao, validations);

        // Insere no banco de dados
        return await AssociacoesRepository.createAssociacao(associacao);
    };

    /**
     * Atualiza os dados de uma associação existente.
     */
    async updateAssociacao(id, associacao) {

        // Verifica se existe antes de atualizar
        const idAssociacao = await AssociacoesRepository.findById(id);

        if (!idAssociacao) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_SECRETARIA",
                validation: AssociacoesRepository.findID_SECRETARIA,
                errorMsg: "ID_SECRETARIA invalido"
            },
            {
                field: "ID_CATEGORIA",
                validation: AssociacoesRepository.findID_CATEGORIA,
                errorMsg: "ID_CATEGORIA invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(associacao, validations);

        // Aplica a atualização no banco de dados
        return await AssociacoesRepository.updateAssociacao(id, associacao);
    };

    /**
     * Remove uma associação do banco de dados.
     */
    async deleteAssociacao(id) {

        // Verifica se existe na tabela real antes de excluir
        const idAssociacao = await AssociacoesRepository.findByIdDelete(id);

        if (!idAssociacao) {
            throw new Erros("ID invalido", 404);
        };

        // Remove definitivamente
        return await AssociacoesRepository.deleteAssociacao(id);
    };
};

module.exports = new AssociacoesService();