const LocalizacaoBeneficiadoService = require("./localizacao-beneficiado.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas às localizações beneficiadas.
 *
 * Atua como ponte entre as rotas e a camada de service,
 * lidando apenas com request, response e status HTTP.
 */

class LocalizacaoBeneficiadoController {

    /**
     * Retorna todas as localizações beneficiadas.
     */

    async AllLocalizacoes(req, res) {
        try {
            const localizacoes = await LocalizacaoBeneficiadoService.findAllLocalizacao();
            return res.status(200).json(localizacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma localização beneficiada por ID ou Nome.
     */

    async findLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista localizações beneficiadas filtrando
     * pelo nome da associação.
     */

    async findAssociacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.findbyAssociacao(req.params.associacao);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova localização beneficiada.
     */

    async createlocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.createlocalizacao(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma localização beneficiada existente.
     */

    async updateLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.updateLocalizacao(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma localização beneficiada.
     */

    async deleteLocalizacao(req, res, next) {
        try {
            const result = await LocalizacaoBeneficiadoService.deleteLocalizacao(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new LocalizacaoBeneficiadoController();