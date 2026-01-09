const Erros = require("../../shared/errors/Errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByIdName, find, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const UsuariosRepository = require("./usuarios.repository");
const secretariasService = require("../Secretarias/secretarias.service");
const associacoesService = require("../Associacoes/associacoes.service");

const secret = process.env.JWT_SECRET;
/**
 * Camada de serviço responsável pela regra de negócio
 * relacionada à entidade usuario.
 *
 * Atua como intermediária entre o Controller e o Repository,
 * aplicando validações, consistência de dados e regras
 * antes de qualquer operação de persistência.
 */
class UsuariosService {

    /**
     * Retorna todos os usuarios cadastrados.
     */

    /**
     * O uso do VerifyNivel do jeito que está, não está otimizado
     * modificação nas VIEWs do database resoveriam o problema.
     */
    async findAllUsuarios(user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return await UsuariosRepository.findAllUsuarios();
            },

            secretario: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                return await find(secretaria.NOME, UsuariosRepository.findBySecretaria);
            },

            associacao: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                const associacoes = await find(secretaria.NOME, associacoesService.findbySecretaria);
                return await UsuariosRepository.findByAssociacao(associacoes[0].NOME);
            },

            usuario: async function () {
                const result = await find(user.id, UsuariosRepository.findById);
                return result[0];
            }
        });
    };

    /**
     * Por algum motivo(provalvelmente de tipagem), o findByID só funciona
     * com o multiple = true.
      Precisa de correção no dbUtils com criação de finds (findBy e findBy)
     * diretamente nele.
     * Terá que ser ajustado em todos os repositorys na refatoração
     */

      
    /**
     * Busca usuario por ID ou Nome, conforme o tipo de entrada.
     */
    async find(value, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return findByIdName(
                    value,
                    UsuariosRepository.findById,
                    UsuariosRepository.findByName
                );
            },

            secretario: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                const result = await findByIdName(
                    value,
                    UsuariosRepository.findById,
                    UsuariosRepository.findByName
                );

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                const associacoes = await find(secretaria.NOME, associacoesService.findbySecretaria);
                const result = await findByIdName(
                    value,
                    UsuariosRepository.findById,
                    UsuariosRepository.findByName
                );

                return listUsers(result, "ASSOCIACAO", associacoes[0].NOME);
            },
        });
    };

    /**
     * Busca usuario pelo Nivel.
     */
    async findByNivel(nivel, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(nivel, UsuariosRepository.findByNivel);
            },

            secretario: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                const result = await find(nivel, UsuariosRepository.findByNivel);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                const associacoes = await find(secretaria.NOME, associacoesService.findbySecretaria);
                const result = await UsuariosRepository.findByNivel(nivel);

                return listUsers(result, "ASSOCIACAO", associacoes[0].NOME);
            },
        });
    };

    /**
     * Busca usuario pela secretaria.
     */
    async findBySecretaria(secretaria) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(secretaria, UsuariosRepository.findBySecretaria);
            },
        });
    };

    /**
     * Busca usuario pelo login.
     */
    async findByLogin(login, user) {
        return VerifyNivel({
            user,

            admin: async function () {
                return find(login, UsuariosRepository.findByLogin);
            },

            secretario: async function () {
                const secretaria = await secretariasService.find(user.secretaria);
                const result = await find(login, UsuariosRepository.findByLogin);

                return listUsers(result, "SECRETARIA", secretaria.NOME);
            },

            associacao: async function () {
                const secretaria = await find(user.secretaria, secretariasService.find);
                const associacoes = await find(secretaria.NOME, associacoesService.findbySecretaria);
                const result = await UsuariosRepository.findByLogin(login);

                return listUsers(result, "ASSOCIACAO", associacoes[0].NOME);
            },
        });
    };

    /**
     * Cria um usuario após validar referências obrigatórias.
     */
    async createUsuario(usuario) {

        // Lista de validações que devem ser aplicadas antes da inserção
        const validations = [
            {
                field: "ID_PESSOA",
                validation: UsuariosRepository.findByID_PESSOA,
                errorMsg: "ID_PESSOA invalido"
            },
            {
                field: "ID_SECRETARIA",
                validation: UsuariosRepository.findByID_SECRETARIA,
                errorMsg: "ID_SECRETARIA invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(usuario, validations);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(usuario.SENHA, salt);

        usuario.SENHA = hash;

        // Insere no banco de dados
        return await UsuariosRepository.createUsuario(usuario);
    };

    /**
     * Modifica um usuario após validar referências obrigatórias.
     */
    async updateUsuario(id, usuario) {

        // Verifica se existe antes de atualizar
        const idUsuario = await UsuariosRepository.findById(id);

        if (!idUsuario) {
            throw new Erros("ID inexistente", 404);
        };

        // Lista de validações que devem ser aplicadas
        const validations = [
            {
                field: "ID_PESSOA",
                validation: UsuariosRepository.findByID_PESSOA,
                errorMsg: "ID_PESSOA invalido"
            },
            {
                field: "ID_SECRETARIA",
                validation: UsuariosRepository.findByID_SECRETARIA,
                errorMsg: "ID_SECRETARIA invalido"
            },
        ];

        // Valida dependências antes da inserção
        await validationsUtils.validate(usuario, validations);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(usuario.SENHA, salt);

        usuario.SENHA = hash;

        // Aplica a atualização no banco de dados
        return await UsuariosRepository.updateUsuario(id, usuario);
    };

    /**
     * Deleta um usuario após validar o id.
     */
    async deleteUsuario(id) {

        // Verifica se existe na tabela real antes de excluir
        const idUsuario = await UsuariosRepository.findByIdDelete(id);

        if (!idUsuario) {
            throw new Erros("ID inexistente", 404);
        };

        // Remove definitivamente
        return await UsuariosRepository.deleteUsuario(id);
    };

    /**
     * Realiza a autenticação do usuário.
     * Valida login e senha criptografada.
     */

    async login(data) {
        const user = await UsuariosRepository.login(data);

        if (!user) {
            return { Error: 'Login invalido' };
        };

        const senhaValida = bcrypt.compareSync(data.SENHA, user.SENHA);

        if (!senhaValida) {
            return { Error: 'Login invalido' };
        };

        const token = jwt.sign({
            id: user.ID_PESSOA,
            login: user.LOGIN,
            nivel: user.NIVEL,
            secretaria: user.ID_SECRETARIA

        }, secret);

        if (!token) {
            throw new Erros("Erro ao obter token", 400);
        };

        return token;
    };

};

module.exports = new UsuariosService();