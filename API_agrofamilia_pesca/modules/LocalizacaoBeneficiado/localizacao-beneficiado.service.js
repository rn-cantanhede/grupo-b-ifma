const Erros = require("../../shared/errors/Errors");
const LocalizacaoBeneficiadoRepository = require("./localizacao-beneficiado.repository");

class LocalizacaoBeneficiadoService {
    async getAll() {
        const result = await LocalizacaoBeneficiadoRepository.findAllLocalizacao();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const result = await LocalizacaoBeneficiadoRepository.findById(value);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };

        const result = await LocalizacaoBeneficiadoRepository.findByName(value);
        return result;
    };

    async findbyAssociacao(associacao) {
        const result = await LocalizacaoBeneficiadoRepository.findbyAssociacao(associacao);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
};

module.exports = new LocalizacaoBeneficiadoService();