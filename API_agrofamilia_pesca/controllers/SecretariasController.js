const Secretarias = require("../model/Secretarias");

class SecretariasController {
    async Secretarias(req, res) {
        try {
            const secretarias = await Secretarias.findAllSecretarias();
            return res.status(200).json(secretarias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new SecretariasController();