const Associacoes = require("../model/Associacoes");
const Find = require("../Utils/findUtils");

class AssociacoesController {
    async AllAssociacoes(req, res) {
        try {
            const associacoes = await Associacoes.findAllAssociacoes();
            return res.status(200).json(associacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByIdAssociacoes(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Associacoes.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        }
    };
};

module.exports = new AssociacoesController();