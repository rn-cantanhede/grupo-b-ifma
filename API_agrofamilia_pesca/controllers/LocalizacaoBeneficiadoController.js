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

    async findByIdLocalizacoes(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, LocalizacaoBeneficiado.findByid);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new LocalizacaoBeneficiadoController();