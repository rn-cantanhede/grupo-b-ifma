const Pessoas = require("../model/Pessoas");

class PessoasController {
    async Pessoas(req, res) {
        try {
            const pessoas = await Pessoas.findAllPessoas();
            return res.json(pessoas);
        } catch (error) {
            console.log(error);
            return res.json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new PessoasController();