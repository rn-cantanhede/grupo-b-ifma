const SecretariasService = require("./secretarias.service");

class SecretariasController {
    async AllSecretarias(req, res) {
        try {
            const secretarias = await SecretariasService.findAllProgramas();
            return res.status(200).json(secretarias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.find(req.params.value);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findEstadoSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.findbyEstado(req.params.estado);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findCidadeSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.findbyEstado(req.params.cidade);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.createSecretaria(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async updateSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.updateSecretaria(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new SecretariasController();