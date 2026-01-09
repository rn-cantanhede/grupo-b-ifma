const Erros = require("../../shared/errors/Errors");
const { findByIdName, VerifyNivel } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const TiposProdutosRepository = require("./tipos-produtos.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade  produto.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class TiposProdutosService {

    /**
     * Retorna todos os tipos de produto cadastrados.
     */

    /**
     * O uso do VerifyNivel do jeito que está, não está otimizado
     * modificação nas VIEWs do database resoveriam o problema.
     */
    async findallTipoProduto(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await TiposProdutosRepository.findallTipoProduto();
            },

            secretario: async function () {
                return await TiposProdutosRepository.findallTipoProduto();
            },

            associacao: async function () {
                return await TiposProdutosRepository.findallTipoProduto();
            },

            usuario: async function () {
                return await TiposProdutosRepository.findallTipoProduto();
            }
        });
    };

    /**
     * Busca tipo de produto por ID ou Nome.
     */

    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value, 
                    TiposProdutosRepository.findById, 
                    TiposProdutosRepository.findByName
                );
            },

            secretario: async function () {
                return findByIdName(
                    value, 
                    TiposProdutosRepository.findById, 
                    TiposProdutosRepository.findByName
                );
            },

            associacao: async function () {
                return findByIdName(
                    value, 
                    TiposProdutosRepository.findById, 
                    TiposProdutosRepository.findByName
                );
            },

            usuario: async function () {
                return findByIdName(
                    value, 
                    TiposProdutosRepository.findById, 
                    TiposProdutosRepository.findByName
                );
            }
        });
    };

    /**
     * Insere um novo tipo de produto após validação dos dados.
     */

    async insertCategoria(data) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [];

        // Valida dependências antes da inserção
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await TiposProdutosRepository.insertCategoria(data);
    };

    /**
     * Atualiza um tipo de produto existente.
     * Valida a existência do registro antes da atualização.
     */

    async updateCategoria(id, data) {

        // Verifica se o programa existe antes de atualizar
        const idCategoria = await TiposProdutosRepository.findById(id);

        if (!idCategoria) {
            throw new Erros("ID invalido", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [];

        // Valida dependências antes da inserção
        await validationsUtils.validate(data, validations);

        // Aplica a atualização no banco de dados
        return await TiposProdutosRepository.updateCategoria(id, data);
    };

    /**
     * Remove um tipo de produto existente.
     * Valida a existência do registro antes da exclusão.
     */

    async deleteTipoProduto(id) {

        // Verifica se existe na tabela real antes de excluir
        const idProduto = await TiposProdutosRepository.findById(id);

        if (!idProduto) {
            throw new Erros("ID invalido", 404);
        };

        // Remove definitivamente
        return await TiposProdutosRepository.deleteTipoProduto(id);
    };
};

module.exports = new TiposProdutosService();