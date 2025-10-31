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
const MovimentacoesController = require("../controllers/MovimentacoesController");
const AgriculturaFamiliarController = require("../controllers/AgriculturaFamiliarController");

router.get("/agricultura-familiar", AgriculturaFamiliarController.AllAgriculturaFamiliar)
router.get("/associacoes", AssociacoesController.AllAssociacoes);
router.get("/associados", AssociadosController.AllAssociados);
router.get("/categorias", CategoriasController.AllCategorias);
router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.AllLocalizacoes);
router.get("/pessoas", PessoasController.AllPessoas);
router.get("/pessoa/:id", PessoasController.findByIdPessoa);
router.get("/produtos", ProdutosController.AllProdutos);
router.get("/movimentacoes", MovimentacoesController.AllMovimentacoes);
router.get("/secretarias", SecretariasController.AllSecretarias);

module.exports = router;