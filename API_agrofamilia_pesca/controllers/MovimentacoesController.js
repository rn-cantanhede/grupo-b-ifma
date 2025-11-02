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
};

module.exports = new MovimentacoesController();