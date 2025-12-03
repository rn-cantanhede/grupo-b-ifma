const Erros = require("../../shared/errors/Errors");
const ProdutosRepository = require("./produtos.repository");

class ProdutosService {
    async findAllProdutos() {
        const produtos = await ProdutosRepository.findAllProdutos();
        return produtos;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const produtos = await ProdutosRepository.findById(value);
            if (!produtos) {
                throw new Erros("Produto não encontrado", 404)
            };
            return produtos;
        };

        const produtos = await ProdutosRepository.findByName(value);
        return produtos;
    };

    async createProduto(produto) {
        if (produto.NOME == undefined || produto.NOME == "") {
            throw new Erros("Campo NOME vazio", 403);
        };

        if (produto.ID_TIPO_PRODUTO == undefined || produto.ID_TIPO_PRODUTO == "") {
            throw new Erros("Campo TIPO_DO_PRODUTO vazio", 403);
        };

        if (isNaN(produto.ID_TIPO_PRODUTO)) {
            throw new Erros("Campo ID_TIPO_PRODUTO precisa de um ID", 403);
        };

        const id_tipo = await ProdutosRepository.findID_TIPO_PRODUTO(produto.ID_TIPO_PRODUTO);

        if (!id_tipo) {
            throw new Erros("ID invalido", 403);
        };


        const result = await ProdutosRepository.createProduto(produto);
        return result;
    };
};

module.exports = new ProdutosService();