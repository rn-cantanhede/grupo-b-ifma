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
            const progamas = Find.NumberOrString(req.params.value);
            Find.findAndVerify(res, progamas, Programas.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new ProgramasController();