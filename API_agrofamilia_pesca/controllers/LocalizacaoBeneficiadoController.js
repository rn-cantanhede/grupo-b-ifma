const LocalizacaoBeneficiado = require("../model/LocalizacaoBeneficiado");
const Find = require("../Utils/findUtils");

class LocalizacaoBeneficiadoController {
    async AllLocalizacoes(req, res) {
        try {
            const localizacoes = await LocalizacaoBeneficiado.findAllLocalizacao();
            return res.status(200).json(localizacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findLocalizacao(req, res) {
        try {
            Find.findAndVerify(res, Find.NumberOrString(req.params.value), LocalizacaoBeneficiado.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new LocalizacaoBeneficiadoController();