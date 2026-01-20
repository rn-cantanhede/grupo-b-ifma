const Erros = require("../../shared/errors/Errors");
const UsuarioPolicy = require("./policies/usuario.policy");
const BaseService = require("../../shared/base/BaseService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const UsuariosRepository = require("./usuarios.repository");
const { findByIdName, find } = require("../../shared/Utils/findUtils");

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
     * Retorna todos os usuários cadastrados, filtrados pelo escopo do usuário.
     */
    async findAllUsuarios(user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const usuarios = await UsuariosRepository.findAllUsuarios();
        return BaseService.applyScope({ user, data: usuarios });
    };

    /**
     * Busca usuário por ID ou Nome, respeitando a visibilidade do usuário.
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

        return BaseService.applyScope({ user, data: usuarios });
    };

    /**
     * Lista usuários filtrando pelo nível.
     */
    async findByNivel(nivel, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const usuarios = await find(nivel, UsuariosRepository.findByNivel);
        return BaseService.applyScope({ user, data: usuarios });
    };

    /**
     * Lista usuários filtrando pela secretaria.
     */
    async findBySecretaria(secretaria, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const usuarios = await UsuariosRepository.findBySecretaria(secretaria);
        return BaseService.applyScope({ user, data: usuarios });
    };

    /**
     * Busca usuário pelo login.
     */
    async findByLogin(login, user) {
        if (!UsuarioPolicy.canGet(user)) {
            throw new Erros("Acesso negado", 403);
        };

        const usuarios = await find(login, UsuariosRepository.findByLogin);
        return BaseService.applyScope({ user, data: usuarios });
    };

    /**
     * Cria um novo usuário, aplicando validações e hash de senha.
     * 
     * Formato passado no body:
     * 
     * {
     *  "ID_PESSOA": "",
     *  "ID_SECRETARIA": "",
     *  "NIVEL": "",
     *  "LOGIN": "",
     *  "SENHA": ""
     * }
     * 
     */
    async createUsuario(usuario) {
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

        await validationsUtils.validate(usuario, validations);

        const salt = bcrypt.genSaltSync(10);
        usuario.SENHA = bcrypt.hashSync(usuario.SENHA, salt);

        return await UsuariosRepository.createUsuario(usuario);
    };

    /**
     * Atualiza um usuário existente, aplicando validações e hash de senha se necessário.
     * 
     * Formato passado no body:
     * 
     * {
     *  "ID_PESSOA": "",
     *  "ID_SECRETARIA": "",
     *  "NIVEL": "",
     *  "LOGIN": "",
     *  "SENHA": ""
     * }
     * 
     */
    async updateUsuario(id, usuario) {
        const idUsuario = await UsuariosRepository.findById(id);
        if (!idUsuario) throw new Erros("ID inexistente", 404);

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

        await validationsUtils.validate(usuario, validations);

        if (usuario.SENHA) {
            const salt = bcrypt.genSaltSync(10);
            usuario.SENHA = bcrypt.hashSync(usuario.SENHA, salt);
        };

        return await UsuariosRepository.updateUsuario(id, usuario);
    };

    /**
     * Remove um usuário existente.
     */
    async deleteUsuario(id) {
        const idUsuario = await UsuariosRepository.findByIdDelete(id);
        if (!idUsuario) throw new Erros("ID inexistente", 404);

        return await UsuariosRepository.deleteUsuario(id);
    };

    /**
     * Autentica um usuário e retorna um token JWT válido por 1 dia.
     * 
     * Formato passado no body:
     * 
     * {
     *   "LOGIN": "",
     *   "SENHA": ""
     * }
     * 
     */
    async login(data) {
        const user = await UsuariosRepository.login(data);

        if (!user || !bcrypt.compareSync(data.SENHA, user.SENHA)) {
            return { Error: 'Login ou senha inválidos' };
        };

        const token = jwt.sign({
            id: user.ID_PESSOA,
            login: user.LOGIN,
            nivel: user.NIVEL,
            secretaria: user.ID_SECRETARIA
        }, secret, { expiresIn: '7d' });

        return token;
    };
};

module.exports = new UsuariosService();