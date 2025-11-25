const Erros = require("../../shared/errors/Errors");
const SecretariasRepository = require("./secretarias.repository");

class SecretariasService {
    async findAllProgramas(){
        const result = await SecretariasRepository.findAllSecretarias();
        return result;
    };

    async find(value){
        const isNumber = !isNaN(value); 
        if (isNumber) {
            const produtos = await SecretariasRepository.findById(value);
            if (!produtos){ 
                throw new Erros("Produto não encontrado", 404)
            };
            return produtos;
        };

        const produtos = await SecretariasRepository.findByName(value);
        return produtos;
    };

    async findbyEstado(estado) {
        const result = await SecretariasRepository.findbyEstado(estado);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };
    
    async findbyCidade(cidade) {
        const result = await SecretariasRepository.findbyCidade(cidade);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };
        return result;
    };
};

module.exports = new SecretariasService();