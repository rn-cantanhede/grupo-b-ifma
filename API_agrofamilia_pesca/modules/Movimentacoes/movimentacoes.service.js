const Erros = require("../../shared/errors/Errors");
const BaseService = require("../../shared/base/BaseService");
const MovimentacoesPolicy = require("./policies/movimentacoes.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const MovimentacoesRepository = require("./movimentacoes.repository");
const associadosRepository = require("../Associados/associados.repository");
const { find, findByInterval, convertString, findByScope } = require("../../shared/Utils/findUtils");
const baseScope = require("../../shared/base/baseScope");

/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade Movimentação.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class MovimentacoesService {

    /**
     * Retorna todas as movimentações registradas.
     */

    async findAllMovimentacoes(session) {
        if (!MovimentacoesPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await MovimentacoesRepository.findAllMovimentacoes();

        return baseScope.getAll(session, {
            admin: MovimentacoesRepository.findAllMovimentacoes,
            secretaria: MovimentacoesRepository.findByIdSecretaria,
            associacao: MovimentacoesRepository.findByIdAssociado,
            usuario: MovimentacoesRepository.findByIdPessoa
        });
    };

    /**
     * Busca uma movimentação pelo ID.
     */

    async findById(value, session) {
        if (!MovimentacoesPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                find(
                    value,
                    MovimentacoesRepository.findById
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "ID",
                    "ID",
                    value,
                    MovimentacoesRepository.findByIdScope
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "ID",
                    "ID",
                    value,
                    MovimentacoesRepository.findByIdScope
                ),

            usuario: (id) =>
                findByScope(
                    id,
                    sessionField[2],
                    "ID",
                    "ID",
                    value,
                    MovimentacoesRepository.findByIdScope
                ),
        });
    };

    /**
     * Busca movimentações associadas a um DAP específico.
     */

    async findbyDap(dap, session) {
        if (!MovimentacoesPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                find(
                    dap,
                    MovimentacoesRepository.findbyDap
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "DAP",
                    "DAP",
                    dap,
                    MovimentacoesRepository.findByDapScope
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "DAP",
                    "DAP",
                    dap,
                    MovimentacoesRepository.findByDapScope
                ),

            usuario: (id) =>
                findByScope(
                    id,
                    sessionField[2],
                    "DAP",
                    "DAP",
                    dap,
                    MovimentacoesRepository.findByDapScope
                ),
        });
    };

    /**
     * Busca movimentações associadas a um produto específico.
     */

    async findbyProduto(produto, session) {
        if (!MovimentacoesPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                find(
                    produto,
                    MovimentacoesRepository.findbyProduto
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "PRODUTO",
                    "PRODUTO",
                    produto,
                    MovimentacoesRepository.findByProdutoScope
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "PRODUTO",
                    "PRODUTO",
                    produto,
                    MovimentacoesRepository.findByProdutoScope
                ),

            usuario: (id) =>
                findByScope(
                    id,
                    sessionField[2],
                    "PRODUTO",
                    "PRODUTO",
                    produto,
                    MovimentacoesRepository.findByProdutoScope
                ),
        });
    };

    /**
     * Busca movimentações ocorridas em uma data específica.
     */

    async findbyData(data, session) {
        if (!MovimentacoesPolicy.canGet(session)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            data,
            MovimentacoesRepository.findbyData
        );

        const sessionField = ["ID_SECRETARIA", "ID_ASSOCIACAO", "ID"];

        return baseScope.getFind(session, {
            admin: () =>
                find(
                    data,
                    MovimentacoesRepository.findbyData
                ),

            secretaria: (id) =>
                findByScope(
                    id,
                    sessionField[0],
                    "DATA_MOVIMENTACAO",
                    "DATA_MOVIMENTACAO",
                    data,
                    MovimentacoesRepository.findByDataScope,
                ),

            associacao: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "DATA_MOVIMENTACAO",
                    "DATA_MOVIMENTACAO",
                    data,
                    MovimentacoesRepository.findByDataScope
                ),

            usuario: (id) =>
                findByScope(
                    id,
                    sessionField[1],
                    "DATA_MOVIMENTACAO",
                    "DATA_MOVIMENTACAO",
                    data,
                    MovimentacoesRepository.findByDataScope
                ),
        });
    };

    /**
     * Busca movimentações dentro de um intervalo de datas.
     */

    async findByInicioFim(inicio, fim, user) {
        if (!MovimentacoesPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByInterval(
            inicio,
            fim,
            MovimentacoesRepository.findByInicioFim
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Cria uma nova movimentação de produto.
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_LOCAL": "",
     *   "ID_AGRICULTURA_FAMILIAR": "",
     *   "ID_PRODUTO": "",
     *   "QNT_PRODUZIDA": "",
     *   "VLR_UNITARIO": "",
     *   "DATA_MOVIMENTACAO": ""
     * }
     * 
     */

    async createMovimentacao(movimentacao, user) {
        const targetUser = await associadosRepository.findByIdSecretaria(user.secretaria);

        if (!MovimentacoesPolicy.canPost(user, targetUser)) {
            throw new Erros("Acesso negado", 403);
        };

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_LOCAL",
                validation: MovimentacoesRepository.findID_LOCAL,
                errorMsg: "ID_LOCAL invalido"
            },
            {
                field: "ID_AGRICULTURA_FAMILIAR",
                validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR,
                errorMsg: "ID_AGRICULTURA_FAMILIAR invalido"
            },
            {
                field: "ID_PRODUTO",
                validation: MovimentacoesRepository.findID_PRODUTO,
                errorMsg: "ID_PRODUTO invalido"
            },
            // { field: 'NOME', validationFn: (val) => val.length > 0, errorMessage: 'Nome do cliente é obrigatório' }, 
            // { field: 'EMAIL', validationFn: (val) => /\S+@\S+\.\S+/.test(val), errorMessage: 'Email inválido' },
        ];

        // Executa todas as validações definidas
        await validationsUtils.validate(movimentacao, validations);

        // Insere no banco de dados
        return await MovimentacoesRepository.createMovimentacao(movimentacao);
    };

    /**
     * Atualiza uma movimentação existente.
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_LOCAL": "",
     *   "ID_AGRICULTURA_FAMILIAR": "",
     *   "ID_PRODUTO": "",
     *   "QNT_PRODUZIDA": "",
     *   "VLR_UNITARIO": "",
     *   "DATA_MOVIMENTACAO": ""
     * }
     * 
     */

    async updateMovimentacao(id, movimentacao, user) {
        // Verifica existe antes de atualizar
        const idMovimentacao = await MovimentacoesRepository.findById(id);

        if (!idMovimentacao) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!MovimentacoesPolicy.canUpdate(Alluser, idMovimentacao)) {
            throw new Erros("Acesso negado", 403);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_LOCAL",
                validation: MovimentacoesRepository.findID_LOCAL,
                errorMsg: "ID_LOCAL invalido"
            },
            {
                field: "ID_AGRICULTURA_FAMILIAR",
                validation: MovimentacoesRepository.findID_AGRICULTURA_FAMILIAR,
                errorMsg: "ID_AGRICULTURA_FAMILIAR invalido"
            },
            {
                field: "ID_PRODUTO",
                validation: MovimentacoesRepository.findID_PRODUTO,
                errorMsg: "ID_PRODUTO invalido"
            }
        ];

        // Executa as validações
        await validationsUtils.validate(movimentacao, validations);

        // Aplica a atualização no banco de dados
        return await MovimentacoesRepository.updateMovimentacao(id, movimentacao);
    };

    /**
     * Remove uma movimentação do sistema.
     */

    async deleteMovimentacao(id, user) {
        // Verifica existe antes de atualizar
        const idMovimentacao = await MovimentacoesRepository.findById(id);

        if (!idMovimentacao) {
            throw new Erros("ID invalido", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!MovimentacoesPolicy.canUpdate(Alluser, idMovimentacao)) {
            throw new Erros("Acesso negado", 403);
        };

        // Remove definitivamente
        return await MovimentacoesRepository.deleteMovimentacao(id);
    };
};

module.exports = new MovimentacoesService();