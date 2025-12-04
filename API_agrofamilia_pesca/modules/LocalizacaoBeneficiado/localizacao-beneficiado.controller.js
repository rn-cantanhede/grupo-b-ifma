const LocalizacaoBeneficiadoService = require("./localizacao-beneficiado.service");

class LocalizacaoBeneficiadoController {
    async AllLocalizacoes(req, res) {
        try {
            const localizacoes = await LocalizacaoBeneficiadoService.findAllLocalizacao();
            return res.status(200).json(localizacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findAssociacao(req, res, next) {

        try {
            const result = await LocalizacaoBeneficiadoService.findbyAssociacao(req.params.associacao);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createlocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.createlocalizacao(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new LocalizacaoBeneficiadoController();