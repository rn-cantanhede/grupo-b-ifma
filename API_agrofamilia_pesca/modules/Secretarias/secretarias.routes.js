const express = require("express");
const router = express.Router();
const SecretariasController = require("./SecretariasController");

router.get("/", SecretariasController.AllSecretarias);
router.get("/:value", SecretariasController.findSecretarias);
router.get("/estado/:estado", SecretariasController.findEstadoSecretarias);
router.get("/cidade/:cidade", SecretariasController.findCidadeSecretarias);

module.exports = router;