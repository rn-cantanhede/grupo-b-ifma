const Erros = require("../../shared/errors/Errors");
const BaseService = require("../../shared/base/BaseService");
const AssociadosPolicy = require("./policies/associados.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const AssociadosRepository = require("./associados.repository");
const associadosRepository = require("./associados.repository");
const { find, findByInterval, findByIdName } = require("../../shared/Utils/findUtils");

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
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await AssociadosRepository.findAllAssociados();

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associado por ID ou Nome, conforme o tipo de entrada.
     */

    async find(value, user) {
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByIdName(value,
            AssociadosRepository.findById,
            AssociadosRepository.findByName
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associado pelo CAF.
     */

    async findbyCaf(caf, user) {
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            caf,
            AssociadosRepository.findbyCaf
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associado pelo DAP.
     */

    async findbyDap(dap, user) {
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            dap,
            AssociadosRepository.findbyDap
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Lista associados filtrando pela associação.
     */

    async findbyAssociacao(associacao, user) {
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            associacao,
            AssociadosRepository.findbyAssociacao
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associados pela data exata de validade do CAF.
     */

    async findbyData(data, user) {
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            data,
            AssociadosRepository.findbyDataCaf
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca associados por intervalo de validade do CAF.
     */

    async findByInicioFim(inicio, fim, user) {
        if (!AssociadosPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByInterval(
            inicio,
            fim,
            AssociadosRepository.findByInicioFimCaf
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Cria um associado após validar referências obrigatórias.
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_PESSOA": "",
     *   "ID_ASSOCIACAO": "",
     *   "CAF": "",
     *   "VALIDADE_CAF": "",
     * }
     * 
     */

    async createAssociado(associado, user) {
        if (!AssociadosPolicy.canPost(user)) {
            throw new Erros("Acesso negado", 403);
        };

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
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_PESSOA": "",
     *   "ID_ASSOCIACAO": "",
     *   "CAF": "",
     *   "VALIDADE_CAF": "",
     * }
     * 
     */

    async updateAssociado(id, associado, user) {

        // Verifica se existe antes de atualizar
        const idAssociado = await AssociadosRepository.findId(id);

        if (!idAssociado) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        // Solução provisória
        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!AssociadosPolicy.canUpdate(Alluser, idAssociado)) {
            throw new Erros("Acesso negado", 403);
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

    async deleteAssociado(id, user) {
        // Verifica se existe antes de atualizar
        const idAssociado = await AssociadosRepository.findId(id);

        if (!idAssociado) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        // Solução provisória
        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!AssociadosPolicy.canUpdate(Alluser, idAssociado)) {
            throw new Erros("Acesso negado", 403);
        };

        // Remove definitivamente
        return await AssociadosRepository.deleteAssociado(id);
    };
};

module.exports = new AssociadosService();