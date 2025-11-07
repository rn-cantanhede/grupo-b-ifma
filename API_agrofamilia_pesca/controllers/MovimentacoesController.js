const Movimentacoes = require("../model/Movimentacoes");
const Find = require("../Utils/findUtils");

class MovimentacoesController {
    async AllMovimentacoes(req, res) {
        try {
            const movimentacoes = await Movimentacoes.findAllMovimentacoes();
            return res.status(200).json(movimentacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByIdMovimentacoes(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Movimentacoes.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findDapMovimentacoes(req, res) {
        Find.findAndVerify(res, req.params.dap, Movimentacoes.findbyDap);
    };

    async findProdutoMovimentacoes(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.produto), Movimentacoes.findbyProduto);
    };

    async findDataMovimentacoes(req, res) {
        Find.findAndVerify(res, req.params.data, Movimentacoes.findbyData);
    };

    async findInicioFimMovimentacoes(req, res) {
        Find.findAndVerifyInterval(res, req.params.inicio, req.params.fim, Movimentacoes.findByInicioFim);
    };
};

module.exports = new MovimentacoesController();