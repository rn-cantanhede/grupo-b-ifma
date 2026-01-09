const express = require("express");
const router = express.Router();
const UsuariosController = require("../usuarios.controller");

/**
 * ROTAS APENAS PARA PERMISSÃO NIVEL ADMIN(1);
 */

/**
 * ROTAS DE CONSULTA (GET)
 */

// Busca usuario pela secretaria.
router.get("/secretaria/:secretaria", UsuariosController.findSecretariaUsuarios);

// Busca usuario pelo nivel.
router.get("/nivel/:nivel", UsuariosController.findNivelUsuarios);

// Busca usuario pelo login.
router.get("/login/:login", UsuariosController.findByLogin);

// Retorna todos os usuarios cadastrados.
router.get("/", UsuariosController.findAllUsuarios);

// Busca um usuario por um valor genérico.
router.get("/:value", UsuariosController.findUsuarios);

/**
 * ROTAS DE CRIAÇÃO (POST)
 */

// Cria um novo usuario.
router.post("/new", UsuariosController.createUsuario);


/**
 * ROTAS DE ATUALIZAÇÃO (PUT)
 */

// Atualiza um usuario existente.
router.put("/update/:id", UsuariosController.updateUsuario);

/**
 * ROTAS DE REMOÇÃO (DELETE)
 */

// Remove um usuario existente.
router.delete("/delete/:id", UsuariosController.deleteUsuario);

module.exports = router;