const Erros = require("../../shared/errors/Errors");
const ProgramasRepository = require("./programas.repository");

class ProgramasService {
    async getAll(){
        const result = await ProgramasRepository.findAllProgramas();
        return result;
    };

    async find(value){
        const isNumber = !isNaN(value); 
        if (isNumber) {
            const produtos = await ProgramasRepository.findById(value);
            if (!produtos){ 
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
};

module.exports = new ProgramasService();