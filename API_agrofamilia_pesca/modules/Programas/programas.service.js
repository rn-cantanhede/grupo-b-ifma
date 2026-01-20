const Erros = require("../../shared/errors/Errors");
const { findByIdName } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const ProgramasRepository = require("./programas.repository");
const ProgramasPolicy = require("./policies/programas.policy");
const BaseService = require("../../shared/base/BaseService");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Programa.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class ProgramasService {

    /**
     * Retorna todos os programas.
     * O BaseService filtra o que o usuário não pode ver.
     */
    async findAllProgramas(user) {
        if (!ProgramasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await ProgramasRepository.findAllProgramas();

        return BaseService.applyScope({
            user,
            data: result,
            mapping: {
                secretaria: 'ID_SECRETARIA'
            },
        });
    };

    /**
     * Busca um programa. O BaseService garante que se ele achar um 
     * ID que não pertence ao usuário, ele barra o acesso.
     */
    async find(value, user) {
        if (!ProgramasPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        }

        const programa = await findByIdName(
            value,
            ProgramasRepository.findById,
            ProgramasRepository.findByName
        );

        return BaseService.applyScope({ user, data: programa });
    };

    /**
     * Cria um novo programa, aplicando validações e hash de senha.
     * 
     * Formato passado no body:
     * 
     * {
     *  "NOME": "",
     *   "DESCRICAO": "",
     *   "DATA_INICIO": "",
     *   "DATA_FIM": "",
     *   "ORIGEM_RECURSO": "",
     *   "VLR_REPASSE": "",
     *   "ID_SECRETARIA": ""
     * }
     * 
     */

    async createPrograma(programa, user) {
        if (!ProgramasPolicy.canPost(user)) {
            throw new Erros("Acesso negado", 403);
        };

        if (user.nivel !== 1 && programa.ID_SECRETARIA !== user.secretaria) {
            throw new Erros("Você só pode criar programas para sua secretaria", 403);
        };

        await validationsUtils.validate(programa, []);
        return await ProgramasRepository.createPrograma(programa);
    };

    /**
     * Atualiza um programa existente, aplicando validações e hash de senha se necessário.
     * 
     * Formato passado no body:
     * 
     * {
     *  "NOME": "",
     *   "DESCRICAO": "",
     *   "DATA_INICIO": "",
     *   "DATA_FIM": "",
     *   "ORIGEM_RECURSO": "",
     *   "VLR_REPASSE": "",
     *   "ID_SECRETARIA": ""
     * }
     * 
     */

    async updatePrograma(id, programa, user) {
        const registroExistente = await ProgramasRepository.findById(id);

        if (!registroExistente) {
            throw new Erros("ID invalido", 404);
        };

        if (!ProgramasPolicy.canUpdate(user, registroExistente)) {
            throw new Erros("Acesso negado", 403);
        };

        await validationsUtils.validate(programa, []);
        return await ProgramasRepository.updatePrograma(id, programa);
    };

    /**
     * Remove um programa existente.
     */
    async deletePrograma(id, user) {
        const registroExistente = await ProgramasRepository.findById(id);

        if (!registroExistente) {
            throw new Erros("ID não existe", 404);
        };

        if (!ProgramasPolicy.canDelete(user, registroExistente)) {
            throw new Erros("Acesso negado", 403);
        };

        return await ProgramasRepository.deletePrograma(id);
    };
};

module.exports = new ProgramasService();