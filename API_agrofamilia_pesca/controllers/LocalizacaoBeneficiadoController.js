const LocalizacaoBeneficiado = require("../model/LocalizacaoBeneficiado");

class LocalizacaoBeneficiadoController {
    async Localizacoes(req, res) {
        try {
            const localizacoes = await LocalizacaoBeneficiado.findLocalizacao();
            return res.status(200).json(localizacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new LocalizacaoBeneficiadoController();