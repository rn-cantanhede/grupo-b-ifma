const AgriculturaFamiliar = require("../model/AgriculturaFamiliar");
const Find = require("../Utils/findUtils");

class AgriculturaFamiliarController {
    async AllAgriculturaFamiliar(req, res) {
        try {
            const result = await AgriculturaFamiliar.findAllAgriculturaFamiliar();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findAgriculturaFamiliar(req, res) {
        try {
            Find.findAndVerify(res, Find.NumberOrString(req.params.value), AgriculturaFamiliar.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new AgriculturaFamiliarController();