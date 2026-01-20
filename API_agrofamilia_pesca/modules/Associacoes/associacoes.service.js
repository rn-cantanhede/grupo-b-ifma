const Erros = require("../../shared/errors/Errors");
const BaseService = require("../../shared/base/BaseService");
const AssociacoesPolicy = require("./policies/associacoes.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const pessoasRepository = require("../Pessoas/pessoas.repository");
const AssociacoesRepository = require("./associacoes.repository");
const { findByIdName, find } = require("../../shared/Utils/findUtils");

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
        if (!AssociacoesPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await AssociacoesRepository.findAllAssociacoes();

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca uma associação por ID ou por nome.
     */
    async find(value, user) {
        if (!AssociacoesPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByIdName(
            value,
            AssociacoesRepository.findById,
            AssociacoesRepository.findByName
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associações vinculadas a uma categoria específica.
     */
    async findByCategoria(categoria, user) {
        if (!AssociacoesPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            categoria,
            AssociacoesRepository.findbyCategoria
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associações vinculadas a uma secretaria específica.
     */
    async findbySecretaria(secretaria, user) {
        if (!AssociacoesPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        return await find(
            secretaria,
            AssociacoesRepository.findbySecretaria
        );
    };

    /**
     * Cria uma nova associação.
     * 
     * Formato passado no body:
     * 
     * {
     *   "NOME": "",
     *   "ENDERECO": "",
     *   "ID_CATEGORIA": "",
     *   "ID_SECRETARIA": "",
     * }
     * 
     */
    async createAssociacao(associacao, user) {
        if (!AssociacoesPolicy.canPost(user)) {
            throw new Erros("Acesso negado", 403);
        };

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
     * 
     * Formato passado no body:
     * 
     * {
     *   "NOME": "",
     *   "ENDERECO": "",
     *   "ID_CATEGORIA": "",
     *   "ID_SECRETARIA": "",
     * }
     * 
     */

    async updateAssociacao(id, associacao, user) {

        // Verifica se existe antes de atualizar
        const idAssociacao = await AssociacoesRepository.findById(id);

        if (!idAssociacao) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await pessoasRepository.findId(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!AssociacoesPolicy.canUpdate(Alluser, idAssociacao)) {
            throw new Erros("Acesso negado", 403);
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
    async deleteAssociacao(id, user) {

        // Verifica se existe na tabela real antes de excluir
        const idAssociacao = await AssociacoesRepository.findByIdDelete(id);

        if (!idAssociacao) {
            throw new Erros("ID invalido", 404);
        };

       const targetUser = await pessoasRepository.findId(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!AssociacoesPolicy.canUpdate(Alluser, idAssociacao)) {
            throw new Erros("Acesso negado", 403);
        };

        // Remove definitivamente
        return await AssociacoesRepository.deleteAssociacao(id);
    };
};

module.exports = new AssociacoesService();