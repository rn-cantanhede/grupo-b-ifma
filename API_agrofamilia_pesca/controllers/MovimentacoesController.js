const Movimentacoes = require("../model/Movimentacoes");
const { erros } = require("../Utils/dbUtils");

class MovimentacoesController {
    async AllMovimentacoes(req, res){
        try {
            const movimentacoes = await Movimentacoes.findAllMovimentacoes();
            return res.status(200).json(movimentacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        }
    };
};

module.exports = new MovimentacoesController();