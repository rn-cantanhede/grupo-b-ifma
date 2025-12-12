const AssociacoesService = require("./associacoes.service");

class AssociacoesController {
    async AllAssociacoes(req, res) {
        try {
            const associacoes = await AssociacoesService.findAllAssociacoes();
            return res.status(200).json(associacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findCategoriaAssociacao(req, res) {
        try {
            const result = await AssociacoesService.findByCategoria(req.params.categoria);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findSecretariaAssociacao(req, res) {
        try {
            const result = await AssociacoesService.findbySecretaria(req.params.secretaria);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.createAssociacao(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async updateAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.updateAssociacao(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AssociacoesController();