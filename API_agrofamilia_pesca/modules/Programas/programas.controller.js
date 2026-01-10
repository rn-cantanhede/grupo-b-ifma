const ProgramasService = require("./programas.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas aos Programas e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */

class ProgramasController {

    /**
     * Retorna todos os programas cadastrados.
     */

    async AllProgramas(req, res) {
        try {
            const programas = await ProgramasService.findAllProgramas(req.user);
            return res.status(200).json(programas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca programas por ID ou nome,
     * de acordo com o valor passado na URL.
     */

    async findProgramas(req, res, next) {
        try {
            const result = await ProgramasService.find(
                req.params.value,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas vinculados a uma secretaria específica.
     */

    async findSecretariaPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbySecretaria(
                req.params.secretaria,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas filtrando pelo estado.
     */

    async findEstadoPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyEstado(
                req.params.estado,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas pela origem do recurso financeiro.
     */

    async findOrigemRecursoPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyOrigemRecurso(
                req.params.recurso,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas pela data de início.
     */

    async findDataInicioPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyDataInicio(
                req.params.data,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas pela data de fim.
     */

    async findDataFimPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyDataFim(
                req.params.data,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo programa.
     */

    async createPrograma(req, res, next) {
        try {
            const result = await ProgramasService.createPrograma(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza um programa existente pelo ID.
     */

    async updatePrograma(req, res, next) {
        try {
            const result = await ProgramasService.updatePrograma(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove um programa pelo ID.
     */

    async deletePrograma(req, res, next) {
        try {
            const result = await ProgramasService.deletePrograma(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new ProgramasController();
