const Erros = require("../../shared/errors/Errors");
const UsuarioPolicy = require("./policies/usuario.policy");
const BaseService = require("../../shared/base/BaseService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const UsuariosRepository = require("./usuarios.repository");
const { findByIdName, find } = require("../../shared/Utils/findUtils");
const baseScope = require("../../shared/base/baseScope");

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
     *  "ID_ASSOCIACAO": "",
     *  "NIVEL": "",
     *  "LOGIN": "",
     *  "SENHA": ""
     * }
     * 
     */
    async createUsuario(usuario) {

        //Verifica se já tem usuario com o LOGIN
        if (await UsuariosRepository.findByLogin(usuario.LOGIN) != undefined) {
            throw new Erros("LOGIN invalido", 403);
        };

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
     * Atualiza um usuário existente, aplicando validações.
     * 
     * Formato passado no body:
     * 
     * {
     *  "ID_PESSOA": "",
     *  "ID_SECRETARIA": "",
     *  "ID_ASSOCIACAO": "",
     *  "NIVEL": "",
     * }
     * 
     */
    async updateUsuario(id, usuario, session) {

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
            {
                field: "ID_ASSOCIACAO",
                validation: UsuariosRepository.findByIdAssociacao,
                errorMsg: "ID_ASSOCIACAO invalido"
            }
        ];

        //Verifica se o ID existe no database
        if (!await UsuariosRepository.findById(id)) {
            throw new Erros("ID inexistente", 404);
        };

        await validationsUtils.validate(usuario, validations);

        // Faz a mesma coisa que um delete usuario.LOGIN/usuario[LOGIN];
        const { LOGIN, SENHA, ...filterUsuario } = usuario;

        return baseScope.update(
            id, filterUsuario, session,
            "secretaria", "ID_SECRETARIA",
            UsuariosRepository.updateUsuario
        );
    };

    /**
     * Atualiza o login de um usuário existente, 
     * aplicando validações e hash de senha se necessário.
     * 
     * Formato passado no body:
     * 
     * {
     *  "LOGIN": "",
     *  "SENHA": ""
     * }
     * 
     */
    async updateLogin(id, login, session) {

        const user = await UsuariosRepository.findForUpdate(id);
        const validations = [
            {
                field: "LOGIN",
                validation: UsuariosRepository.findByLogin,
                errorMsg: "LOGIN invalido"
            },
        ];

        // Faz a mesma coisa que um delete usuario.LOGIN/usuario[LOGIN];
        const {
            ID_PESSOA, ID_SECRETARIA, ID_ASSOCIACAO, NIVEL,
            ...filterLogin
        } = login;

        //Verifica se o ID existe no database
        if (!user) {
            throw new Erros("ID inexistente", 404);
        };

        // Compara LOGIN e SENHA com o database
        if (filterLogin.LOGIN === user.LOGIN &&
            bcrypt.compareSync(filterLogin.SENHA, user.SENHA)) {
            throw new Erros("SENHA ou LOGIN precisam ser diferente da anterior", 403);
        };

        // Compara a SENHA. Se diferente do database cria o hash
        if (!bcrypt.compareSync(filterLogin.SENHA, user.SENHA)) {
            // Gera hash e atualiza no banco
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(filterLogin.SENHA, salt);
            filterLogin.SENHA = hashedPassword;
        } else {
            filterLogin.SENHA = user.SENHA
        };

        console.log(filterLogin);
        return baseScope.update(
            id, filterLogin, session,
            "secretaria", "ID_SECRETARIA",
            UsuariosRepository.updateUsuario
        );
    };

    /**
     * Remove um usuário existente.
     */
    async deleteUsuario(id, session) {
        const user = await UsuariosRepository.findByIdDelete(id);

        //Verifica se o ID existe
        if (!user) {
            throw new Erros("ID inexistente", 404);
        };

        const {
            ID_PESSOA, NIVEL, LOGIN, SENHA,
            ...filterUser
        } = user;

        return baseScope.delete(
            id, filterUser, session,
            "secretaria", "ID_SECRETARIA",
            UsuariosRepository.deleteUsuario
        );

        // return await UsuariosRepository.deleteUsuario(id);
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

        //Verifica dados do login
        if (!user) {
            throw new Erros('Login ou senha inválidos', 401);
        };


        // Caso já está em hash
        if (typeof user.SENHA === "string" && user.SENHA.startsWith("$2")) {
            if (!bcrypt.compareSync(data.SENHA, user.SENHA)) {
                throw new Erros('Login ou senha inválidos', 401);
            };

        } else { //Caso a senha ainda esteja em texto puro
            if (data.SENHA !== user.SENHA) {
                throw new Erros('Login ou senha inválidos', 401);
            };

            // Gera hash e atualiza no banco
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(data.SENHA, salt);

            await UsuariosRepository.updateUsuario(user.ID, ({ SENHA: hashedPassword }));
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