const Pessoas = require("../model/Pessoas");
const Find = require("../Utils/findUtils");

class PessoasController {
    async AllPessoas(req, res) {
        try {
            const pessoas = await Pessoas.findAllPessoas();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findPessoa(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.value), Pessoas.findByIdAndName);

    };

    async findGeneroPessoa(req, res) {
        Find.findAndVerify(res, Find.NumberOrString(req.params.genero), Pessoas.findbyGenero);
    };

    async findDataPessoa(req, res) {
        Find.findAndVerify(res, req.params.data, Pessoas.findbyData);
    };

    async findInicioFimPessoa(req, res) {
        Find.findAndVerifyInterval(res, req.params.inicio, req.params.fim, Pessoas.findByInicioFim);
    };

    async newPessoa(req, res) {
        const { NOME, CPF, GENERO, DATA_NASCIMENTO } = req.body;

        if (NOME == undefined || NOME == "") {
            return res.status(403).json({ Error: `Campo destinado ao nome está vazio` });
        };
        if (CPF == undefined || CPF == "") {
            return res.status(403).json({ Error: `Campo destinado ao CPF está vazio` });
        };
        if (GENERO == undefined || GENERO == "") {
            return res.status(403).json({ Error: `Campo destinado ao genero está vazio` });
        };
        if (DATA_NASCIMENTO == undefined || DATA_NASCIMENTO == "") {
            return res.status(403).json({ Error: `Campo destinado a data de nascimento está vazio` });
        };

        Find.findAndVerify(res, req.body, Pessoas.insetPessoa);
        return res.status(201).json({ Message: `Cadastro realizado` });
    };
};

module.exports = new PessoasController();