const Erros = require("../../shared/errors/Errors");
const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const LocalizacaoBeneficiadoRepository = require("./localizacao-beneficiado.repository");

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

    async findAllLocalizacao() {
        const result = await LocalizacaoBeneficiadoRepository.findAllLocalizacao();
        return result;
    };

    /**
     * Busca uma localização beneficiada por ID ou Nome.
     */

    async find(value) {
        return findByIdName(
            value,
            LocalizacaoBeneficiadoRepository.findById,
            LocalizacaoBeneficiadoRepository.findByName
        );
    };

    /**
     * Busca localizações beneficiadas filtrando
     * pelo nome da associação.
     */

    async findbyAssociacao(associacao) {
        return find(associacao, LocalizacaoBeneficiadoRepository.findbyAssociacao);
    };

    /**
     * Cria uma nova localização beneficiada.
     */

    async createlocalizacao(localizacao) {

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
     */

    async updateLocalizacao(id, localizacao) {

        // Verifica existe antes de atualizar
        const idLocalizacao = await LocalizacaoBeneficiadoRepository.findById(id);

        if (!idLocalizacao) {
            throw new Erros("ID invalido", 404);
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

    async deleteLocalizacao(id) {

        // Verifica se o programa existe na tabela real antes de excluir
        const idLocalizacao = await LocalizacaoBeneficiadoRepository.findByIdDelete(id);

        if (!idLocalizacao) {
            throw new Erros("ID não existente", 404);
        };

        // Remove definitivamente
        return await LocalizacaoBeneficiadoRepository.deleteLocalizacao(id);
    };
};

module.exports = new LocalizacaoBeneficiadoService();