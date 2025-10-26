const express = require("express");
const PessoasController = require("../controllers/PessoasController");
const AssociacoesController = require("../controllers/AssociacoesController");
const SecretariasController = require("../controllers/SecretariasController");
const AssociadosController = require("../controllers/AssociadosController");
const app = express();
const router = express.Router();

router.get("/pessoas", PessoasController.Pessoas);
router.get("/associacoes", AssociacoesController.Associacoes);
router.get("/secretarias", SecretariasController.Secretarias);

router.get("/associado", AssociadosController.Associados);

module.exports = router;