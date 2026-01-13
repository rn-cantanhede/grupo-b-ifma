const Erros = require("../../shared/errors/Errors");
const { findByIdName, VerifyNivel } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const CategoriasRepository = require("./categorias.repository");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Categoria.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */

class CategoriasService {

    /**
     * Retorna todas as categorias cadastradas.
     */

    async findAllCategorias(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await CategoriasRepository.findAllCategorias();
            },

            secretario: async function () {
                return await CategoriasRepository.findAllCategorias();
            },

            associacao: async function () {
                return await CategoriasRepository.findAllCategorias();
            },

            usuario: async function () {
                return await CategoriasRepository.findAllCategorias();
            }, 
        });
    };

    /**
     * Busca uma categoria por ID ou Nome.
     */

    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    CategoriasRepository.findById,
                    CategoriasRepository.findByName
                );
            },

            secretario: async function () {
                return findByIdName(
                    value,
                    CategoriasRepository.findById,
                    CategoriasRepository.findByName
                );
            },
        
            associacao: async function () {
                return findByIdName(
                    value,
                    CategoriasRepository.findById,
                    CategoriasRepository.findByName
                );
            },

            usuario: async function () {
                return findByIdName(
                    value,
                    CategoriasRepository.findById,
                    CategoriasRepository.findByName
                );
            },
        });
    };

    /**
     * Cria uma nova categoria após validação dos dados.
     */

    async createCategoria(data) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [];

        // Executa todas as validações definidas
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await CategoriasRepository.createCategoria(data);
    };

    /**
     * Atualiza uma categoria existente.
     */

    async updateCategoria(id, categoria) {

        // Verifica se existe antes de atualizar
        const idCategoria = await CategoriasRepository.findById(id);

        if (!idCategoria) {
            throw new Erros("ID não existente", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [];

        // Valida dependências antes da inserção
        await validationsUtils.validate(categoria, validations);

        // Aplica a atualização no banco de dados
        return await CategoriasRepository.updateCategoria(id, categoria);
    };

    /**
     * Remove uma categoria existente.
     */

    async deleteCategoria(id) {

        // Verifica se existe na tabela real antes de excluir
        const idCategoria = await CategoriasRepository.findById(id);

        if (!idCategoria) {
            throw new Erros("ID não existente", 404);
        };

        // Remove definitivamente
        return await CategoriasRepository.deleteCategoria(id);
    };
};

module.exports = new CategoriasService();