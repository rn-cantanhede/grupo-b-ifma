const Erros = require("../../shared/errors/Errors");
const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
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
    async findAllAgriculturaFamiliar() {
        const result = await AgriculturaFamiliarRepository.findAllAgriculturaFamiliar();
        return result;
    };

    /**
     * Busca um registro por ID ou por nome.
     */
    async find(value) {
        return findByIdName(
            value,
            AgriculturaFamiliarRepository.findById,
            AgriculturaFamiliarRepository.findByName
        );
    };

    /**
     * Busca registros pelo número do CAF.
     */
    async findbyCaf(caf) {
        return find(caf, AgriculturaFamiliarRepository.findbyCaf);
    };

    /**
     * Busca registros pelo número da DAP.
     */
    async findbyDap(dap) {
        return find(dap, AgriculturaFamiliarRepository.findbyDap);
    };

    /**
     * Busca registros vinculados a um programa específico.
     */
    async findbyPrograma(programa) {
        return find(programa, AgriculturaFamiliarRepository.findbyPrograma);
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