const Programas = require("../model/Programas");
const Find = require("../Utils/findUtils");

class ProgramasController {
    async AllProgramas(req, res) {
        try {
            const programas = await Programas.findAllProgramas();
            return res.status(200).json(programas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findProgramas(req, res) {
        try {
            Find.findAndVerify(res, Find.NumberOrString(req.params.value), Programas.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findSecretariaPrograma(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.secretaria), Programas.findbySecretaria);
    };

    async findEstadoPrograma(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.estado), Programas.findbyEstado);
    };

    async findOrigemRecursoPrograma(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.recurso), Programas.findbyOrigemRecurso);
    };

    async findDataInicioPrograma(req, res) {
        Find.findAndVerify(res, req.params.data, Programas.findbyDataInicio);
    };
    
    async findDataFimPrograma(req, res) {
        Find.findAndVerify(res, req.params.data, Programas.findbyDataFim);
    };
};

module.exports = new ProgramasController();