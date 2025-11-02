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
    async findByIdPessoa(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Pessoas.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByNamePessoa(req, res) {
        try {
            Find.findAndVerify(res, Find.convertString(req.params.name), Pessoas.findByName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new PessoasController();