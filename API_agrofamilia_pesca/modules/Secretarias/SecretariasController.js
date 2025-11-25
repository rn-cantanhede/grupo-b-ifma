const Secretarias = require("./Secretarias");
const Find = require("../../Utils/findUtils");

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

    async findSecretarias(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), Secretarias.findByIdAndName);
    };

    async findEstadoSecretarias(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.estado), Secretarias.findbyEstado);
    };
    
    async findCidadeSecretarias(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.cidade), Secretarias.findbyCidade);
    };
};

module.exports = new SecretariasController();