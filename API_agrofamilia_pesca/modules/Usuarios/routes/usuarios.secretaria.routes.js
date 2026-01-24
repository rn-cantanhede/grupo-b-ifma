const express = require("express");
const router = express.Router();
const UsuariosController = require("../usuarios.controller");

/**
 * ROTAS APENAS PARA PERMISSÃO NIVEL SECRETARIAS(2);
 */

/**
 * ROTAS DE CONSULTA (GET)
 */

// Retorna todos os usuarios da secretaria.
router.get("/", UsuariosController.findAllUsuarios);

// Busca um usuario por um valor genérico.
router.get("/:value", UsuariosController.findUsuarios);

// Busca um usuario por um nivel.
router.get("/nivel/:nivel", UsuariosController.findNivelUsuarios);

// Busca com login por usuario
router.get("/login/:login", UsuariosController.findByLogin);

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