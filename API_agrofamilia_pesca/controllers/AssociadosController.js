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
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), Associados.findByIdAndName);
    };

    async findCafAssociado(req, res) {
        Find.findAndVerify(res, req.params.caf, Associados.findbyCaf);
    };

    async findDapAssociado(req, res) {
        Find.findAndVerify(res, req.params.dap, Associados.findbyDap);
    };
    
    async findAssociacaoAssociado(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.associacao), Associados.findbyAssociacao);
    };

    async findDataAssociado(req, res) {
        Find.findAndVerify(res, req.params.data, Associados.findbyData);
    };
    
    async findInicioFimAssociado(req, res) {
        Find.findAndVerifyInterval(res, req.params.inicio, req.params.fim, Associados.findByInicioFim);
    };
};

module.exports = new AssociadosController();