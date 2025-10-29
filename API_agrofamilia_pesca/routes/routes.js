const express = require("express");
const app = express();
const router = express.Router();

const PessoasController = require("../controllers/PessoasController");
const AssociacoesController = require("../controllers/AssociacoesController");
const SecretariasController = require("../controllers/SecretariasController");
const AssociadosController = require("../controllers/AssociadosController");
const LocalizacaoBeneficiadoController = require("../controllers/LocalizacaoBeneficiadoController");
const CategoriasController = require("../controllers/CategoriasController");


router.get("/pessoas", PessoasController.Pessoas);
router.get("/associacoes", AssociacoesController.Associacoes);
router.get("/secretarias", SecretariasController.Secretarias);

router.get("/associados", AssociadosController.Associados);
router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.Localizacoes);
router.get("/categorias", CategoriasController.Categorias);

module.exports = router;