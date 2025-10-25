const Pessoas = require("../model/Pessoas");

class PessoasController {
    async pessoas(req, res){
        const pessoas = await Pessoas.findAllPessoas();
        return res.json(pessoas);
    };

    async associacoes(req, res){
        const associacoes = await Pessoas.findeAllAssociacao();
        return res.json(associacoes);
    };
};

module.exports = new PessoasController();