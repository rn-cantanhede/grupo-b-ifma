const AgriculturaFamiliarService = require("./agricultura-familiar.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Agricultura familiar e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class AgriculturaFamiliarController {

    /**
     * Retorna todos os registros de agricultura familiar.
     */
    async AllAgriculturaFamiliar(req, res) {
        try {
            const result = await AgriculturaFamiliarService.findAllAgriculturaFamiliar();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca registros de agricultura familiar por ID ou nome.
     */
    async findAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca registros de agricultura familiar pelo número do CAF.
     */
    async findCafAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyCaf(req.params.caf);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca registros de agricultura familiar pelo número da DAP.
     */
    async findDapAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyDap(req.params.dap);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca registros de agricultura familiar vinculados a um programa.
     */
    async findProgramaAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyPrograma(req.params.programa);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo registro de agricultura familiar.
     */
    async createAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.createAgriculturaFamiliar(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza um registro existente de agricultura familiar.
     */
    async updateAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.updateAgriculturaFamiliar(
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
     * Remove um registro de agricultura familiar.
     */
    async deleteAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.deleteAgriculturaFamiliar(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AgriculturaFamiliarController();