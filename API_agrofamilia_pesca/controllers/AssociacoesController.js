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

    async findAssociacao(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), Associacoes.findByIdAndName);
    };

    async findCategoriaAssociacao(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.categoria), Associacoes.findbyCategoria);
    };

    async findCSecretariaAssociacao(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.secretaria), Associacoes.findbySecretaria);
    };
};

module.exports = new AssociacoesController();