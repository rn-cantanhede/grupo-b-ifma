const Associacoes = require("../model/Associacoes");

class AssociacoesController {
    async associacoes(req, res){
        const associacoes = await Associacoes.findeAllAssociacao();
        return res.json(associacoes);
    };
};

module.exports = new AssociacoesController();