const Erros = require("../../shared/errors/Errors");
const TiposProdutosRepository = require("./tipos-produtos.repository");

class TiposProdutosService {
    async findallTipoProduto() {
        const result = await TiposProdutosRepository.findallTipoProduto();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const produtos = await TiposProdutosRepository.findById(value);
            if (!produtos) {
                throw new Erros("Produto não encontrado", 404);
            };
            return produtos;
        };

        const produtos = await TiposProdutosRepository.findByName(value);
        return produtos;
    };

    async insertCategoria(data){
        if (data.NOME == undefined || data.NOME == "") {
            throw new Erros("Campo NOME está vazio", 403);
        };

        const result = TiposProdutosRepository.insertCategoria(data);
        return result;
    };
};

module.exports = new TiposProdutosService();