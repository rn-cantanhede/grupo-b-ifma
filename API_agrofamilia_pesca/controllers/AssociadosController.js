const Associados = require("../model/Associados");

class AssociadosController {
    async AllAssociados(req, res) {
        try {
            const view = await Associados.findAssociados();
            return res.status(200).json(view);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new AssociadosController();