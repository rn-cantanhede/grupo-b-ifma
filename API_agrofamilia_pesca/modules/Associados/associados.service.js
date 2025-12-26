const Erros = require("../../shared/errors/Errors");
const { find, findByInterval, findByIdName } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const AssociadosRepository = require("./associados.repository");

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

    async findAllAssociados() {
        const result = await AssociadosRepository.findAllAssociados();
        return result;
    };

    /**
     * Busca associado por ID ou Nome, conforme o tipo de entrada.
     */

    async find(value) {
        return findByIdName(value, 
            AssociadosRepository.findById, 
            AssociadosRepository.findByName
        );
    };

    /**
     * Busca associado pelo CAF.
     */

    async findbyCaf(caf) {
        return find(caf, AssociadosRepository.findbyCaf);
    };

    /**
     * Busca associado pelo DAP.
     */

    async findbyDap(dap) {
        return find(dap, AssociadosRepository.findbyDap);
    };

    /**
     * Lista associados filtrando pela associação.
     */

    async findbyAssociacao(associacao) {
        return find(associacao, AssociadosRepository.findbyAssociacao);
    };

    /**
     * Busca associados pela data exata de validade do CAF.
     */

    async findbyData(data) {
        return find(data, AssociadosRepository.findbyData);
    };

    /**
     * Busca associados por intervalo de validade do CAF.
     */

    async findByInicioFim(inicio, fim) {
        return findByInterval(inicio, fim, AssociadosRepository.findByInicioFim);
    };

    /**
     * Cria um associado após validar referências obrigatórias.
     */

    async createAssociado(associado) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            { field: "ID_PESSOA", validation: AssociadosRepository.findID_PESSOA, errorMsg: "ID_PESSOA invalido" },
            { field: "ID_ASSOCIACAO", validation: AssociadosRepository.findID_ASSOCIACAO, errorMsg: "ID_ASSOCIACAO invalido" },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(associado, validations);

        // Insere no banco de dados
        return await AssociadosRepository.createAssociado(associado);
    };

    /**
     * Modifica um associado após validar referências obrigatórias.
     */

    async updateAssociado(id, associado) {

        // Verifica se existe antes de atualizar
        const idAssociado = await AssociadosRepository.findById(id);

        if (!idAssociado) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            { field: "ID_PESSOA", validation: AssociadosRepository.findID_PESSOA, errorMsg: "ID_PESSOA invalido" },
            { field: "ID_ASSOCIACAO", validation: AssociadosRepository.findID_ASSOCIACAO, errorMsg: "ID_ASSOCIACAO invalido" },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(associado, validations);

        // Aplica a atualização no banco de dados
        return await AssociadosRepository.updateAssociado(id, associado);
    };

    /**
     * Deleta um associado após validar o id.
     */

    async deleteAssociado(id) {

        // Verifica se existe na tabela real antes de excluir
        const idAssociado = await AssociadosRepository.findByIdDelete(id);

        if (!idAssociado) {
            throw new Erros("ID invalido", 404);
        };

        // Remove definitivamente
        return await AssociadosRepository.deleteAssociado(id);
    };
};

module.exports = new AssociadosService();