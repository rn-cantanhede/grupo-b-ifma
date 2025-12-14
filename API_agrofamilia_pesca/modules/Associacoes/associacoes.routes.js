const express = require("express");
const router = express.Router();
const AssociacoesController = require("./associacoes.controller");

router.get("/", AssociacoesController.AllAssociacoes);
router.get("/:value", AssociacoesController.findAssociacao);
router.get("/categoria/:categoria", AssociacoesController.findCategoriaAssociacao);
router.get("/secretaria/:secretaria", AssociacoesController.findSecretariaAssociacao);

router.post("/new", AssociacoesController.createAssociacao);

router.put("/update/:id", AssociacoesController.updateAssociacao);

router.delete("/delete/:id", AssociacoesController.deleteAssociacao);

module.exports = router;