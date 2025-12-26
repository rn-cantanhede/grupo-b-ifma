const Erros = require("../../shared/errors/Errors");
const { find, findByInterval } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const MovimentacoesRepository = require("./movimentacoes.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Movimentação.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class MovimentacoesService {

    /**
     * Retorna todas as movimentações registradas.
     */
    
    async findAllMovimentacoes() {
        const result = await MovimentacoesRepository.findAllMovimentacoes();
        return result;
    };

    /**
     * Busca uma movimentação pelo ID.
     */

    async findById(id) {
        // Valida se o valor recebido é numérico antes de realizar a busca.
        if (!isNaN(id)) {
            return find(id, MovimentacoesRepository.findById);
        };
        throw new Erros("Apenas Id's", 403);
    };

    /**
     * Busca movimentações associadas a um DAP específico.
     */

    async findbyDap(dap) {
        return find(dap, MovimentacoesRepository.findbyDap);
    };

    /**
     * Busca movimentações associadas a um produto específico.
     */

    async findbyProduto(produto) {
        return find(produto, MovimentacoesRepository.findbyProduto);
    };

    /**
     * Busca movimentações ocorridas em uma data específica.
     */

    async findbyData(data) {
        return find(data, MovimentacoesRepository.findbyData);
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    async findByInicioFim(inicio, fim) {
        return findByInterval(inicio, fim, MovimentacoesRepository.findByInicioFim);
    };

    /**
     * Cria uma nova movimentação de produto.
     */

    async createMovimentacao(movimentacao) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            { field: "ID_LOCAL", validation: MovimentacoesRepository.findID_LOCAL, errorMsg: "ID_LOCAL invalido" },
            { field: "ID_AGRICULTURA_FAMILIAR", validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR, errorMsg: "ID_AGRICULTURA_FAMILIAR invalido" },
            { field: "ID_PRODUTO", validation: MovimentacoesRepository.findID_PRODUTO, errorMsg: "ID_PRODUTO invalido" },
            // { field: 'NOME', validationFn: (val) => val.length > 0, errorMessage: 'Nome do cliente é obrigatório' }, 
            // { field: 'EMAIL', validationFn: (val) => /\S+@\S+\.\S+/.test(val), errorMessage: 'Email inválido' },
        ];

        // Executa todas as validações definidas
        await validationsUtils.validate(movimentacao, validations);

        // Insere no banco de dados
        return await MovimentacoesRepository.createMovimentacao(movimentacao);
    };

    /**
     * Atualiza uma movimentação existente.
     */

    async updateMovimentacao(id, movimentacao) {

        // Verifica existe antes de atualizar
        const idMovimentacao = await MovimentacoesRepository.findById(id);

        if (!idMovimentacao) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            { field: "ID_LOCAL", validation: MovimentacoesRepository.findID_LOCAL, errorMsg: "ID_LOCAL invalido" },
            { field: "ID_AGRICULTURA_FAMILIAR", validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR, errorMsg: "ID_AGRICULTURA_FAMILIAR invalido" },
            { field: "ID_PRODUTO", validation: MovimentacoesRepository.findID_PRODUTO, errorMsg: "ID_PRODUTO invalido" },
            // { field: 'NOME', validationFn: (val) => val.length > 0, errorMessage: 'Nome do cliente é obrigatório' }, 
            // // { field: 'EMAIL', validationFn: (val) => /\S+@\S+\.\S+/.test(val), errorMessage: 'Email inválido' },
        ];

        // Executa as validações
        await validationsUtils.validate(movimentacao, validations);

        // Aplica a atualização no banco de dados
        return await MovimentacoesRepository.updateMovimentacao(id, movimentacao);
    };

    /**
     * Remove uma movimentação do sistema.
     */

    async deleteMovimentacao(id) {

        // Verifica se existe na tabela real antes de excluir
        const idMovimentacao = await MovimentacoesRepository.findByIdDelete(id);

        if (!idMovimentacao) {
            throw new Erros("ID não existente", 404);
        };

        // Remove definitivamente
        return await MovimentacoesRepository.deleteMovimentacao(id);
    };
};

module.exports = new MovimentacoesService();