const express = require("express");
const router = express.Router();
const LocalizacaoBeneficiadoController = require("./localizacao-beneficiado.controller");

router.get("/", LocalizacaoBeneficiadoController.AllLocalizacoes);
router.get("/:value", LocalizacaoBeneficiadoController.findLocalizacao);
router.get("/associacao/:associacao", LocalizacaoBeneficiadoController.findAssociacao);

module.exports = router;