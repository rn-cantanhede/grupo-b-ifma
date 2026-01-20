const Erros = require("../../shared/errors/Errors");
const BaseService = require("../../shared/base/BaseService");
const AgriculturaPolicy = require("./policies/agricultura.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const associadosRepository = require("../Associados/associados.repository");
const AgriculturaFamiliarRepository = require("./agricultura-familiar.repository");
const { findByIdName, find } = require("../../shared/Utils/findUtils");

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
        if (!AgriculturaPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await AgriculturaFamiliarRepository.findAllAgriculturaFamiliar();

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca um registro por ID ou por nome.
     */
    async find(value, user) {
        if (!AgriculturaPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByIdName(
            value,
            AgriculturaFamiliarRepository.findById,
            AgriculturaFamiliarRepository.findByName
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca registros pelo número do CAF.
     */
    async findbyCaf(caf, user) {
        if (!AgriculturaPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            caf,
            AgriculturaFamiliarRepository.findbyCaf
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca registros pelo número da DAP.
     */
    async findbyDap(dap, user) {
        if (!AgriculturaPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            dap,
            AgriculturaFamiliarRepository.findbyDap
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca registros vinculados a um programa específico.
     */
    async findbyPrograma(programa, user) {
        if (!AgriculturaPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            programa,
            AgriculturaFamiliarRepository.findbyPrograma
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Cria um novo registro de agricultura familiar.
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_ASSOCIADO": "",
     *   "ID_PROGRAMA": "",
     *   "DAP": ""
     * }
     * 
     */
    async createAgriculturaFamiliar(data, user) {
        if (!AgriculturaPolicy.canPost(user)) {
            throw new Erros("Acesso negado", 403);
        };
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
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_ASSOCIADO": "",
     *   "ID_PROGRAMA": "",
     *   "DAP": ""
     * }
     * 
     */
    async updateAgriculturaFamiliar(id, data, user) {

        // Verifica se existe antes de atualizar
        const idAgri = await AgriculturaFamiliarRepository.findById(id);

        if (!idAgri) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!AgriculturaPolicy.canUpdate(Alluser, idAgri)) {
            throw new Erros("Acesso negado", 403);
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
    async deleteAgriculturaFamiliar(id, user) {

        // Verifica se existe na tabela real antes de excluir
        const idAgri = await AgriculturaFamiliarRepository.findById(id);

        if (!idAgri) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!AgriculturaPolicy.canDelete(Alluser, idAgri)) {
            throw new Erros("Acesso negado", 403);
        };

        // Remove definitivamente
        return await AgriculturaFamiliarRepository.deleteAgriculturaFamiliar(id);
    };
};

module.exports = new AgriculturaFamiliarService();