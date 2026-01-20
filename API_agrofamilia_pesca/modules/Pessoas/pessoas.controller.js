const PessoasService = require("./pessoas.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas as Pessoas e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class PessoasController {
    /**
     * Retorna a lista completa de pessoas.
     */

    async AllPessoas(req, res) {
        try {
            const pessoas = await PessoasService.findAllPessoas(req.user);
            return res.status(200).json(pessoas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca uma pessoa pelo ID ou pelo nome.
     */

    async findPessoa(req, res, next) {
        try {
            const result = await PessoasService.find(
                req.params.value,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Lista pessoas filtrando pelo gênero.
     */

    async findGeneroPessoa(req, res, next) {
        try {
            const result = await PessoasService.findbyGenero(
                req.params.genero,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Lista pessoas filtrando pela data de nascimento.
     */

    async findDataPessoa(req, res, next) {
        try {
            const result = await PessoasService.findbyData(
                req.params.data,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Lista pessoas dentro de um intervalo de datas de nascimento.
     */

    async findInicioFimPessoa(req, res, next) {
        try {
            const result = await PessoasService.findByInicioFim(
                req.params.inicio, 
                req.params.fim,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Cria um novo registro de pessoa.
     */

    async createPessoa(req, res, next) {
        try {
            const result = await PessoasService.createPessoa(
                req.body,
                req.user
            );
            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Atualiza os dados de uma pessoa existente.
     */

    async updatePessoa(req, res, next) {
        try {
            const result = await PessoasService.updatePessoa(
                req.params.id, 
                req.body,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };

    /**
     * Remove uma pessoa pelo ID.
     */

    async deletePessoa(req, res, next) {
        try {
            const result = await PessoasService.deletePessoa(
                req.params.id,
                req.user
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return next(error);
        };
    };
};

module.exports = new PessoasController();