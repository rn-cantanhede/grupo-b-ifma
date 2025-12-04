const AssociadosService = require("./associados.service");

class AssociadosController {
    async AllAssociados(req, res) {
        try {
            const view = await AssociadosService.findAllAssociados();
            return res.status(200).json(view);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findAssociado(req, res, next) {
        try {
            const result = await AssociadosService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findCafAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyCaf(req.params.caf);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error)
        };
    };

    async findDapAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyDap(req.params.dap);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findAssociacaoAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyAssociacao(req.params.associacao);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDataAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyData(req.params.data);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findInicioFimAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findByInicioFim(req.params.inicio, req.params.fim);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createAssociado(req, res, next) {
        try {
            const result = await AssociadosService.createAssociado(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AssociadosController();