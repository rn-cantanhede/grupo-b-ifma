const AssociadosService = require("./associados.service");

class AssociadosController {

    /**
     * Retorna todos os associados.
     */
    
    async AllAssociados(req, res) {
        try {
            const view = await AssociadosService.findAllAssociados();
            return res.status(200).json(view);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca associado por ID ou Nome.
     */

    async findAssociado(req, res, next) {
        try {
            const result = await AssociadosService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associado pelo CAF.
     */

    async findCafAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyCaf(req.params.caf);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error)
        };
    };

    /**
     * Busca associado pelo DAP.
     */

    async findDapAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyDap(req.params.dap);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista associados filtrando pela associação.
     */

    async findAssociacaoAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyAssociacao(req.params.associacao);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associados pela data de validade do CAF.
     */

    async findDataAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findbyData(req.params.data);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca associados por intervalo de validade do CAF.
     */

    async findInicioFimAssociado(req, res, next) {
        try {
            const result = await AssociadosService.findByInicioFim(req.params.inicio, req.params.fim);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo associado.
     */

    async createAssociado(req, res, next) {
        try {
            const result = await AssociadosService.createAssociado(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Modifica um associado.
     */

    async updateAssociado(req, res, next) {
        try {
            const result = await AssociadosService.updateAssociado(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Deleta um associado.
     */

    async deleteAssociado(req, res, next) {
        try {
            const result = await AssociadosService.deleteAssociado(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AssociadosController();