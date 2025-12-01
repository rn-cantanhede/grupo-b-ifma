const PessoasService = require("./pessoas.service");

class PessoasController {
    async AllPessoas(req, res) {
        try {
            const pessoas = await PessoasService.findAllPessoas();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findPessoa(req, res, next) {
        try {
            const result = await PessoasService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };

    };

    async findGeneroPessoa(req, res, next) {
        try {
            const result = await PessoasService.findbyGenero(req.params.genero);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDataPessoa(req, res, next) {
        try {
            const result = await PessoasService.findbyData(req.params.data);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findInicioFimPessoa(req, res, next) {
        try {
            const result = await PessoasService.findByInicioFim(req.params.inicio, req.params.fim);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async createPessoa(req, res, next) {
        try {
            const result = await PessoasService.createPessoa(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new PessoasController();