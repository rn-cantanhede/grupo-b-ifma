const express = require("express");
const router = express.Router();
const AssociacoesController = require("./associacoes.controller");

router.get("/", AssociacoesController.AllAssociacoes);
router.get("/:value", AssociacoesController.findAssociacao);
router.get("/categoria/:categoria", AssociacoesController.findCategoriaAssociacao);
router.get("/secretaria/:secretaria", AssociacoesController.findSecretariaAssociacao);

router.post("/new", AssociacoesController.createAssociacao);

module.exports = router;