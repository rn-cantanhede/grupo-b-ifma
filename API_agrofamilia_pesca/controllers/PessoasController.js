const Pessoas = require("../model/Pessoas");

class PessoasController {
    async Pessoas(req, res) {
        try {
            const pessoas = await Pessoas.findAllPessoas();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(error);
            return res.json({ Error: "Erro interno no servidor" });
        };
    };
    async findById(req, res) {
        try {
            const id = req.params.id;
            const result = await Pessoas.findById(id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new PessoasController();