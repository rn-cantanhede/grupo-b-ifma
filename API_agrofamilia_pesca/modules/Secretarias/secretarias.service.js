const BaseService = require("../../shared/base/BaseService");
const Erros = require("../../shared/errors/Errors");
const SecretariasPolicy = require("./policies/secretarias.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const SecretariasRepository = require("./secretarias.repository");
const { findByIdName, find } = require("../../shared/Utils/findUtils");

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
     * Retorna todas as secretarias cadastradas, filtradas pelo escopo do usuário.
     */
    async findAllProgramas(user) {
        if (!SecretariasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const secretarias = await SecretariasRepository.findAllSecretarias();

        return BaseService.applyScope({
            user,
            data: secretarias,
            mapping: { secretaria: 'ID', pessoa: 'ID' }
        });
    };

    /**
     * Busca secretaria por ID ou Nome, respeitando a visibilidade do usuário.
     */
    async find(value, user) {
        if (!SecretariasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const secretarias = await findByIdName(
            value,
            SecretariasRepository.findById,
            SecretariasRepository.findByName
        );

        return BaseService.applyScope({
            user,
            data: secretarias,
            mapping: { secretaria: 'ID', pessoa: 'ID' }
        });
    };

    /**
     * Lista secretarias filtrando pelo estado.
     */
    async findbyEstado(estado, user) {
        if (!SecretariasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const secretarias = await find(estado, SecretariasRepository.findbyEstado);

        return BaseService.applyScope({
            user,
            data: secretarias,
            mapping: { secretaria: 'ID', pessoa: 'ID' }
        });
    };

    /**
     * Lista secretarias filtrando pela cidade.
     */
    async findbyCidade(cidade, user) {
        if (!SecretariasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const secretarias = await find(cidade, SecretariasRepository.findbyCidade);

        return BaseService.applyScope({
            user,
            data: secretarias,
            mapping: { secretaria: 'ID', pessoa: 'ID' }
        });
    };

    /**
     * Cria uma nova secretaria.
     * 
     *  Formato passado no body:
     * 
     * {
     *    "NOME": "",
     *    "CIDADE": "",
     *    "ESTADO": "",
     *    "ENDERECO": ""
     *  }
     * 
     */
    async createSecretaria(data, user) {
        if (!SecretariasPolicy.canPost(user)) {
            throw new Erros("Acesso negado", 403);
        };

        await validationsUtils.validate(data, []);
        return await SecretariasRepository.createSecretaria(data);
    };

    /**
     * Atualiza uma secretaria existente.
     * 
     *  Formato passado no body:
     * 
     * {
     *    "NOME": "",
     *    "CIDADE": "",
     *    "ESTADO": "",
     *    "ENDERECO": ""
     *  }
     * 
     */
    async updateSecretaria(id, secretaria, user) {
        if (!SecretariasPolicy.canUpdate(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const registroExistente = await SecretariasRepository.findById(id);
        if (!registroExistente) throw new Erros("ID invalido", 404);

        await validationsUtils.validate(secretaria, []);
        return await SecretariasRepository.updateSecretaria(id, secretaria);
    };

    /**
     * Remove uma secretaria existente.
     */
    async deleteSecretaria(id, user) {
        if (!SecretariasPolicy.canDelete(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const registroExistente = await SecretariasRepository.findById(id);
        if (!registroExistente) throw new Erros("ID invalido", 404);

        return await SecretariasRepository.deleteSecretaria(id);
    };
};

module.exports = new SecretariasService();