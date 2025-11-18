const Secretarias = require("../model/Secretarias");
const Find = require("../Utils/findUtils");
const verifyUtils = require("../Utils/verifyUtils");

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

    async newSecretaria(req, res) {
        const { NOME, CIDADE, ESTADO, ENDERECO } = req.body;

        if (NOME == undefined || NOME == "") {
            return res.status(403).json({ Error: `Campo destinado ao nome está vazio` });
        };
        if (CIDADE == undefined || CIDADE == "") {
            return res.status(403).json({ Error: `Campo destinado a cidade está vazio` });
        };
        if (ESTADO == undefined || ESTADO == "") {
            return res.status(403).json({ Error: `Campo destinado ao estado está vazio` });
        };
        if (ENDERECO == undefined || ENDERECO == "") {
            return res.status(403).json({ Error: `Campo destinado ao endereço está vazio` });
        };

        Find.findAndVerify(res, req.body, Secretarias.newSecretaria);
        return res.status(201).json({ Message: `Cadastro realizado` });
    };
};

module.exports = new SecretariasController();