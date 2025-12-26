const Erros = require("../../shared/errors/Errors");
const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
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

    async getAll() {
        const result = await ProgramasRepository.findAllProgramas();
        return result;
    };

    /**
     * Busca um programa pelo valor informado.
     * Se for numérico, busca por ID; caso contrário, busca por nome.
     */

    async find(value) {
        return findByIdName(
            value,
            ProgramasRepository.findById,
            ProgramasRepository.findByName
        );
    };

    /**
     * Busca programas vinculados a uma secretaria específica.
     */

    async findbySecretaria(secretaria) {
        return find(secretaria, ProgramasRepository.findbySecretaria);
    };

    /**
     * Busca programas filtrando pelo estado.
     */

    async findbyEstado(estado) {
        return find(estado, ProgramasRepository.findbyEstado);
    };

    /**
     * Busca programas pela origem do recurso financeiro.
     */

    async findbyOrigemRecurso(recurso) {
        return find(recurso, ProgramasRepository.findbyOrigemRecurso);
    };

    /**
     * Busca programas pela data de início.
     */

    async findbyDataInicio(data) {
        return find(data, ProgramasRepository.findbyDataInicio);
    };

    /**
     * Busca programas pela data de fim.
     */

    async findbyDataFim(data) {
        return find(data, ProgramasRepository.findbyDataFim);
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