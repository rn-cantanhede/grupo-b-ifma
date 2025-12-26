const AssociacoesService = require("./associacoes.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Associações e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class AssociacoesController {

    /**
     * Retorna todas as associações cadastradas.
     */
    async AllAssociacoes(req, res) {
        try {
            const associacoes = await AssociacoesService.findAllAssociacoes();
            return res.status(200).json(associacoes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma associação específica.
     */
    async findAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associações filtradas por categoria.
     */
    async findCategoriaAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.findByCategoria(req.params.categoria);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associações filtradas por secretaria.
     */
    async findSecretariaAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.findbySecretaria(req.params.secretaria);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova associação.
     */
    async createAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.createAssociacao(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma associação existente.
     */
    async updateAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.updateAssociacao(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma associação do sistema.
     */
    async deleteAssociacao(req, res, next) {
        try {
            const result = await AssociacoesService.deleteAssociacao(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AssociacoesController();