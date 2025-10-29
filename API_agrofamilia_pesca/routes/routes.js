const express = require("express");
const app = express();
const router = express.Router();

const PessoasController = require("../controllers/PessoasController");
const AssociacoesController = require("../controllers/AssociacoesController");
const SecretariasController = require("../controllers/SecretariasController");
const AssociadosController = require("../controllers/AssociadosController");
const LocalizacaoBeneficiadoController = require("../controllers/LocalizacaoBeneficiadoController");


router.get("/pessoas", PessoasController.Pessoas);
router.get("/associacoes", AssociacoesController.Associacoes);
router.get("/secretarias", SecretariasController.Secretarias);

router.get("/associados", AssociadosController.Associados);
router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.Localizacoes);

module.exports = router;