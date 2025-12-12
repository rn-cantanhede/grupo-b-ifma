const express = require("express");
const router = express.Router();
const AssociadosController = require("./associados.controller");

router.get("/", AssociadosController.AllAssociados);
router.get("/:value", AssociadosController.findAssociado);
router.get("/caf/:caf", AssociadosController.findCafAssociado);
router.get("/dap/:dap", AssociadosController.findDapAssociado);
router.get("/associacao/:associacao", AssociadosController.findAssociacaoAssociado);
router.get("/data/:data", AssociadosController.findDataAssociado);
router.get("/data/intervalo/:inicio/:fim", AssociadosController.findInicioFimAssociado);

router.post("/new", AssociadosController.createAssociado);

router.put("/update/:id", AssociadosController.updateAssociado);

module.exports = router;