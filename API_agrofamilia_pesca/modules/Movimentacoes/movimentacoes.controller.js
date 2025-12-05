const MovimentacoesService = require("./movimentacoes.service");

class MovimentacoesController {
    async AllMovimentacoes(req, res) {
        try {
            const movimentacoes = await MovimentacoesService.findAllMovimentacoes();
            return res.status(200).json(movimentacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByIdMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDapMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findbyDap(req.params.dap);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findProdutoMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findbyProduto(req.params.produto);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDataMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findbyData(req.params.data);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findInicioFimMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findByInicioFim(res, req.params.inicio, req.params.fim);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createMovimentacao(req, res, next) {
        try {
            const result = await MovimentacoesService.createMovimentacao(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new MovimentacoesController();