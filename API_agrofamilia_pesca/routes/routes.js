const express = require("express");
const PessoasController = require("../controllers/PessoasController");
const AssociacoesController = require("../controllers/AssociacoesController");
const app = express();
const router = express.Router();

router.get("/pessoas", PessoasController.pessoas);
router.get("/associacoes", AssociacoesController.associacoes);

module.exports = router;