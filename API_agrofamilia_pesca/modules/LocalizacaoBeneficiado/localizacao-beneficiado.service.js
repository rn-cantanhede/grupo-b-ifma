const { findByIdName, find } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const LocalizacaoBeneficiadoRepository = require("./localizacao-beneficiado.repository");

class LocalizacaoBeneficiadoService {
    async findAllLocalizacao() {
        const result = await LocalizacaoBeneficiadoRepository.findAllLocalizacao();
        return result;
    };

    async find(value) {
        return findByIdName(value, LocalizacaoBeneficiadoRepository.findById, LocalizacaoBeneficiadoRepository.findByName);
    };

    async findbyAssociacao(associacao) {
        return find(associacao, LocalizacaoBeneficiadoRepository.findbyAssociacao);
    };

    async createlocalizacao(localizacao) {
        const validations = [
            { field: "ID_ASSOCIADO", validation: LocalizacaoBeneficiadoRepository.findID_ASSOCIADO, errorMsg: "ID_ASSOCIADO invalido" },
        ];

        await validationsUtils.validate(localizacao, validations);

        return await LocalizacaoBeneficiadoRepository.createLocalizacao(localizacao);
    };
};

module.exports = new LocalizacaoBeneficiadoService();