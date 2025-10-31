const express = require("express");
const app = express();
const router = express.Router();

const PessoasController = require("../controllers/PessoasController");
const AssociacoesController = require("../controllers/AssociacoesController");
const SecretariasController = require("../controllers/SecretariasController");
const AssociadosController = require("../controllers/AssociadosController");
const LocalizacaoBeneficiadoController = require("../controllers/LocalizacaoBeneficiadoController");
const CategoriasController = require("../controllers/CategoriasController");
const ProdutosController = require("../controllers/ProdutosController");


router.get("/pessoas", PessoasController.Pessoas);
router.get("/pessoas/:id", PessoasController.findById);
router.get("/associacoes", AssociacoesController.Associacoes);
router.get("/secretarias", SecretariasController.Secretarias);
router.get("/produtos", ProdutosController.findAllProdutos)
router.get("/associados", AssociadosController.Associados);
router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.Localizacoes);
router.get("/categorias", CategoriasController.Categorias);
// router.get

module.exports = router;