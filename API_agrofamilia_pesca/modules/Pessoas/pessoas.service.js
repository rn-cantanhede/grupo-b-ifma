const Erros = require("../../shared/errors/Errors");
const { find, findByInterval } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const PessoasRepository = require("./pessoas.repository");

class PessoasService {
    /**
     * Retorna a lista completa de pessoas.
     */

    async findAllPessoas() {
        const result = await PessoasRepository.findAllPessoas();
        return result;
    };

    /**
     * Busca uma pessoa pelo ID ou pelo nome.
     */

    async find(value) {
        return find(value, PessoasRepository.findById, PessoasRepository.findByName);
    };

    /**
     * Busca pessoas filtrando pelo gênero.
     */

    async findbyGenero(genero) {
        return find(genero, PessoasRepository.findbyGenero);
    };

    /**
     * Busca pessoas pela data de nascimento.
     */

    async findbyData(data) {
        return find(data, PessoasRepository.findbyData);
    };

    /**
     * Busca pessoas dentro de um intervalo de datas de nascimento.
     */

    async findByInicioFim(inicio, fim) {
        return findByInterval(inicio, fim, PessoasRepository.findByInicioFim);
    };

    /**
     * Cria um novo registro de pessoa após validação dos dados.
     */

    async createPessoa(data) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [];

        // Executa todas as validações definidas
        await validationsUtils.validate(data, validations);

        // Insere no banco de dados
        return await PessoasRepository.createPessoa(data);
    };

    /**
     * Atualiza os dados de uma pessoa existente.
     */

    async updatePessoa(id, pessoa) {

        // Verifica se existe antes de atualizar
        const idPessoa = await PessoasRepository.findById(id);

        if (!idPessoa) {
            throw new Erros("ID inválido", 404);
        };

        // Verifica se existe antes de atualizar
        const validations = [];

        // Executa as validações
        await validationsUtils.validate(pessoa, validations);

        // Aplica a atualização no banco de dados
        return await PessoasRepository.updatePessoa(id, pessoa);
    };

    /**
     * Remove uma pessoa pelo ID.
     */

    async deletePessoa(id) {

        // Verifica se o programa existe na tabela real antes de excluir
        const idPessoa = await PessoasRepository.findById(id);

        if (!idPessoa) {
            throw new Erros("ID não existe", 404);
        };

        // Remove definitivamente
        return await PessoasRepository.deletePessoa(id);
    };
};

module.exports = new PessoasService();