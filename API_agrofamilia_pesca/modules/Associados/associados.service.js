const Erros = require("../../shared/errors/Errors");
const AssociadosRepository = require("./associados.repository");

class AssociadosService {
    async getAll() {
        const result = await AssociadosRepository.findAllAssociados();
        return result;
    };

    async find(value) {
        const isNumber = !isNaN(value);
        if (isNumber) {
            const result = await AssociadosRepository.findById(value);
            if (!result) {
                throw new Erros("Não encontrado", 404);
            };
            return result;
        };

        const result = await AssociadosRepository.findByName(value);
        return result;
    };

    async findbyCaf(caf) {
        const result = await AssociadosRepository.findbyCaf(caf);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbyDap(dap) {
        const result = await AssociadosRepository.findbyDap(dap);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findbyAssociacao(associacao) {
        const result = await AssociadosRepository.findbyAssociacao(associacao);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;

    };

    async findbyData(data) {
        const result = await AssociadosRepository.findbyData(data);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };

    async findByInicioFim(inicio, fim) {
        const result = await AssociadosRepository.findByInicioFim(inicio, fim);

        if (!result) {
            throw new Erros("Não encontrado", 404);
        };

        return result;
    };
};

module.exports = new AssociadosService();