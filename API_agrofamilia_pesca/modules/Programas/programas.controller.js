const ProgramasService = require("./programas.service");

class ProgramasController {
    async AllProgramas(req, res) {
        try {
            const programas = await ProgramasService.getAll();
            return res.status(200).json(programas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findProgramas(req, res, next) {
        try {
            const result = await ProgramasService.find(req.params.value);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findSecretariaPrograma(req, res) {
        try {
            const result = await ProgramasService.findbySecretaria(req.params.secretaria);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findEstadoPrograma(req, res) {
        try {
            const result = await ProgramasService.findbyEstado(req.params.estado);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findOrigemRecursoPrograma(req, res) {
        try {
            const result = await ProgramasService.findbyOrigemRecurso(req.params.recurso);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDataInicioPrograma(req, res) {
        try {
            const result = await ProgramasService.findbyDataInicio(req.params.data);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDataFimPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyDataFim(req.params.data);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createPrograma(req, res, next) {
        try {
            const result = await ProgramasService.createPrograma(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async updatePrograma(req, res, next) {
        try {
            const result = await ProgramasService.updatePrograma(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new ProgramasController();