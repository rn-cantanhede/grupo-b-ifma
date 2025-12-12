const Erros = require("../../shared/errors/Errors");
const { find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const ProdutosRepository = require("./produtos.repository");

class ProdutosService {
    async findAllProdutos() {
        const produtos = await ProdutosRepository.findAllProdutos();
        return produtos;
    };

    async find(value) {
        return find(value, ProdutosRepository.findById, ProdutosRepository.findByName);
    };

    async createProduto(produto) {
        const validations = [
            { field: "ID_TIPO_PRODUTO", validation: ProdutosRepository.findID_TIPO_PRODUTO, errorMsg: "ID_TIPO_PRODUTOO invalido" },
        ];

        await validationsUtils(produto, validations);

        return await ProdutosRepository.createProduto(produto);
    };

    async updateProduto(id, produto) {
        const idProduto = await ProdutosRepository.findById(id);

        if (!idProduto) {
            throw new Erros("ID invalido", 404);
        };

        const validations = [
            { field: "ID_TIPO_PRODUTO", validation: ProdutosRepository.findID_TIPO_PRODUTO, errorMsg: "ID_TIPO_PRODUTOO invalido" },
        ];

        await validationsUtils.validate(produto, validations);

        return await ProdutosRepository.updateProduto(id, produto);
    };
};

module.exports = new ProdutosService();