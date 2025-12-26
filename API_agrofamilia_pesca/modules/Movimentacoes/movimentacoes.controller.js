const MovimentacoesService = require("./movimentacoes.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Movimentações e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class MovimentacoesController {

    /**
     * Retorna todas as movimentações cadastradas.
     */
    
    async AllMovimentacoes(req, res) {
        try {
            const movimentacoes = await MovimentacoesService.findAllMovimentacoes();
            return res.status(200).json(movimentacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma movimentação pelo ID.
     */

    async findByIdMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca movimentações associadas a um DAP específico.
     */

    async findDapMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findbyDap(req.params.dap);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca movimentações relacionadas a um produto específico.
     */

    async findProdutoMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findbyProduto(req.params.produto);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca movimentações realizadas em uma data específica.
     */

    async findDataMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findbyData(req.params.data);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    async findInicioFimMovimentacoes(req, res, next) {
        try {
            const result = await MovimentacoesService.findByInicioFim(
                req.params.inicio,
                req.params.fim
            );
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova movimentação.
     */

    async createMovimentacao(req, res, next) {
        try {
            const result = await MovimentacoesService.createMovimentacao(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma movimentação existente.
     */

    async updateMovimentacao(req, res, next) {
        try {
            const result = await MovimentacoesService.updateMovimentacao(
                req.params.id,
                req.body
            );
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma movimentação do sistema.
     */

    async deleteMovimentacao(req, res, next) {
        try {
            const result = await MovimentacoesService.deleteMovimentacao(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new MovimentacoesController();