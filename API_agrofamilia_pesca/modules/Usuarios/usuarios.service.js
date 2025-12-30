const Erros = require("../../shared/errors/Errors");
const bcrypt = require("bcryptjs");
const { findByIdName } = require("../../shared/Utils/findUtils");
const validationsUtils = require("../../shared/Utils/validationsUtils");
const UsuariosRepository = require("./usuarios.repository");

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
    async findAllUsuarios() {
        return await UsuariosRepository.findAllUsuarios();
    };

    /**
     * Busca usuario por ID ou Nome, conforme o tipo de entrada.
     */
    async find(value) {
        return findByIdName(value,
            UsuariosRepository.findById,
            UsuariosRepository.findByName
        );
    };

    /**
     * Busca usuario pelo Nivel.
     */
    async findByNivel(nivel) {
        return find(nivel, UsuariosRepository.findByNivel);
    };

    /**
     * Busca usuario pela secretaria.
     */
    async findBySecretaria(secretaria) {
        return find(secretaria, UsuariosRepository.findBySecretaria);
    };

    /**
     * Busca usuario pelo login.
     */
    async findByLogin(login) {
        return find(login, UsuariosRepository.findByLogin);
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

        return true;
    };

};

module.exports = new UsuariosService();