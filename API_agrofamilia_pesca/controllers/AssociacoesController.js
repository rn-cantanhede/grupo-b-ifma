const Associacoes = require("../model/Associacoes");

class AssociacoesController {
    async Associacoes(req, res) {
        try {
            const associacoes = await Associacoes.findeAllAssociacao();
            return res.status(200).json(associacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new AssociacoesController();