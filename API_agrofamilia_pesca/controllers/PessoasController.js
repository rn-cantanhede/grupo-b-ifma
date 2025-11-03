const Pessoas = require("../model/Pessoas");
const Find = require("../Utils/findUtils");

class PessoasController {
    async AllPessoas(req, res) {
        try {
            const pessoas = await Pessoas.findAllPessoas();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findPessoa(req, res) {
        try {
            Find.findAndVerify(res, Find.NumberOrString(req.params.value), Pessoas.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new PessoasController();