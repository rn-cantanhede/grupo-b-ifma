const express = require("express");
const router = express.Router();
const SecretariasController = require("./secretarias.controller");

router.get("/", SecretariasController.AllSecretarias);
router.get("/:value", SecretariasController.findSecretarias);
router.get("/estado/:estado", SecretariasController.findEstadoSecretarias);
router.get("/cidade/:cidade", SecretariasController.findCidadeSecretarias);

router.post("/new", SecretariasController.createSecretaria);

router.put("/update/:id", SecretariasController.updateSecretaria);

router.delete("/delete/:id", SecretariasController.deleteSecretaria);

module.exports = router;