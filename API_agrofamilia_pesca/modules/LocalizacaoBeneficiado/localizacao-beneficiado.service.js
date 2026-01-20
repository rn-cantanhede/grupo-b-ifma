const Erros = require("../../shared/errors/Errors");
const BaseService = require("../../shared/base/BaseService");
const LocalizacaoPolicy = require("./policies/localizacao.policy");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const associadosRepository = require("../Associados/associados.repository");
const LocalizacaoBeneficiadoRepository = require("./localizacao-beneficiado.repository");
const { findByIdName, find, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");

/**
 * Service responsável pela regra de negócio
 * relacionada à localização dos beneficiados.
 *
 * Atua como intermediário entre o controller
 * e o repositório, aplicando validações e
 * tratamento de erros.
 */

class LocalizacaoBeneficiadoService {

    /**
     * Retorna todas as localizações beneficiadas.
     */

    async findAllLocalizacao(user) {
        if (!LocalizacaoPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await LocalizacaoBeneficiadoRepository.findAllLocalizacao();

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca uma localização beneficiada por ID ou Nome.
     */

    async find(value, user) {
        if (!LocalizacaoPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await findByIdName(
            value,
            LocalizacaoBeneficiadoRepository.findById,
            LocalizacaoBeneficiadoRepository.findByName
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Busca localizações beneficiadas filtrando
     * pelo nome da associação.
     */

    async findbyAssociacao(associacao, user) {
        if (!LocalizacaoPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const result = await find(
            associacao,
            LocalizacaoBeneficiadoRepository.findbyAssociacao
        );

        return BaseService.applyScope({ user, data: result });
    };

    /**
     * Cria uma nova localização beneficiada.
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_ASSOCIADO": "",
     *   "LATITUDE": "",
     *   "LONGITUDE": "",
     *   "TITULO": "",
     *   "DESCRICAO": "",
     * }
     * 
     */

    async createlocalizacao(localizacao, user) {
        const targetUser = await LocalizacaoBeneficiadoRepository.findByIdSecretaria(user.secretaria);

        if (!LocalizacaoPolicy.canPost(user, targetUser)) {
            throw new Erros("Acesso negado", 403);
        };

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_ASSOCIADO",
                validation: LocalizacaoBeneficiadoRepository.findID_ASSOCIADO,
                errorMsg: "ID_ASSOCIADO invalido"
            },
        ];

        // Executa todas as validações definidas
        await validationsUtils.validate(localizacao, validations);

        // Insere no banco de dados
        return await LocalizacaoBeneficiadoRepository.createLocalizacao(localizacao);
    };

    /**
     * Atualiza uma localização beneficiada existente.
     * 
     * Formato passado no body:
     * 
     * {
     *   "ID_ASSOCIADO": "",
     *   "LATITUDE": "",
     *   "LONGITUDE": "",
     *   "TITULO": "",
     *   "DESCRICAO": "",
     * }
     * 
     */

    async updateLocalizacao(id, localizacao, user) {
        // Verifica existe antes de atualizar
        const idLocalizacao = await LocalizacaoBeneficiadoRepository.findById(id);

        if (!idLocalizacao) {
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

        console.log("--- TESTE DE BATIMENTO ESTÁTICO ---");
        console.log("TIPO do Alluser.associacao:", typeof Alluser.associacao, "VALOR:", Alluser.associacao);
        console.log("TIPO do idLocalizacao.ID_ASSOCIACAO:", typeof idLocalizacao.ID_ASSOCIACAO, "VALOR:", idLocalizacao.ID_ASSOCIACAO);
        console.log("COMPARAÇÃO (==):", Alluser.associacao == idLocalizacao.ID_ASSOCIACAO);

        if (!LocalizacaoPolicy.canUpdate(Alluser, idLocalizacao)) {
            console.log("POLICY REJEITOU O ACESSO!");
            throw new Erros("Acesso negado", 403);
        }

        if (!LocalizacaoPolicy.canUpdate(Alluser, idLocalizacao)) {
            throw new Erros("Acesso negado", 403);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_ASSOCIADO",
                validation: LocalizacaoBeneficiadoRepository.findID_ASSOCIADO,
                errorMsg: "ID_ASSOCIADO invalido"
            },
        ];

        // Executa as validações
        await validationsUtils.validate(localizacao, validations);

        // Atualiza o programa no banco
        return await LocalizacaoBeneficiadoRepository.updateLocalizacao(id, localizacao);
    };

    /**
     * Remove uma localização beneficiada.
     */

    async deleteLocalizacao(id, user) {

        // Verifica se o programa existe na tabela real antes de excluir
        const idLocalizacao = await LocalizacaoBeneficiadoRepository.findById(id);

        if (!idLocalizacao) {
            throw new Erros("ID não existente", 404);
        };

        const targetUser = await associadosRepository.findByIdPessoa(user.id);

        const Alluser = {
            id: user.id,
            login: user.login,
            nivel: user.nivel,
            secretaria: user.secretaria,
            associacao: targetUser?.ID_ASSOCIACAO
        };

        if (!LocalizacaoPolicy.canDelete(Alluser, idLocalizacao)) {
            throw new Erros("Acesso negado", 403);
        };

        // Remove definitivamente
        return await LocalizacaoBeneficiadoRepository.deleteLocalizacao(id);
    };
};

module.exports = new LocalizacaoBeneficiadoService();