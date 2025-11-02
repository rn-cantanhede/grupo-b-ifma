const Secretarias = require("../model/Secretarias");
const Find = require("../Utils/findUtils");

class SecretariasController {
    async AllSecretarias(req, res) {
        try {
            const secretarias = await Secretarias.findAllSecretarias();
            return res.status(200).json(secretarias);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async finByIdecretarias(req, res) {
        try {
            Find.findAndVerify(res, req.params.id, Secretarias.findById);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new SecretariasController();