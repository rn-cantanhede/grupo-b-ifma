const Erros = require("../../shared/errors/Errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByIdName, find, VerifyNivel, listUsers } = require("../../shared/Utils/findUtils");
const UsuarioPolicy = require("./policies/usuario.policy");
const BaseService = require("../../shared/base/BaseService");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const UsuariosRepository = require("./usuarios.repository");
const associacoesRepository = require("../Associacoes/associacoes.repository");

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

    async findAllUsuarios(user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);

        };

        const usuarios = await UsuariosRepository.findAllUsuarios();

        return BaseService.filterByUserLevel({
            user,
            data: usuarios,
            associacoesRepository
        });
    };

    /**
     * Busca usuario por ID ou Nome, conforme o tipo de entrada.
     */
    async find(value, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);

        };

        const usuarios = await findByIdName(
            value,
            UsuariosRepository.findById,
            UsuariosRepository.findByName
        );

        return BaseService.filterByUserLevel({
            user,
            data: usuarios,
            associacoesRepository
        });
    };

    /**
     * Busca usuario pelo Nivel.
     */
    async findByNivel(nivel, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);

        };

        const usuarios = await find(
            nivel,
            UsuariosRepository.findByNivel
        );

        return BaseService.filterByUserLevel({
            user,
            data: usuarios,
            associacoesRepository
        });
    };

    /**
     * Busca usuario pela secretaria.
     */
    async findBySecretaria(secretaria, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        if (!user.nivel == 1) {
            throw new Erros("Apenas admins podem acessar", 403);
        };

        return await UsuariosRepository.findBySecretaria(secretaria);
    };

    /**
     * Busca usuario pelo login.
     */
    async findByLogin(login, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const usuarios = await find(login, UsuariosRepository.findByLogin);

        return BaseService.filterByUserLevel({
            user,
            data: usuarios,
            associacoesRepository
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