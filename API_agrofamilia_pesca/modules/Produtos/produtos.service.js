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
};

module.exports = new ProdutosService();