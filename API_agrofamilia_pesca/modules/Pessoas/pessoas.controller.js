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
            const pessoas = await PessoasService.findAllPessoas(
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PESSOA_LIST",
                resource: "pessoa",
                action: "list",
                usuarioID: req.user.id
            }, "Listagem de pessoas");

            return res.status(200).json(pessoas);
        } catch (error) {
            req.log.error({
                event: "PESSOA_LIST_ERROR",
                resource: "pessoa",
                action: "list",
                usuarioID: req.user.id
            }, "Erro ao listar os pessoas");

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
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PESSOA_FIND",
                resource: "pessoa",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.value
            }, "Pessoa consultado por id ou nome");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_FIND_ERROR",
                resource: "pessoa",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.value
            }, "Erro ao buscar pessoa");

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
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PESSOA_FIND",
                resource: "pessoa",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.genero
            }, "Pessoa consultado por genero");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_FIND_ERROR",
                resource: "pessoa",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.genero
            }, "Erro ao buscar pessoa por genero");

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
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PESSOA_FIND",
                resource: "pessoa",
                action: "find",
                usuarioId: req.user.id,
                target: req.params.data
            }, "Pessoa consultada por data de nascimento");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_FIND_ERROR",
                resource: "pessoa",
                action: "find",
                usuarioID: req.user.id,
                target: req.params.data
            }, "Erro ao buscar pessoa por data de nascimento");

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
                req.user,
                req.query.page,
                req.query.limit
            );

            req.log.info({
                event: "PESSOA_FIND",
                resource: "pessoa",
                action: "find",
                usuarioId: req.user.id,
                target: {
                    inicio: req.params.inicio,
                    fim: req.params.fim
                }
            }, "Pessoa consultada por intervalo de datas");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_FIND_ERROR",
                resource: "pessoa",
                action: "find",
                usuarioId: req.user.id,
                target: {
                    inicio: req.params.inicio,
                    fim: req.params.fim
                }
            }, "Erro ao consultar pessoa por intervalo de datas");

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

            req.log.info({
                event: "PESSOA_CREATE",
                resource: "pessoa",
                action: "create",
                usuarioId: req.user.id,
            }, "Pessoa criado");

            return res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_CREATE_ERROR",
                resource: "pessoa",
                action: "create",
                usuarioId: req.user.id,
            }, "Erro ao criar pessoa");

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

            req.log.info({
                event: "PESSOA_UPDATE",
                resource: "pessoa",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Pessoa atualizada");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_UPDATE_ERROR",
                resource: "pessoa",
                action: "update",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar pessoa");

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

            req.log.info({
                event: "PESSOA_DELETE",
                resource: "pessoa",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Pessoa excluída");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PESSOA_DELETE_ERROR",
                resource: "pessoa",
                action: "delete",
                usuarioId: req.user.id,
                targetId: req.params.id
            }, "Erro ao apagar pessoa");

            console.error(error);
            return next(error);
        };
    };
};

module.exports = new PessoasController();