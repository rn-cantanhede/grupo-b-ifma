const Erros = require("../../shared/errors/Errors");
const { findByIdName, find, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const secretariasRepository = require("../Secretarias/secretarias.repository");
const ProgramasRepository = require("./programas.repository");

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
     * Retorna todos os programas disponíveis.
     */

    /**
     * O uso do VerifyNivel do jeito que está, não está otimizado
     * modificação nas VIEWs do database resoveriam o problema.
     */

    async findAllProgramas(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await ProgramasRepository.findAllProgramas();
            },

            secretario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                return await ProgramasRepository.findbySecretaria(secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                return await ProgramasRepository.findbySecretaria(secretaria.NOME);
            },

            usuario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                return await ProgramasRepository.findbySecretaria(secretaria.NOME);
            },
        });
    };

    /**
     * Busca um programa pelo valor informado.
     * Se for numérico, busca por ID; caso contrário, busca por nome.
     */

    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    ProgramasRepository.findById,
                    ProgramasRepository.findByName
                );
            },

            secretario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await findByIdName(
                    value,
                    ProgramasRepository.findById,
                    ProgramasRepository.findByName
                );

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await findByIdName(
                    value,
                    ProgramasRepository.findById,
                    ProgramasRepository.findByName
                );

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            usuario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await findByIdName(
                    value,
                    ProgramasRepository.findById,
                    ProgramasRepository.findByName
                );

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },
        });
    };

    /**
     * Busca programas vinculados a uma secretaria específica.
     */

    async findbySecretaria(secretaria, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(secretaria, ProgramasRepository.findbySecretaria);
            },
        });
    };

    /**
     * Busca programas filtrando pelo estado.
     */

    async findbyEstado(estado, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(estado, ProgramasRepository.findbyEstado);
            },
        });
    };

    /**
     * Busca programas pela origem do recurso financeiro.
     */

    async findbyOrigemRecurso(recurso, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(recurso, ProgramasRepository.findbyOrigemRecurso);
            },

            secretario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(recurso, ProgramasRepository.findbyOrigemRecurso);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(recurso, ProgramasRepository.findbyOrigemRecurso);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            usuario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(recurso, ProgramasRepository.findbyOrigemRecurso);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },
        });
    };

    /**
     * Busca programas pela data de início.
     */

    async findbyDataInicio(data, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(data, ProgramasRepository.findbyDataInicio);
            },

            secretario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(data, ProgramasRepository.findbyDataInicio);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(data, ProgramasRepository.findbyDataInicio);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            usuario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(data, ProgramasRepository.findbyDataInicio);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },
        });
    };

    /**
     * Busca programas pela data de fim.
     */

    async findbyDataFim(data, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(data, ProgramasRepository.findbyDataFim);
            },

            secretario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(data, ProgramasRepository.findbyDataFim);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(data, ProgramasRepository.findbyDataFim);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            usuario: async function () {
                const secretaria = await secretariasRepository.findById(user.secretaria);
                const result = await find(data, ProgramasRepository.findbyDataFim);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },
        });
    };

    /**
     * Cria um novo programa após validar regras de negócio.
     */

    async createPrograma(programa) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_SECRETARIA",
                validation: ProgramasRepository.findID_SECRETARIA,
                errorMsg: "ID_SECRETARIA invalido"
            },
        ];

        // Executa todas as validações definidas
        await validationsUtils.validate(programa, validations);

        // Insere o programa no banco de dados
        return await ProgramasRepository.createPrograma(programa);
    };

    /**
     * Atualiza um programa existente.
     */

    async updatePrograma(id, programa) {

        // Verifica se o programa existe antes de atualizar
        const idPrograma = await ProgramasRepository.findById(id);

        if (!idPrograma) {
            throw new Erros("ID invalido", 404);
        };

        // Valida se a secretaria informada é válida
        const validations = [
            {
                field: "ID_SECRETARIA",
                validation: ProgramasRepository.findID_SECRETARIA,
                errorMsg: "ID_SECRETARIA invalido"
            },
        ];

        // Executa as validações
        await validationsUtils.validate(programa, validations);

        // Atualiza o programa no banco
        return await ProgramasRepository.updatePrograma(id, programa);
    };

    /**
     * Remove um programa do banco de dados.
     */

    async deletePrograma(id) {

        // Verifica se o programa existe na tabela real antes de excluir
        const idPrograma = await ProgramasRepository.findByIdDelete(id);

        if (!idPrograma) {
            throw new Erros("ID não existe", 404);
        };

        // Remove definitivamente
        return await ProgramasRepository.deletePrograma(id);
    };
};

module.exports = new ProgramasService();