const SecretariasService = require("./secretarias.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Secretarias e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class SecretariasController {

    /**
     * Retorna todas as secretarias cadastradas.
     */

    async AllSecretarias(req, res) {
        try {
            const secretarias = await SecretariasService.findAllProgramas();
            return res.status(200).json(secretarias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca secretaria por ID ou Nome.
     */

    async findSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.find(req.params.value);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista secretarias filtrando pelo estado.
     */

    async findEstadoSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.findbyEstado(req.params.estado);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Lista secretarias filtrando pela cidade.
     */

    async findCidadeSecretarias(req, res, next) {
        try {
            const result = await SecretariasService.findbyEstado(req.params.cidade);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria uma nova secretaria.
     */

    async createSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.createSecretaria(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza uma secretaria existente.
     */

    async updateSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.updateSecretaria(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove uma secretaria existente.
     */
    
    async deleteSecretaria(req, res, next) {
        try {
            const result = await SecretariasService.deleteSecretaria(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new SecretariasController();