const Erros = require("../../shared/errors/Errors");
const { find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const ProdutosRepository = require("./produtos.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Produto.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class ProdutosService {
    /**
     * Retorna a lista completa de produtos.
     */

    async findAllProdutos() {
        const produtos = await ProdutosRepository.findAllProdutos();
        return produtos;
    };

    /**
     * Busca um produto pelo ID ou pelo nome.
     */

    async find(value) {
        return find(value, ProdutosRepository.findById, ProdutosRepository.findByName);
    };

    /**
     * Cria um novo produto após validação das dependências.
     */

    async createProduto(produto) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_TIPO_PRODUTO",
                validation: ProdutosRepository.findID_TIPO_PRODUTO,
                errorMsg: "ID_TIPO_PRODUTO inválido"
            },
        ];

        // Executa todas as validações definidas
        await validationsUtils.validate(produto, validations);

        // Insere no banco de dados
        return await ProdutosRepository.createProduto(produto);
    };

    /**
     * Atualiza um produto existente.
     */

    async updateProduto(id, produto) {

        // Verifica se o programa existe antes de atualizar
        const idProduto = await ProdutosRepository.findById(id);

        if (!idProduto) {
            throw new Erros("ID inválido", 404);
        };

        // Verifica se existe antes de atualizar
        const validations = [
            {
                field: "ID_TIPO_PRODUTO",
                validation: ProdutosRepository.findID_TIPO_PRODUTO,
                errorMsg: "ID_TIPO_PRODUTO inválido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(produto, validations);

        // Aplica a atualização no banco de dados
        return await ProdutosRepository.updateProduto(id, produto);
    };

    /**
     * Remove um produto pelo ID.
     */

    async deleteProduto(id) {

        // Verifica se existe na tabela real antes de excluir
        const idProduto = await ProdutosRepository.findById(id);

        if (!idProduto) {
            throw new Erros("ID não existe", 404);
        };

        // Remove definitivamente
        return await ProdutosRepository.deleteProduto(id);
    };
};

module.exports = new ProdutosService();