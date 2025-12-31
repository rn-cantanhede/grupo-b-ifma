const express = require("express");
const router = express.Router();
const UsuariosController = require("./usuarios.controller");
const Auth = require("../../middleware/Auth");
const Authorize = require("../../middleware/Authorize");

/**
 * ================================
 * ROTAS DE CONSULTA (GET)
 * ================================
 */

/**
 * ================================
 * AUTENTIFICAÇÃO EM FASE DE TESTES
 * ================================
 */

router.get("/logout", Auth, UsuariosController.logout);

// Busca usuario pela secretaria.
router.get("/secretaria/:secretaria", Auth, UsuariosController.findSecretariaUsuarios);

// Busca usuario pelo nivel.
router.get("/nivel/:nivel", Auth, UsuariosController.findNivelUsuarios);

// Busca usuario pelo login.
// router.get("/login/:login", UsuariosController.findByLogin);

// Retorna todos os usuarios cadastrados.
router.get("/", Auth, Authorize(1), UsuariosController.findAllUsuarios);

// Busca um usuario por um valor genérico.
router.get("/:value", Auth, UsuariosController.findUsuarios);

/**
 * ================================
 * ROTAS DE CRIAÇÃO (POST)
 * ================================
 */

// Cria um novo usuario.
router.post("/new", UsuariosController.createUsuario);

router.post("/login", UsuariosController.login);

/**
 * ================================
 * ROTAS DE ATUALIZAÇÃO (PUT)
 * ================================
 */

// Atualiza um usuario existente.
router.put("/update/:id", UsuariosController.updateUsuario);

/**
 * ================================
 * ROTAS DE REMOÇÃO (DELETE)
 * ================================
 */

// Remove um usuario existente.
router.delete("/delete/:id", UsuariosController.deleteUsuario);

module.exports = router;