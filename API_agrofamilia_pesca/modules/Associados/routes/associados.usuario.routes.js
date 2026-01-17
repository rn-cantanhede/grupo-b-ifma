const express = require("express");
const router = express.Router();
const AssociadosController = require("../associados.controller");

/**
 *   
 * ROTAS DE CONSULTA (GET)
 *   
 */

// Retorna todos os associados cadastrados.
router.get("/", AssociadosController.AllAssociados);

module.exports = router;