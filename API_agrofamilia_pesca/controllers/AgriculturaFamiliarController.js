const AgriculturaFamiliar = require("../model/AgriculturaFamiliar");

class AgriculturaFamiliarController {
    async AllAgriculturaFamiliar(req, res){
        try {
            const result = await AgriculturaFamiliar.findAllAgriculturaFamiliar();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new AgriculturaFamiliarController()