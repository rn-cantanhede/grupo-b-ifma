const Associados = require("../model/Associados");
const Find = require("../Utils/findUtils");

class AssociadosController {
    async AllAssociados(req, res) {
        try {
            const view = await Associados.findAllAssociados();
            return res.status(200).json(view);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findAssociado(req, res) {
        try {
            const associado = Find.NumberOrString(req.params.value);
            Find.findAndVerify(res, associado, Associados.findByIdAndName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new AssociadosController();