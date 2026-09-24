const { convertString } = require("../../shared/Utils/findUtils");
const Hateoas = require("../../shared/Utils/hateoas");
const ProgramasService = require("./programas.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas aos Programas e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */

class ProgramasController {

    /**
     * Retorna todos os programas cadastrados.
     */

    async AllProgramas(req, res) {
        try {
            const programas = await ProgramasService.findAllProgramas(
                req.session.user,
                req.query.page,
                req.query.limit
            );
            const hateoas = Hateoas(
                programas.result[0].ID,
                process.env.URL,
                req.session.user.nivel,
                "programas",
                ["",
                    programas.result[0].ID,
                    convertString(programas.result[0].NOME),
                    `secretaria/${programas.result[0].SECRETARIA}`,
                    `estado/${programas.result[0].ESTADO}`,
                    `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                    `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                    `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                ]
            );

            req.log.info({
                event: "PROGRAMA_LIST",
                resource: "programa",
                action: "list",
                usuarioID: req.session.user.id
            }, "Listagem dos programas");

            return res.status(200).json({
                result: programas.result,
                total: programas.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_LIST_ERROR",
                resource: "programa",
                action: "list",
                usuarioID: req.session.user.id
            }, "Erro ao listar os programas");

            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    /**
     * Busca programas por ID ou nome,
     * de acordo com o valor passado na URL.
     */

    async findProgramas(req, res, next) {
        try {
            const result = await ProgramasService.find(
                req.params.value,
                req.session.user,
                req.query.page,
                req.query.limit
            );
            let hateoas;

            if (!Array.isArray(result.result)) {
                hateoas = Hateoas(
                    programas.result.ID,
                    process.env.URL,
                    req.session.user.nivel,
                    "programas",
                    ["",
                        programas.result.ID,
                        convertString(programas.result.NOME),
                        `secretaria/${programas.result.SECRETARIA}`,
                        `estado/${programas.result.ESTADO}`,
                        `recurso/${convertString(programas.result.ORIGEM_RECURSO)}`,
                        `data-inicio/${convertString(programas.result.DATA_INICIO)}`,
                        `data-fim/${convertString(programas.result.DATA_FIM)}`,
                    ]
                );
            } else {
                hateoas = Hateoas(
                    programas.result[0].ID,
                    process.env.URL,
                    req.session.user.nivel,
                    "programas",
                    ["",
                        programas.result[0].ID,
                        convertString(programas.result[0].NOME),
                        `secretaria/${programas.result[0].SECRETARIA}`,
                        `estado/${programas.result[0].ESTADO}`,
                        `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                        `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                        `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                    ]
                );
            };

            req.log.info({
                event: "PROGRAMA_FIND",
                resource: "programa",
                action: "find",
                usuarioId: req.session.user.id,
                target: req.params.value
            }, "Programa consultado por id ou nome");

            return res.status(200).json({
                result: result.result,
                total: result.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_FIND_ERROR",
                resource: "programa",
                action: "find",
                usuarioID: req.session.user.id,
                target: req.params.value
            }, "Erro ao buscar programa");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas vinculados a uma secretaria específica.
     */

    async findSecretariaPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbySecretaria(
                req.params.secretaria,
                req.session.user,
                req.query.page,
                req.query.limit
            );
            const hateoas = Hateoas(
                programas.result[0].ID,
                process.env.URL,
                req.session.user.nivel,
                "programas",
                ["",
                    programas.result[0].ID,
                    convertString(programas.result[0].NOME),
                    `secretaria/${programas.result[0].SECRETARIA}`,
                    `estado/${programas.result[0].ESTADO}`,
                    `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                    `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                    `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                ]
            );

            req.log.info({
                event: "PROGRAMA_FIND",
                resource: "programa",
                action: "find",
                usuarioId: req.session.user.id,
                target: req.params.secretaria
            }, "Programa consultado por secretaria");

            return res.status(200).json({
                result: result.result,
                total: result.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_FIND_ERROR",
                resource: "programa",
                action: "find",
                usuarioID: req.session.user.id,
                target: req.params.secretaria
            }, "Erro ao buscar programa por secretaria");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas filtrando pelo estado.
     */

    async findEstadoPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyEstado(
                req.params.estado,
                req.session.user,
                req.query.page,
                req.query.limit
            );
            const hateoas = Hateoas(
                programas.result[0].ID,
                process.env.URL,
                req.session.user.nivel,
                "programas",
                ["",
                    programas.result[0].ID,
                    convertString(programas.result[0].NOME),
                    `secretaria/${programas.result[0].SECRETARIA}`,
                    `estado/${programas.result[0].ESTADO}`,
                    `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                    `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                    `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                ]
            );

            req.log.info({
                event: "PROGRAMA_FIND",
                resource: "programa",
                action: "find",
                usuarioId: req.session.user.id,
                target: req.params.estado
            }, "Programa consultado por estado");

            return res.status(200).json({
                result: result.result,
                total: result.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_FIND_ERROR",
                resource: "programa",
                action: "find",
                usuarioID: req.session.user.id,
                target: req.params.estado
            }, "Erro ao buscar programa por estado");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas pela origem do recurso financeiro.
     */

    async findOrigemRecursoPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyOrigemRecurso(
                req.params.recurso,
                req.session.user,
                req.query.page,
                req.query.limit
            );
            const hateoas = Hateoas(
                programas.result[0].ID,
                process.env.URL,
                req.session.user.nivel,
                "programas",
                ["",
                    programas.result[0].ID,
                    convertString(programas.result[0].NOME),
                    `secretaria/${programas.result[0].SECRETARIA}`,
                    `estado/${programas.result[0].ESTADO}`,
                    `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                    `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                    `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                ]
            );

            req.log.info({
                event: "PROGRAMA_FIND",
                resource: "programa",
                action: "find",
                usuarioId: req.session.user.id,
                target: req.params.recurso
            }, "Programa consultado por origem do recurso");

            return res.status(200).json({
                result: result.result,
                total: result.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_FIND_ERROR",
                resource: "programa",
                action: "find",
                usuarioID: req.session.user.id,
                target: req.params.recurso
            }, "Erro ao buscar programa por origem do recurso");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas pela data de início.
     */

    async findDataInicioPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyDataInicio(
                req.params.data,
                req.session.user,
                req.query.page,
                req.query.limit
            );
            const hateoas = Hateoas(
                programas.result[0].ID,
                process.env.URL,
                req.session.user.nivel,
                "programas",
                ["",
                    programas.result[0].ID,
                    convertString(programas.result[0].NOME),
                    `secretaria/${programas.result[0].SECRETARIA}`,
                    `estado/${programas.result[0].ESTADO}`,
                    `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                    `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                    `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                ]
            );

            req.log.info({
                event: "PROGRAMA_FIND",
                resource: "programa",
                action: "find",
                usuarioId: req.session.user.id,
                target: req.params.data
            }, "Programa consultado por data de inicio");

            return res.status(200).json({
                result: result.result,
                total: result.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_FIND_ERROR",
                resource: "programa",
                action: "find",
                usuarioID: req.session.user.id,
                target: req.params.data
            }, "Erro ao buscar programa por data de inicio");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca programas pela data de fim.
     */

    async findDataFimPrograma(req, res, next) {
        try {
            const result = await ProgramasService.findbyDataFim(
                req.params.data,
                req.session.user,
                req.query.page,
                req.query.limit
            );
            const hateoas = Hateoas(
                programas.result[0].ID,
                process.env.URL,
                req.session.user.nivel,
                "programas",
                ["",
                    programas.result[0].ID,
                    convertString(programas.result[0].NOME),
                    `secretaria/${programas.result[0].SECRETARIA}`,
                    `estado/${programas.result[0].ESTADO}`,
                    `recurso/${convertString(programas.result[0].ORIGEM_RECURSO)}`,
                    `data-inicio/${convertString(programas.result[0].DATA_INICIO)}`,
                    `data-fim/${convertString(programas.result[0].DATA_FIM)}`,
                ]
            );

            req.log.info({
                event: "PROGRAMA_FIND",
                resource: "programa",
                action: "find",
                usuarioId: req.session.user.id,
                target: req.params.data
            }, "Programa consultado por data de termino");

            return res.status(200).json({
                result: result.result,
                total: result.total,
                hateoas: hateoas
            });
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_FIND_ERROR",
                resource: "programa",
                action: "find",
                usuarioID: req.session.user.id,
                target: req.params.data
            }, "Erro ao buscar programa por data de termino");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo programa.
     */

    async createPrograma(req, res, next) {
        try {
            const result = await ProgramasService.createPrograma(
                req.body,
                req.session.user
            );

            req.log.info({
                event: "PROGRAMA_CREATE",
                resource: "programa",
                action: "create",
                usuarioId: req.session.user.id,
            }, "Programa criado");

            return res.status(201).json(result);
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_CREATE_ERROR",
                resource: "programa",
                action: "create",
                usuarioId: req.session.user.id
            }, "Erro ao criar programa");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Atualiza um programa existente pelo ID.
     */

    async updatePrograma(req, res, next) {
        try {
            const result = await ProgramasService.updatePrograma(
                req.params.id,
                req.body,
                req.session.user
            );

            req.log.info({
                event: "PROGRAMA_UPDATE",
                resource: "programa",
                action: "update",
                usuarioId: req.session.user.id,
                targetId: req.params.id
            }, "Programa atualizada");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_UPDATE_ERROR",
                resource: "programa",
                action: "update",
                usuarioId: req.session.user.id,
                targetId: req.params.id
            }, "Erro ao atualizar programa");

            console.log(error);
            return next(error);
        };
    };

    /**
     * Remove um programa pelo ID.
     */

    async deletePrograma(req, res, next) {
        try {
            const result = await ProgramasService.deletePrograma(
                req.params.id,
                req.session.user
            );

            req.log.info({
                event: "PROGRAMA_DELETE",
                resource: "programa",
                action: "delete",
                usuarioId: req.session.user.id,
                targetId: req.params.id
            }, "Programa excluída");

            return res.status(200).json(result);
        } catch (error) {
            req.log.error({
                event: "PROGRAMA_DELETE_ERROR",
                resource: "programa",
                action: "delete",
                usuarioId: req.session.user.id,
                targetId: req.params.id
            }, "Erro ao apagar programa");

            console.log(error);
            return next(error);
        };
    };
};

module.exports = new ProgramasController();
