const Erros = require("../../shared/errors/Errors");
const ProgramasRepository = require("./programas.repository");

class ProgramasService {
    async getAll() {
        const result = await ProgramasRepository.findAllProgramas();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const produtos = await ProgramasRepository.findById(value);
            if (!produtos) {
                throw new Erros("Produto não encontrado", 404);
            };
            return produtos;
        };

        const produtos = await ProgramasRepository.findByName(value);
        return produtos;
    };

    async findbySecretaria(secretaria) {
        const result = await ProgramasRepository.findbySecretaria(secretaria);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findbyEstado(estado) {
        const result = await ProgramasRepository.findbyEstado(estado);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findbyOrigemRecurso(recurso) {
        const result = await ProgramasRepository.findbyOrigemRecurso(recurso);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findbyDataInicio(data) {
        const result = await ProgramasRepository.findbyDataInicio(data);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async findbyDataFim(data) {
        const result = await ProgramasRepository.findbyDataFim(data);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };

    async createPrograma(programa) {
        if (programa.NOME == undefined || programa.NOME == "") {
            throw new Erros("Campo NOME vazio", 403);
        };

        if (programa.DESCRICAO == undefined || programa.DESCRICAO == "") {
            throw new Erros("Campo DESCRICAO vazio", 403);
        };

        if (programa.DATA_INICIO == undefined || programa.DATA_INICIO == "") {
            throw new Erros("Campo DATA_INICIO vazio", 403);
        };

        if (programa.DATA_FIM == undefined || programa.DATA_FIM == "") {
            throw new Erros("Campo DATA_FIM vazio", 403);
        };
        
        if (programa.ORIGEM_RECURSO == undefined || programa.ORIGEM_RECURSO == "") {
            throw new Erros("Campo ORIGEM_RECURSO vazio", 403);
        };

        if (programa.VLR_REPASSE == undefined || programa.VLR_REPASSE == "") {
            throw new Erros("Campo VLR_REPASSE vazio", 403);
        };

        if (programa.ID_SECRETARIA == undefined || programa.ID_SECRETARIA == "") {
            throw new Erros("Campo ID_SECRETARIA vazio", 403);
        };

        if (isNaN(programa.ID_SECRETARIA)) {
            throw new Erros("Campo ID_SECRETARIA precisa de um ID", 403);
        };
        
        const id_secretaria = await ProgramasRepository.findID_SECRETARIA(programa.ID_SECRETARIA);

        if (!id_secretaria) {
            throw new Erros("ID invalido", 403);
        };

        const result = await ProgramasRepository.createPrograma(programa);
        return result;
    };
};

module.exports = new ProgramasService();