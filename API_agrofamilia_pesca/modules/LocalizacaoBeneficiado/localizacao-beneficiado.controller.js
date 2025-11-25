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
        const result = await LocalizacaoBeneficiadoService.findAssociacao(req.params.associacao);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
};

module.exports = new LocalizacaoBeneficiadoController();