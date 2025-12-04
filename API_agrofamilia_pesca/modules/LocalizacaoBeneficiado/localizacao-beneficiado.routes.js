const express = require("express");
const router = express.Router();
const LocalizacaoBeneficiadoController = require("./localizacao-beneficiado.controller");

router.get("/", LocalizacaoBeneficiadoController.AllLocalizacoes);
router.get("/:value", LocalizacaoBeneficiadoController.findLocalizacao);
router.get("/associacao/:associacao", LocalizacaoBeneficiadoController.findAssociacao);

router.post("/new", LocalizacaoBeneficiadoController.createlocalizacao);

module.exports = router;