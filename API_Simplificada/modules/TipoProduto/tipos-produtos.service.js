const Erros = require("../../shared/errors/Errors");
const { findByIdName } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const TiposProdutosRepository = require("./tipos-produtos.repository");

class TiposProdutosService {
    async findallTipoProduto() {
        const result = await TiposProdutosRepository.findallTipoProduto();
        return result;
    };

    async find(value) {
        return findByIdName(value, TiposProdutosRepository.findById, TiposProdutosRepository.findByName);
    };

    async insertCategoria(data) {
        const validations = [];

        await validationsUtils.validate(data, validations);

        return await TiposProdutosRepository.insertCategoria(data);
    };

    async updateCategoria(id, data) {
        const idCategoria = await TiposProdutosRepository.findById(id);

        if (!idCategoria) {
            throw new Erros("ID invalido", 404); 
        };

        const validations = [];

        await validationsUtils.validate(data, validations);

        return await TiposProdutosRepository.updateCategoria(id, data);
    };

    async deleteTipoProduto(id) {
        const idProduto = await TiposProdutosRepository.findById(id);

        if (!idProduto) {
            throw new Erros("ID invalido", 404);
        };

        return await TiposProdutosRepository.deleteTipoProduto(id);
    };
};

module.exports = new TiposProdutosService();