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

    async findByIdProgramas(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Programas.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findByNameProgramas(req, res) {
        try {
            Find.findAndVerify(res, Find.convertString(req.params.name), Programas.findByName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new ProgramasController();