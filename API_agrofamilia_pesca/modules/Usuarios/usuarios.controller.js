const UsuariosService = require("./usuarios.service");

/**
 * Controller responsável por receber as requisições HTTP
 * relacionadas aos Usuarios e repassar para a camada de Service.
 * Aqui não há regra de negócio, apenas controle de fluxo e resposta HTTP.
 */
class UsuariosController {

    /**
     * Retorna todos os usuarios.
     */
    async findAllUsuarios(req, res, next) {
        try {
            const view = await UsuariosService.findAllUsuarios();
            return res.status(200).json(view);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario por ID ou Nome.
     */
    async findUsuarios(req, res, next) {
        try {
            const result = await UsuariosService.find(req.params.value);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario pelo Nivel.
     */
    async findNivelUsuarios(req, res, next) {
        try {
            const result = await UsuariosService.findByNivel(req.params.nivel);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario pela Secretaria.
     */
    async findSecretariaUsuarios(req, res, next) {
        try {
            const result = await UsuariosService.findBySecretaria(req.params.secretaria);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Busca usuario pelo login.
     */
    async findByLogin(req, res, next) {
        try {
            const result = await UsuariosService.findByLogin(req.params.login);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Cria um novo usuario.
     */
    async createUsuario(req, res, next) {
        try {
            const result = await UsuariosService.createUsuario(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Modifica um usuario.
     */
    async updateUsuario(req, res, next) {
        try {
            const result = await UsuariosService.updateUsuario(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    /**
     * Deleta um usuario.
     */
    async deleteUsuario(req, res, next) {
        try {
            const result = await UsuariosService.deleteUsuario(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new UsuariosController();