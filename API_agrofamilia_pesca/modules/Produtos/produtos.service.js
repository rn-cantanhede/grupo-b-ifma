const Erros = require("../../shared/errors/Errors");
const ProdutosRepository = require("./produtos.repository");

class ProdutosService {
    async getAll(){
        const produtos = await ProdutosRepository.findAllProdutos();
        return produtos;
    };

    async find(value){
        const isNumber = !isNaN(value); 
        if (isNumber) {
            const produtos = await ProdutosRepository.findById(value);
            if (!produtos){ 
                throw new Erros("Produto não encontrado", 404)
            };
            return produtos;
        };

        const produtos = await ProdutosRepository.findByName(value);
        return produtos;
    };
};

module.exports = new ProdutosService();