const Erros = require("../../shared/errors/Errors");
const LocalizacaoBeneficiadoRepository = require("./localizacao-beneficiado.repository");

class LocalizacaoBeneficiadoService {
    async findAllLocalizacao() {
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

    async createlocalizacao(localizacao) {

        if (localizacao.ID_ASSOCIADO == undefined || localizacao.ID_ASSOCIADO == "") {
            throw new Erros("Campo ID_ASSOCIADO vazio", 403);
        };

        if (localizacao.LATITUDE == undefined || localizacao.LATITUDE == "") {
            throw new Erros("Campo LATITUDE vazio", 403);
        };

        if (localizacao.LONGITUDE == undefined || localizacao.LONGITUDE == "") {
            throw new Erros("Campo LONGITUDE vazio", 403);
        };

        if (localizacao.TITULO == undefined || localizacao.TITULO == "") {
            throw new Erros("Campo TITULO vazio", 403);
        };

        if (localizacao.DESCRICAO == undefined || localizacao.DESCRICAO == "") {
            throw new Erros("Campo DESCRICAO vazio", 403);
        };

        const id_associado = await LocalizacaoBeneficiadoRepository.findID_ASSOCIADO(localizacao.ID_ASSOCIADO);

        if (!id_associado) {
            throw new Erros("ID invalido", 403);
        };

        const result = await LocalizacaoBeneficiadoRepository.createLocalizacao(localizacao);
        return result;
    };
};

module.exports = new LocalizacaoBeneficiadoService();