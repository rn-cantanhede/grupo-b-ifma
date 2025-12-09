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
};

module.exports = new TiposProdutosService();