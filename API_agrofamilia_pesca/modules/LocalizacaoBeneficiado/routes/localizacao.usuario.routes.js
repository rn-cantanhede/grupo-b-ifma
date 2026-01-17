const express = require("express");
const router = express.Router();
const LocalizacaoBeneficiadoController = require("../localizacao-beneficiado.controller");

/**
 *  
 * ROTAS DE CONSULTA (GET)
 *  
 */

// Retorna todas as localizações beneficiadas.
router.get("/", LocalizacaoBeneficiadoController.AllLocalizacoes);

module.exports = router;